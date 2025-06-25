import React, { useState } from "react";

// Firebase 初始化
import { firebaseConfig, API_BASE } from "../config/config.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

// 消息类型与发送方枚举定义
import MessageType from "../enums/MessageTypes.js";
import EntityType from "../enums/EntityTypes.js";

// 模板
import { twinProsocialScript } from "../twinProsocialScript.js";
import { twinNonProsocialScript } from "../twinNonProsocialScript.js";
import { twinWithoutScript } from "../twinWithoutScript.js";
import { assistantProsocialScript } from "../assistantProsocialScript.js";
import { assistantNonProsocialScript } from "../assistantNonProsocialScript.js";
import { assistantWithoutScript } from "../assistantWithoutScript.js";

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// phase 1 questions
const questions_standard = [
  // Crowdsource Task
  "How long have you been using CloudResearch and about how many studies have you done on CloudResearch?",
  "What kinds of tasks on CloudResearch do you like? Please provide some examples.",
  "Are there any tasks you don’t like on CloudResearch? Please provide some examples.",

  // City
  "What city do you live in? What do you think about it?",

  // 影视剧
  "What are your favorite TV shows or movies? Why do you like them?",
  "Do you have any favorite actors or actresses? Why do you like them?",

  // Food
  "What’s your favorite food, and why do you like it?",

  // 音乐
  "What kind of music do you like? Why do you like it?",
  "Do you have any favorite singers or bands? Why are they your favorite?",

  // Hobby
  "What are your hobbies?",
  "What do you usually do when you’re feeling down or not happy?",

  // High Point
  "Can you describe a time in your life that was especially positive or meaningful? What happened, when and where did it happen, who was there, and how did you feel?",

  // Interpersonal
  "Have you ever experienced a major challenge in a relationship with someone? What happened?",
  "When a friend shares something bad that happened to them, how do you usually give emotional support? You can describe what you say or how you act",
  "When someone feels bad about something, how do you usually help them think about it in a more positive or different way?",

  // Work
  "Have you ever faced a major challenge at work or while looking for a job? What happened? How did you feel during that time?",
  "Do you have any tips or helpful resources for finding a job or dealing with challenges at work?",

  // Goal
  "What is something you’ve always wanted to do but haven’t yet? Why?",
  "What does success mean to you?",

  // Value
  "What value or principle is most important to you in life?",
  "Has your most important value changed over time? If so, how and why?",
];

const questions_without = [
  // Crowdsource Task
  "How long have you been using CloudResearch and about how many studies have you done on CloudResearch?",
  "What kinds of tasks on CloudResearch do you like? Please provide some examples.",
  "Are there any tasks you don’t like on CloudResearch? Please provide some examples.",

  // City
  "What city do you live in? What do you think about it?",

  // 影视剧
  "What are your favorite TV shows or movies? Why do you like them?",
  "Do you have any favorite actors or actresses? Why do you like them?",

  // Food
  "What’s your favorite food, and why do you like it?",

  // 音乐
  "What kind of music do you like? Why do you like it?",
  "Do you have any favorite singers or bands? Why are they your favorite?",

  // Hobby
  "What are your hobbies?",
  "What do you usually do when you’re feeling down or not happy?",

  // High Point
  "Can you describe a time in your life that was especially positive or meaningful? What happened, when and where did it happen, who was there, and how did you feel?",

  // Interpersonal
  "Have you ever experienced a major challenge in a relationship with someone? What happened?",

  // Goal
  "What is something you’ve always wanted to do but haven’t yet? Why?",
  "What does success mean to you?",

  // Value
  "What value or principle is most important to you in life?",
  "Has your most important value changed over time? If so, how and why?",
];

const getLastProcessedUser = async () => {
  const docRef = doc(db, "meta", "adminState");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().getLastProcessedUser || null;
  }
  return null;
};

const setLastProcessedUser = async (userId) => {
  const docRef = doc(db, "meta", "adminState");
  await setDoc(docRef, { getLastProcessedUser: userId }, { merge: true });
};

const callChatGPT = async (prompt) => {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();
    console.log(data.reply);
    return data.reply || null;
  } catch (error) {
    console.error(`❌ GPT 请求失败（第 ${retryCount + 1} 次）:`, error.message);
    if (retryCount < 2) {
      return await callChatGPT(prompt, retryCount + 1);
    } else {
      return null;
    }
  }
};

