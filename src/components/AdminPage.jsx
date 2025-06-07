import React, { useState } from "react";

// Firebase 初始化
import { firebaseConfig, API_BASE } from "../config/config.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";

// 消息类型与发送方枚举定义
import MessageType from "../enums/MessageTypes.js";
import EntityType from "../enums/EntityTypes.js";

// 模板
import { twinInterviewTemplate } from "../twinInterviewTemplate";
import { assistantInterviewTemplate } from "../assistantInterviewTemplate";

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// phase 1 questions
const questions = [
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

/**
 * 选择对应模板
 */
const selectTemplate = (isTwin) => {
  return isTwin ? twinInterviewTemplate : assistantInterviewTemplate;
};

/**
 * 注入变量：将 history 拼接成语料字符串，注入模板函数字段
 */
const injectVariables = (template, user) => {
  const { name, history, isTwin } = user;

  // 拼接所有 message 字段为一段语料（字符串）
  const joinedHistory = (history || [])
    .map((entry) => entry.message)
    .filter(Boolean)
    .join(" / "); // 可换为 '\n' 或其它分隔符

  console.log(`Joined history: ${joinedHistory}`);

  return template.map((group) => ({
    step: group.step,
    messages: group.messages.map((msg) => {
      const filled = {
        id: msg.id,
        step: group.step,
        sender: msg.sender,
        senderName: msg.senderName,
        type: msg.type,
        delay: msg.delay,
      };

      if (msg.prompt) {
        filled.prompt =
          typeof msg.prompt === "function"
            ? msg.prompt(joinedHistory || "（无语料）")
            : msg.prompt;
      }

      if (msg.content) {
        filled.content =
          typeof msg.content === "function"
            ? msg.content(name || "用户")
            : msg.content;
      }

      return filled;
    }),
  }));
};

/**
 * 多轮推进 GPT 消息对话（返回完整 messageGroups）
 */
const stepwiseGPTConversation = async (template, user) => {
  const { name, history } = user;

  // const joinedHistory = (history || [])
  //   .map((entry) => entry.message)
  //   .filter(Boolean)
  //   .join(" / ");

  const joinedHistory = (history || []).slice(1).map((entry, index) => {
    // 跳过第一个 'start' 回复。
    const question = questions[index] || "";
    return `Question: ${question} ${name} : ${entry.message}`;
  });

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

        const prompt =
          typeof msg.prompt === "function"
            ? msg.prompt(name, joinedHistory, contextText)
            : msg.prompt;

        console.log(`🟡 Prompt:\n${prompt}`);

        const aiResponse = await callChatGPT(prompt); // 不传 gptHistory 了
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
 * 将 messageGroups 写入 Firestore：chats/{userId}-A
 */
const saveChatToDB = async (userId, messages) => {
  await setDoc(doc(db, "chats", `${userId}-A`), {
    messages: messages,
    generatedAt: new Date().toISOString(),
  });
};

/**
 * 管理员主界面：点击生成全部 -A 对话
 */
const AdminPage = () => {
  const [status, setStatus] = useState("等待开始...");

  const handleProcess = async () => {
    setStatus("读取用户数据中...");
    const users = await getAllUserData();
    let processed = 0;

    for (const [userId, userInfo] of Object.entries(users)) {
      const template = selectTemplate(userInfo.isTwin); // 获取对话启动模板
      const filledMessages = await stepwiseGPTConversation(template, userInfo);
      await saveChatToDB(userId, filledMessages);
      processed++;
      setStatus(`✅ 已处理 ${processed} 个用户：${userId}`);
    }

    setStatus("🎉 全部用户处理完成！");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>管理员面板：批量生成 -A 脚本</h2>
      <button onClick={handleProcess}>开始生成并上传</button>
      <p>{status}</p>
    </div>
  );
};

export default AdminPage;
