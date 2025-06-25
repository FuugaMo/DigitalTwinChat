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

const rootCollections = ["users", "chats", "meta"];

const exportAllRootCollections = async () => {
  const result = {};

  for (const colName of rootCollections) {
    const colRef = collection(db, colName);
    const snapshot = await getDocs(colRef);

    result[colName] = {};

    for (const docSnap of snapshot.docs) {
      const docId = docSnap.id;
      const data = docSnap.data();

      // 如果需要递归导出子集合，可以在这里加递归函数（下方示例）

      result[colName][docId] = data;
    }
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

  const handleExportData = async () => {
    setStatus("📦 正在导出所有用户数据...");
    try {
      const userData = await exportAllRootCollections();

      // 转成 JSON 字符串
      const jsonStr = JSON.stringify(userData, null, 2);

      // 生成 Blob 并触发浏览器下载
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "firestore_users_backup.json";
      a.click();

      URL.revokeObjectURL(url); // 清理 URL 对象
      setStatus("✅ 数据已成功导出为 JSON 文件！");
      console.log("📦 导出的数据：", userData);
    } catch (err) {
      console.error("导出失败：", err);
      setStatus(`❌ 导出失败：${err.message}`);
    }
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
    for (const [userId, userData] of Object.entries(data)) {
      const userRef = doc(db, "users", userId);

      // 拆分 user 主数据 和 messages 子集合
      const { history, ...userInfo } = userData;

      // 写入主文档（覆盖）
      await setDoc(userRef, userInfo);

      // 清空并重新写 messages 子集合（不做 merge）
      const messagesColRef = collection(db, "users", userId, "messages");

      // 先获取已有消息并删除（如果你想真正“覆盖”）
      const existing = await getDocs(messagesColRef);
      const deletePromises = existing.docs.map((d) => deleteDoc(d.ref));
      await Promise.all(deletePromises);

      // 再插入新的 history
      const writePromises = (history || []).map((msgData, index) =>
        setDoc(doc(messagesColRef, `${index}`), msgData)
      );
      await Promise.all(writePromises);
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
      <button onClick={handleExportData}>📁 导出所有用户数据为 JSON</button>
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
