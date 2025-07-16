import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// Firebase 初始化
import { firebaseConfig, API_BASE } from "../config/config.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";

// 消息类型与发送方枚举定义
import MessageType from "../enums/MessageTypes.js";
import EntityType from "../enums/EntityTypes.js";

// 模板
// import { twinProsocialScript } from "../twinProsocialScript.js";
// import { twinNonProsocialScript } from "../twinNonProsocialScript.js";
// import { twinWithoutScript } from "../twinWithoutScript.js";
// import { assistantProsocialScript } from "../assistantProsocialScript.js";
// import { assistantNonProsocialScript } from "../assistantNonProsocialScript.js";
// import { assistantWithoutScript } from "../assistantWithoutScript.js";
import { help_align_verbatim_first } from "../help_align_verbatim_first.js";
import { help_align_verbatim_third } from "../help_align_verbatim_third.js";
import { help_align_warmer_first } from "../help_align_warmer_first.js";
import { help_align_warmer_third } from "../help_align_warmer_third.js";
import { help_noalign_verbatim_first } from "../help_noalign_verbatim_first.js";
import { help_noalign_verbatim_third } from "../help_noalign_verbatim_third.js";
import { help_noalign_warmer_first } from "../help_noalign_warmer_first.js";
import { help_noalign_warmer_third } from "../help_noalign_warmer_third.js";

import { nohelp_align_verbatim_first } from "../nohelp_align_verbatim_first.js";
import { nohelp_align_verbatim_third } from "../nohelp_align_verbatim_third.js";
import { nohelp_align_warmer_first } from "../nohelp_align_warmer_first.js";
import { nohelp_align_warmer_third } from "../nohelp_align_warmer_third.js";
import { nohelp_noalign_verbatim_first } from "../nohelp_noalign_verbatim_first.js";
import { nohelp_noalign_verbatim_third } from "../nohelp_noalign_verbatim_third.js";
import { nohelp_noalign_warmer_first } from "../nohelp_noalign_warmer_first.js";
import { nohelp_noalign_warmer_third } from "../nohelp_noalign_warmer_third.js";

