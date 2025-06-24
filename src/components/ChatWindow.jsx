// React hooks 和组件导入
import { useState, useContext, useEffect, useRef } from "react";
import MessageScreen from "./MessageScreen";
import MessageInput from "./MessageInput";
import MessageType from "../enums/MessageTypes";
import EntityType from "../enums/EntityTypes";
import { messageGroupsAllBots } from "../messages"; // Phase 1 - Info Collect Script
import "../styles/ChatWindow.css";

// Firebase 初始化
import { firebaseConfig, API_BASE } from "../config/config.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  getDocFromServer,
} from "firebase/firestore";

// Firebase Storage 初始化，用户存储用户头像文件
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 上下文获取用户 ID
import { AuthContext } from "../contexts/contexts";

// UI 组件
import Button from "@mui/material/Button";

// ChatWindow 主组件
function ChatWindow(props) {
  // 会话相关状态
  const [messages, setMessages] = useState([]); // 聊天消息数组
  const [conversationStep, setConversationStep] = useState(0); // 当前对话步骤
  const [blockUserMessages, setBlockUserMessages] = useState(false); // 是否禁止用户输入
  const [isDisplayTyping, setIsDisplayTyping] = useState(false); // 是否显示机器人“正在输入”
  const [typingByUser, setTypingByUser] = useState(false); // 回放专用，用户输入消息时设置为true，以在右侧进行渲染。
  const [loading, setLoading] = useState(false); // 是否加载中
  const [gptConversation, setGptConversation] = useState(""); // GPT 上下文（未使用）
  const [lastUserMessage, setLastUserMessage] = useState(""); // 上一条用户消息
  const [lastHostMessage, setLastHostMessage] = useState(""); // 上一条Host消息
  const [name, setName] = useState(props.name); // 用户昵称
  const [isTwin, setIsTwin] = useState(props.isTwin); // 是否孪生组flag
  const [prosocialStatus, setProsocialStatus] = useState(props.prosocialStatus); // 是否亲社会组
  const [avatar, setAvatar] = useState(props.avatar); // 用户头像
  const [isReplayMode, setIsReplayMode] = useState(props.isReplayMode); // 是否是Stage 2回放模式
  // const [isReadyForNextStep, setIsReadyForNextStep] = useState(true); // 用于判断 step 2 用户是否输入 I am ready.

  // openai 客户端和计时器
  const openai = useRef(null);
  const startTime = useRef(Date.now());

  // Firebase 初始化
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 获取当前用户 ID，并构造文档引用
  const userId = useContext(AuthContext);
  const docRef = doc(db, "users", userId);

  // console.log(prosocialStatus);
  // 获取对应 bot 的消息组
  const messageGroups =
    prosocialStatus == 1 ? messageGroupsAllBots[0] : messageGroupsAllBots[1]; // 设置默认为0, 即messages1Bot.jsx - Phase 1信息收集脚本, without和anti都使用non脚本

  const hasInitialized = useRef(false); // 防止开发Strict模式下init两次的问题

  // 页面首次加载：初始化 OpenAI 实例，并更新用户头像和姓名
  // useEffect(() => {
  //   // 只有页面/组件首次挂载时会运行一次
  //   if (!isReplayMode) {
  //     const fetchKeyAndAvatar = async () => {
  //       await saveUserProfileToDatabase(name, avatar, isTwin, prosocialStatus);

  //       // 若 avatar 是 undefined，则尝试从 Firebase Storage 获取
  //       if (!avatar && isTwin) {
  //         const url = await fetchAvatarFromStorage(userId);
  //         setAvatar(url || "/nodebox/static/icons/bot1logo.png");
  //       }
  //     };
  //     fetchKeyAndAvatar();
  //   }
  // }, []);

  async function uploadAvatarAndGetURL(file, userId) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `avatars/${userId}.jpg`);

    try {
      // 试图获取已存在的下载链接
      const existingUrl = await getDownloadURL(storageRef);
      return existingUrl; // 文件存在，直接返回
    } catch (error) {
      // 文件不存在，上传新文件
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    }
  }

  async function fetchAvatarFromStorage(userId) {
    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, `avatars/${userId}.jpg`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.warn("No avatar found in storage or failed to fetch:", error);
      return null;
    }
  }

  // 上传/更新用户名与头像
  async function saveUserProfileToDatabase(
    name,
    avatarFile,
    isTwin,
    prosocialStatus
  ) {
    // console.log(name, avatar, isTwin, prosocialStatus);
    try {
      const userRef = doc(db, "users", userId);
      const existingDoc = await getDoc(userRef);

      let avatarUrl = "";
      if (avatarFile) {
        avatarUrl = await uploadAvatarAndGetURL(avatarFile, userId);
      }

      const updateData = {};

      if (!existingDoc.exists()) {
        // 文档不存在：写入所有字段
        updateData.name = name;
        updateData.avatar = avatarFile ? avatarUrl : null;
        updateData.isTwin = isTwin;
        updateData.prosocialStatus = prosocialStatus;
      } else {
        const data = existingDoc.data();

        // 仅在字段缺失时添加
        if (!data.name && name) updateData.name = name;
        if (!data.avatar && avatarFile) updateData.avatar = avatarUrl;
        if (data.isTwin === undefined) updateData.isTwin = isTwin;
        if (data.prosocialStatus === undefined)
          updateData.prosocialStatus = prosocialStatus;
      }

      if (Object.keys(updateData).length > 0) {
        await setDoc(userRef, updateData, { merge: true });
      } else {
        console.log(
          "✅ All user profile fields already exist. No update needed."
        );
      }
    } catch (e) {
      console.error("Error saving user profile:", e);
    }
  }

  // 调用 GPT API 获取机器人回复
  async function getGPTMessage(prompt, userMessage, lastHostMessage) {
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          userMessage: userMessage,
          lastHostMessage,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error("❌ GPT API Error:", err);
        return `（API错误：${err.slice(0, 100)}）`;
      }

      const data = await response.json();

      console.log(data.reply);

      // 这里用 data.reply 而不是 data.choices
      return data.reply || "（无返回内容）";
    } catch (error) {
      console.error("❌ 网络异常:", error);
      return `（异常：${error.message}）`;
    }
  }

  async function getUserDataFromDatabase() {
    setLoading(true);
    try {
      const docSnap = await getDocFromServer(docRef);
      const data = docSnap.data();
      // console.log("Raw data:", data);
      // console.log(
      //   "Has step:",
      //   Object.prototype.hasOwnProperty.call(data, "step")
      // );
      if (!docSnap.exists() || !docSnap.data().step) {
        setLoading(false);
        // console.log("First return.");
        return false; // ✅ 没有消息
      }

      const messageHistory = await getDocs(
        collection(db, "users", userId, "messages")
      );

      // console.log(messageHistory);

      populateInitialMessages(docSnap.data().step, messageHistory.docs);
      setConversationStep(docSnap.data().step);
      setLoading(false);
      return messageHistory.docs.length > 0; // ✅ 判断是否有历史消息
    } catch (e) {
      console.log(e);
      setLoading(false);
      return false;
    }
  }

  // 更新数据库中用户的对话步骤
  async function updateStepInDatabase(newStep) {
    await setDoc(doc(db, "users", userId), { step: newStep }, { merge: true });
  }

  // 存储用户在某步骤的消息
  async function storeUserMessageInDatabase(step, message) {
    const stepId = step.toString().padStart(3, "0"); // "001", "002", ..., "010", ...
    await setDoc(
      doc(db, "users", userId, "messages", stepId),
      {
        message: message,
      },
      { merge: true }
    );
  }

  // 存储用户与机器人对话的总耗时
  async function saveElapsedTimeToDatabase() {
    await setDoc(
      doc(db, "users", userId),
      { time: Date.now() - startTime.current },
      { merge: true }
    );
  }

  function calculateTypingDelay(content, baseDelay = 1000) {
    // 基本参数设置
    const minDelay = 1000; // 最小延迟时间，防止过短内容没有延迟
    const maxDelay = 7000; // 最大延迟时间，防止过长内容延迟太久
    const delayPerChar = 20; // 每字符增加的基础延迟时间(毫秒)
    const randomFactor = 0.3; // 随机波动因子，使打字速度更自然

    // 计算内容长度
    const contentLength = content.length;

    // 基础延迟加上与内容长度相关的延迟
    let delay = baseDelay + contentLength * delayPerChar;

    // 添加随机波动，模拟人类打字速度变化
    const randomVariation = (Math.random() * 2 - 1) * randomFactor * delay;
    delay += randomVariation;

    // 应用最大最小限制
    delay = Math.max(minDelay, Math.min(delay, maxDelay));

    return Math.round(delay);
  }

  async function replayMessagesSequentially(allMessages) {
    // console.log("replayMessagesSequentially called");
    setBlockUserMessages(true); // 禁用输入
    setMessages([]); // 清空已有消息

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let i = 0; i < allMessages.length; i++) {
      const {
        content,
        sender,
        delay = 0,
        id,
        senderName,
        type,
      } = allMessages[i];

      // 计算基于内容长度的动态延迟
      const dynamicDelay = calculateTypingDelay(content, delay);
      // let dynamicDelay = delay;

      if (sender === "Assistant" || sender === "Twin") {
        setTypingByUser(true);
        setIsDisplayTyping(true);
        await timer(dynamicDelay); // 使用动态计算的延迟
        addUserMessage(content, id);
      } else {
        setTypingByUser(false);
        setIsDisplayTyping(true);
        await timer(dynamicDelay); // 使用动态计算的延迟
        setMessages((prev) => [
          ...prev,
          {
            sender: EntityType.Bot1,
            content: content,
            id: id,
            senderName: senderName,
            delay: delay,
            type: type,
          },
        ]);
      }
      setIsDisplayTyping(false);
    }
    // setBlockUserMessages(false); // 播放完毕可再次输入
  }

  async function loadReplayUserData(baseUserId) {
    // console.log("loadReplayUserData called");
    // setLoading(true);
    try {
      const userRef = doc(db, "users", baseUserId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert(`Didn't find user ${baseUserId}`);
        setLoading(false);
        return;
      }
      const userData = userSnap.data();
      // console.log(userData);

      setIsTwin(userData.isTwin);
      if (userData.isTwin === 1) {
        setAvatar(userData.avatar);
        setName(`${userData.name}`);
        // console.log(avatar);
      } else {
        setName(`${userData.name}'s Assistant`);
      }

      const docRef = doc(db, "chats", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const allMessages = data.messages || [];
        await replayMessagesSequentially(allMessages);
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.error(`Error when loading replay: `, err);
    }
    setLoading(false);
  }

  // 页面挂载时加载历史数据
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    setBlockUserMessages(true);

    const init = async () => {
      if (!isReplayMode) {
        // 保存用户基本信息
        await saveUserProfileToDatabase(name, avatar, isTwin, prosocialStatus);

        // 尝试从 Storage 获取 avatar
        if (!avatar && isTwin) {
          const url = await fetchAvatarFromStorage(userId);
          setAvatar(url || "/nodebox/static/icons/bot1logo.png");
        }
      }

      if (isReplayMode && userId.endsWith("-A")) {
        const baseUserId = userId.slice(0, -2);
        await loadReplayUserData(baseUserId);
      } else {
        const hasMessages = await getUserDataFromDatabase();
        if (!hasMessages) {
          // console.log("No previous messages.");
          addBotMessages(conversationStep, "");
          setConversationStep(1);
        } else {
          setBlockUserMessages(false);
          // console.log("Has previous message.");
        }
      }
    };

    init();

    // 清理 messages
    return () => setMessages([]);
  }, []);

  // 测试用：重置用户状态
  async function test_reset() {
    await setDoc(doc(db, "users", userId), { step: 0 });
    setMessages([]);
    setConversationStep(1);
  }

  // 用户提交消息的逻辑
  async function handleAddUserMessage(message, id) {
    addUserMessage(message, id);
    saveElapsedTimeToDatabase();

    if (
      conversationStep == 1 &&
      message != "I'm ready" &&
      message != "i'm ready" &&
      message != "I’m ready" &&
      message != "i’m ready" &&
      message != "I'm ready." &&
      message != "i'm ready." &&
      message != "I’m ready." &&
      message != "i’m ready."
    ) {
      const notReadyMessage = {
        id: crypto.randomUUID(),
        content: (name) => `Please type “I’m ready” when you’re good to start.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 100,
      };
      setMessages((prevMessages) => [...prevMessages, notReadyMessage]);
      return;
    }

    // addBotMessages(conversationStep, message);
    // print(
    //   `conversation step: ${conversationStep}, isReadyForNextStep ${isReadyForNextStep}`
    // );

    if (!blockUserMessages) {
      // console.log(`A1 Current step: ${conversationStep}`);
      storeUserMessageInDatabase(conversationStep, message);
      addBotMessages(conversationStep, message);
      updateStepInDatabase(conversationStep + 1);
      setConversationStep((s) => s + 1);
    }
  }

  // 显示用户消息
  function addUserMessage(message, id) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, sender: EntityType.User, id: id },
    ]);
  }

  // 创建 GPT 对话（暂时未被调用）
  function createConversation(fn, message) {
    return fn(message, gptConversation);
  }

  // 显示 bot 的消息组，并执行 GPT 请求（如有）
  async function addBotMessages(step, lastUserMessage) {
    setBlockUserMessages(true); // 防止用户多次快速发言
    // setIsReadyForNextStep(false);

    // if (step == 2 && lastUserMessage != "I am ready.") {
    //   setIsDisplayTyping(true);
    //   const notReadyMessage = {
    //     id: crypto.randomUUID(),
    //     content: (name) =>
    //       `Please enter "I am ready." when you are ready to take the test.`,
    //     sender: EntityType.Host,
    //     senderName: "Host",
    //     type: MessageType.Message,
    //     delay: 100,
    //   };
    //   // 添加消息 return
    //   setIsDisplayTyping(false);
    //   setMessages((prevMessages) => [...prevMessages, notReadyMessage]);
    //   setBlockUserMessages(false);
    //   setIsReadyForNextStep(false);
    //   return;
    // }

    if (messageGroups.filter((g) => g.step == step).length === 0) return;

    const messageGroup = messageGroups.filter((g) => g.step == step)[0]
      .messages;

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    for (var i = 0; i < messageGroup.length; i++) {
      await timer((1 + Math.random()) * 1000);
      setIsDisplayTyping(true);
      await timer(messageGroup[i].delay * 800); // 模拟打字等待时间

      const message = messageGroup[i];

      if (message.type === MessageType.GPT) {
        const gptMessage = await getGPTMessage(
          message.prompt(props.name),
          lastUserMessage,
          lastHostMessage
        );
        message.content = () => gptMessage; // 让 content 变为函数返回值
      } else {
        // 是 host script 消息
        setLastHostMessage(message.content(props.name));
      }

      setIsDisplayTyping(false);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
    // setIsReadyForNextStep(true);
    setBlockUserMessages(false);
  }

  // 从历史记录还原对话内容
  function populateInitialMessages(step, userMessages) {
    let msgs = [];

    for (let i = 0; i < step; i++) {
      // 添加机器人消息
      if (i < messageGroups.length) {
        msgs = msgs.concat(messageGroups[i].messages);
      }

      // 添加用户消息，确保 userMessages[i] 存在
      if (userMessages[i]) {
        msgs.push({
          content: userMessages[i].data().message,
          sender: EntityType.User,
        });
      }
    }

    setMessages(msgs);
  }

  // UI 渲染部分
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "2rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          marginBottom: "0",
          color: "#2c3e50",
          // borderBottom: "2px solid #ddd",
          // paddingBottom: "0.5rem",
        }}
      >
        Chat
      </h2>

      <div className="chatWindow">
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: "400",
            marginTop: "0.25rem",
            marginBottom: "1rem",
            color: "#555",
          }}
        >
          Loading the chat window may take a few seconds
        </h3>

        <MessageScreen
          messages={messages}
          loading={loading}
          name={name}
          avatar={avatar}
          isTwin={isTwin}
          typingByUser={typingByUser}
          handleSubmitRating={handleAddUserMessage}
          addMessage={handleAddUserMessage}
          blockUserMessages={blockUserMessages}
          displayTyping={isDisplayTyping}
          isReplayMode={isReplayMode}
        />
        <br />
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button variant="outlined" color="primary" onClick={test_reset}>
            Reset
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={props.logoutHandler}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