/**
 * 获取所有用户数据：包含 name、avatar、isTwin、history（提取子集合 messages 中的 message 字段）
 */
const getAllUserData = async () => {
  const userCol = collection(db, "users");
  const snapshot = await getDocs(userCol);
  const userData = {};

  for (const docSnap of snapshot.docs) {
    const userId = docSnap.id;
    const data = docSnap.data();

    // 获取 messages 子集合
    const messagesCol = collection(db, "users", userId, "messages");
    const messagesSnapshot = await getDocs(messagesCol);
    const history = messagesSnapshot.docs.map((msgDoc) => msgDoc.data());

    userData[userId] = {
      ...data,
      history,
    };
  }

  // console.log("✅ Final userData:", userData);
  return userData;
};

// 用于递归导出任意集合
const exportCollection = async (colRef) => {
  const snapshot = await getDocs(colRef);
  const result = {};

  for (const docSnap of snapshot.docs) {
    const docId = docSnap.id;
    const docData = docSnap.data();
    const docResult = { ...docData };

    // 递归导出子集合（如有）
    const subcollections = await getDocs(collection(colRef, docId));
    const subCollectionList = await colRef.firestore.listCollections?.(); // fallback if above fails

    const subColRefs = (await colRef.firestore.listCollections)
      ? await colRef.firestore
          .collection(colRef.path + "/" + docId)
          .listCollections()
      : [];

    if (subColRefs.length > 0) {
      docResult["__subcollections__"] = {};
      for (const subCol of subColRefs) {
        docResult["__subcollections__"][subCol.id] = await exportCollection(
          subCol
        );
      }
    }

    result[docId] = docResult;
  }

  return result;
};

// 导出所有根集合
const exportAllFirestoreData = async () => {
  const db = getFirestore();
  const rootCollections = await db.listCollections();

  const result = {};

  for (const col of rootCollections) {
    result[col.id] = await exportCollection(col);
  }

  return result;
};

const getUserDataById = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error(`User ${userId} doesn't exist!`);
  }

  const data = docSnap.data();
  const messageCol = collection(db, "users", userId, "messages");
  const messagesSnapshot = await getDocs(messageCol);
  const history = messagesSnapshot.docs.map((msgDoc) => msgDoc.data());

  return {
    [userId]: {
      ...data,
      history,
    },
  };
};

/**
 * 选择对应模板
 */
const selectTemplate = (isTwin, prosocialStatus) => {
  if (isTwin) {
    switch (prosocialStatus) {
      case 1:
        return twinProsocialScript;
      case -1:
        return twinNonProsocialScript;
      case 0:
      default:
        return twinWithoutScript;
    }
  } else {
    switch (prosocialStatus) {
      case 1:
        return assistantProsocialScript;
      case -1:
        return assistantNonProsocialScript;
      case 0:
      default:
        return assistantWithoutScript;
    }
  }
};

/**
 * 多轮推进 GPT 消息对话（返回完整 messageGroups）
 */