const scriptMap = {
  help_align_verbatim_first,
  help_align_verbatim_third,
  help_align_warmer_first,
  help_align_warmer_third,
  help_noalign_verbatim_first,
  help_noalign_verbatim_third,
  help_noalign_warmer_first,
  help_noalign_warmer_third,
  nohelp_align_verbatim_first,
  nohelp_align_verbatim_third,
  nohelp_align_warmer_first,
  nohelp_align_warmer_third,
  nohelp_noalign_verbatim_first,
  nohelp_noalign_verbatim_third,
  nohelp_noalign_warmer_first,
  nohelp_noalign_warmer_third,
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// phase 1 questions
const phase_1_questions = [
  // Crowdsource Task
  // small talk 0-6
  "How long have you been using CloudResearch and about how many studies have you done on CloudResearch?",
  "What kinds of tasks on CloudResearch do you like? Please provide some examples.",
  "Are there any tasks you don’t like on CloudResearch? Please provide some examples.",
  "What are your favorite TV shows or movies? Why do you like them?",
  "Do you have any favorite actors or actresses? What do you like about them?",
  "What kind of music do you like? Why do you like it?",
  "Do you have any hobbies?",

  // work 7-12
  "What is your current or most recent job?",
  "Please briefly describe what you do (or did) in this job.",
  "How did you get into it?",
  "What do you like or find meaningful about this job?",
  "What do you find most challenging or frustrating about this job?",
  "If someone wanted to enter this field, what advice would you give them?",

  // city
  "Which city do you currently live in?",
  "How long have you lived there?",
  "What do you like about living there?",
  "Is there anything you don’t like about living there?",
  "If a friend were visiting your city, what’s one place or activity you would recommend?",

  // personality
  "Do you consider yourself more introverted or extroverted? Why?",
  "In social situations, do you tend to lead or follow?",
  "How do you usually respond to stressful situations?",
  "Are you more of a planner or do you prefer to go with the flow?",
  "When making decisions, do you rely more on logic or intuition?"

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
const selectTemplate = (isHelp, isAlign, isVerbatim, isFPV) => {
  const helpKey = isHelp ? "help" : "nohelp";
  const alignKey = isAlign ? "align" : "noalign";
  const styleKey = isVerbatim ? "verbatim" : "warmer";
  const povKey = isFPV ? "first" : "third";

  const key = `${helpKey}_${alignKey}_${styleKey}_${povKey}`;

  const template = scriptMap[key];

  if (!template) {
    console.error(`No script found for key: ${key}`);
    return null;
  }

  return template;
};

/**
 * 多轮推进 GPT 消息对话（返回完整 messageGroups）
 */
const stepwiseGPTConversation = async (template, userInfo) => {
  const { name, history, isHelp, isAlign, isFPV, isVerbatim } = userInfo;

  const questions = phase_1_questions;

  const historyEntries = (history || []).slice(1); // 跳过 start

  // 只保留有对应问题的部分
  const validLength = Math.min(historyEntries.length, questions.length);
  const trimmedHistory = historyEntries.slice(0, validLength);

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
          `[${filled.senderName === "Twin" ? name : filled.senderName // 如果是Twin则在给AI看的对话记录中显示为本人姓名
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
          `[${filled.senderName === "Twin" ? name : filled.senderName
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
  const [userIds, setUserIds] = useState(Array(20).fill(""));

  // const handleBatchProcess = async () => {
  //   const validIds = userIds.filter((id) => id.trim() !== "");

  //   if (validIds.length === 0) {
  //     setStatus("❌ 请至少填写一个有效的 user ID");
  //     return;
  //   }

  //   for (let i = 0; i < validIds.length; i++) {
  //     const userId = validIds[i];
  //     setStatus(`🚀 正在处理用户 ${userId} (${i + 1}/${validIds.length})`);

  //     try {
  //       const users = await getUserDataById(userId);
  //       const userInfo = users[userId];

  //       const template = selectTemplate(
  //         userInfo.isTwin,
  //         userInfo.prosocialStatus
  //       );
  //       const filledMessages = await stepwiseGPTConversation(
  //         template,
  //         userInfo
  //       );
  //       if (!filledMessages) {
  //         setStatus(`❌ GPT 生成失败，跳过用户 ${userId}`);
  //         continue;
  //       }

  //       await saveChatToDB(userId, filledMessages);
  //       await markAssignCompleted(userId);
  //       setStatus(`✅ 已处理用户 ${userId}`);
  //     } catch (err) {
  //       setStatus(`❌ 处理用户 ${userId} 出错：${err.message}`);
  //     }
  //   }

  //   setStatus("🎉 批量处理完成！");
  // };

  const handleMultiProcess = async () => {
    if (!singleId) {
      setStatus("❌ 请填写至少一个 Connect ID");
      return;
    }

    const ids = singleId
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (ids.length === 0) {
      setStatus("❌ 没有有效的 Connect ID");
      return;
    }

    for (const id of ids) {
      setStatus(`🔄 正在处理用户 ${id}...`);
      try {
        const users = await getUserDataById(id);
        const userInfo = users[id];

        const template = selectTemplate(
          userInfo.isHelp,
          userInfo.isAlign,
          userInfo.isVerbatim,
          userInfo.isFPV
        );
        console.log(
          userInfo.isHelp,
          userInfo.isAlign,
          userInfo.isVerbatim,
          userInfo.isFPV
        );
        const filledMessages = await stepwiseGPTConversation(
          template,
          userInfo
        );

        if (!filledMessages) {
          setStatus(`❌ GPT 生成失败，用户 ID: ${id}`);
          break;
        }

        await saveChatToDB(id, filledMessages);
        await markAssignCompleted(id);

        setStatus(`✅ 用户 ${id} 处理完成`);
      } catch (err) {
        setStatus(`❌ 处理用户 ${id} 时出错：${err.message}`);
      }
    }

    setStatus("🎉 所有指定用户处理完毕！");
  };

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
        userInfo.isHelp,
        userInfo.isAlign,
        userInfo.isVerbatim,
        userInfo.isFPV
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
          userInfo.isHelp,
          userInfo.isAlign,
          userInfo.isVerbatim,
          userInfo.isFPV
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
        <textarea
          rows={4}
          style={{ width: "100%", marginBottom: "10px" }}
          value={singleId}
          onChange={(e) => setSingleId(e.target.value)}
          placeholder="请输入 Connect ID，多个用逗号分隔（如：111, 222, 333）"
        />
        <button onClick={handleMultiProcess}>处理这些用户</button>
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
      {/* <div>
        <h4>批量指定 Connect ID（最多 20 个）</h4>
        {userIds.map((id, index) => (
          <input
            key={index}
            type="text"
            value={id}
            onChange={(e) => {
              const newIds = [...userIds];
              newIds[index] = e.target.value;
              setUserIds(newIds);
            }}
            placeholder={`User ID ${index + 1}`}
            style={{ margin: "4px" }}
          />
        ))}
        <div style={{ marginTop: 10 }}>
          <button onClick={handleBatchProcess}>处理这些用户</button>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default AdminPage;