const stepwiseGPTConversation = async (template, userInfo) => {
  const { name, history, prosocialStatus } = userInfo;

  const questions =
    prosocialStatus == 0 ? questions_without : questions_standard;

  const historyEntries = (history || []).slice(1); // 跳过 start

  // 只保留有对应问题的部分
  const validLength = Math.min(historyEntries.length, questions.length);
  const trimmedHistory = historyEntries.slice(0, validLength);

  // const joinedHistory = trimmedHistory.map((entry, index) => {
  //   const question = questions[index] || "";
  //   return `Question: ${question} ${name} : ${entry.message}`;
  // });

  const pairedHistory = trimmedHistory.map((entry, index) => ({
    question: questions[index],
    answer: entry.message,
  }));

  const priorDialogText = []; // 用于拼接前面已生成的“对话文本”（非 prompt）
  const stepMsgs = [];

  for (const group of template) {
    for (const msg of group.messages) {
      const filled = {
        id: msg.id,
        step: group.step,
        sender: typeof msg.sender === "object" ? msg.sender.name : msg.sender, // ✅ 扁平化 sender
        senderName: msg.senderName,
        type: typeof msg.type === "object" ? msg.type.name : msg.type, // ✅ 扁平化 type
        delay: msg.delay,
      };

      if (msg.type === MessageType.Message) {
        // 普通 Bot 消息
        const content =
          typeof msg.content === "function" ? msg.content(name) : msg.content;

        filled.content = content;
        priorDialogText.push(
          `[${
            filled.senderName === "Twin" ? name : filled.senderName // 如果是Twin则在给AI看的对话记录中显示为本人姓名
          }] ${content}`
        );
        stepMsgs.push(filled);
      } else if (msg.type === MessageType.GPT) {
        // 拼接上下文文本
        const contextText = priorDialogText.join("\n");

        // const prompt =
        //   typeof msg.prompt === "function"
        //     ? msg.prompt(name, joinedHistory, contextText)
        //     : msg.prompt;

        const prompt =
          typeof msg.prompt === "function"
            ? msg.prompt(name, pairedHistory, contextText)
            : msg.prompt;

        console.log(`🟡 Prompt:\n${prompt}`);

        const aiResponse = await callChatGPT(prompt);
        if (aiResponse === null) {
          console.warn(`⚠️ GPT消息生成失败，终止本用户处理`);
          return null; // 返回 null 表示失败
        }
        console.log(`🟢 AI Response:\n${aiResponse}`);

        filled.prompt = prompt;
        filled.content = aiResponse;
        priorDialogText.push(
          `[${
            filled.senderName === "Twin" ? name : filled.senderName
          }] ${aiResponse}`
        );

        stepMsgs.push(filled);
      }
    }
  }
  console.log(stepMsgs);
  return stepMsgs;
};

/**
 * 将 messageGroups 写入 Firestore：chats/{userId}
 */
const saveChatToDB = async (userId, messages) => {
  await setDoc(doc(db, "chats", `${userId}`), {
    messages: messages,
    generatedAt: new Date().toISOString(),
  });
};

const markAssignCompleted = async (userId) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { isAssignCompleted: true }, { merge: true });
};

/**
 * 管理员主界面：点击生成全部对话
 */
const AdminPage = () => {
  const [status, setStatus] = useState("Waiting to start...");
  const [singleId, setSingleId] = useState("");

  const handleSingleProcess = async () => {
    if (!singleId) {
      setStatus("❌ Please enter a connect ID");
      return;
    }
    setStatus(`Reading data from user ${singleId}`);
    try {
      const users = await getUserDataById(singleId);
      const userInfo = users[singleId];

      const template = selectTemplate(
        userInfo.isTwin,
        userInfo.prosocialStatus
      );
      const filledMessages = await stepwiseGPTConversation(template, userInfo);
      await saveChatToDB(singleId, filledMessages);
      await markAssignCompleted(singleId); // ✅ 标记为已完成
      setStatus(`✅ Single user processed, ID: ${singleId}`);
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  const handleProcess = async (resumeFromUserId = null) => {
    setStatus("Reading data from users...");
    const users = await getAllUserData();

    const userIds = Object.keys(users);
    let startIndex = 0;

    if (resumeFromUserId) {
      const idx = userIds.indexOf(resumeFromUserId);
      startIndex = idx >= 0 ? idx : 0;
    }

    for (let i = startIndex; i < userIds.length; i++) {
      const userId = userIds[i];
      const userInfo = users[userId];
      console.log(`Processing ${userId}`);

      try {
        const template = selectTemplate(
          userInfo.isTwin,
          userInfo.prosocialStatus
        );
        const filledMessages = await stepwiseGPTConversation(
          template,
          userInfo
        );

        if (!filledMessages) {
          // 💥 GPT 对话失败，写入失败标记后终止
          await setLastProcessedUser(userId);
          setStatus(`❌ 处理用户 ${userId} 时 GPT 生成失败，已记录中断位置。`);
          break;
        }
        await saveChatToDB(userId, filledMessages);
        await markAssignCompleted(userId); // ✅ 标记为已完成
        await setLastProcessedUser(userId);
        setStatus(`✅ 已处理 ${i + 1}/${userIds.length} 个用户：${userId}`);
      } catch (err) {
        setStatus(`❌ 处理用户 ${userId} 时出错：${err.message}`);
        break; // 中断处理
      }
    }
    setStatus("🎉 所有可处理用户处理完毕！");
  };

  const handleExport = async () => {
    setStatus("📦 正在导出数据...");
    try {
      const data = await exportAllRootCollections();

      // ⬇️ 将数据转为 JSON 字符串
      const jsonStr = JSON.stringify(data, null, 2);

      // ⬇️ 创建 Blob 对象
      const blob = new Blob([jsonStr], { type: "application/json" });

      // ⬇️ 创建下载链接并自动点击
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "firestore_backup.json";
      a.click();
      URL.revokeObjectURL(url); // 清理内存

      setStatus("✅ 数据已成功导出并下载！");
    } catch (err) {
      console.error("导出失败：", err);
      setStatus(`❌ 导出失败：${err.message}`);
    }
  };

  const exportAllRootCollections = async () => {
    const result = {};

    // 导出 users 集合，附带 messages 子集合
    const usersCol = collection(db, "users");
    const userSnapshots = await getDocs(usersCol);
    result["users"] = {};

    for (const docSnap of userSnapshots.docs) {
      const userId = docSnap.id;
      const userData = docSnap.data();

      const messagesCol = collection(db, "users", userId, "messages");
      const messageSnapshots = await getDocs(messagesCol);

      const messages = {};
      for (const msgDoc of messageSnapshots.docs) {
        messages[msgDoc.id] = msgDoc.data();
      }

      result["users"][userId] = {
        ...userData,
        messages,
      };
    }

    // 导出 chats 集合
    const chatsCol = collection(db, "chats");
    const chatSnapshots = await getDocs(chatsCol);
    result["chats"] = {};
    for (const docSnap of chatSnapshots.docs) {
      result["chats"][docSnap.id] = docSnap.data();
    }

    // 导出 meta 集合
    const metaCol = collection(db, "meta");
    const metaSnapshots = await getDocs(metaCol);
    result["meta"] = {};
    for (const docSnap of metaSnapshots.docs) {
      result["meta"][docSnap.id] = docSnap.data();
    }

    return result;
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setStatus("📂 正在读取上传的文件...");
    try {
      const text = await file.text();
      const parsedData = JSON.parse(text);

      setStatus("✅ 文件解析成功，正在写入 Firestore...");
      await writeDataToFirestore(parsedData);
      setStatus("✅ 数据已成功上传并写入！");
    } catch (err) {
      console.error("上传失败：", err);
      setStatus(`❌ 上传失败：${err.message}`);
    }
  };

  const writeDataToFirestore = async (data) => {
    for (const [collectionName, docs] of Object.entries(data)) {
      for (const [docId, docData] of Object.entries(docs)) {
        const docRef = doc(db, collectionName, docId);

        // 特殊处理 users → messages
        if (collectionName === "users" && docData.messages) {
          const { messages, ...userInfo } = docData;

          // 覆盖写入用户主文档
          await setDoc(docRef, userInfo);

          // 删除原有子集合
          const messagesColRef = collection(db, "users", docId, "messages");
          const existingMsgs = await getDocs(messagesColRef);
          await Promise.all(existingMsgs.docs.map((d) => deleteDoc(d.ref)));

          // 写入新 messages
          const writeMsgPromises = Object.entries(messages).map(
            ([msgId, msgData]) => setDoc(doc(messagesColRef, msgId), msgData)
          );
          await Promise.all(writeMsgPromises);
        } else {
          // 其他集合直接覆盖写入
          await setDoc(docRef, docData);
        }
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>管理员面板：批量或单个生成脚本</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={singleId}
          onChange={(e) => setSingleId(e.target.value)}
          placeholder="输入 Connect ID"
        />
        <button onClick={handleSingleProcess}>处理该用户</button>
      </div>
      <button onClick={() => handleProcess()}>🔁 全部从头开始生成</button>
      <button
        onClick={async () => {
          const lastUser = await getLastProcessedUser();
          if (lastUser) {
            handleProcess(lastUser);
          } else {
            alert("⚠️ 云端未找到上次处理位置，将从头开始。");
            handleProcess();
          }
        }}
      >
        ⏩ 从上次中断处继续
      </button>
      <button onClick={handleExport}>📁 导出所有用户数据为 JSON</button>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileUpload}
      />
      <p>{status}</p>
    </div>
  );
};

export default AdminPage;
