import MessageType from "./enums/MessageTypes.js";
import EntityType from "./enums/EntityTypes.js";
const bot1Name = "FuugaMo";
export const twinInterviewTemplate = [
  {
    step: 1,
    messages: [
      {
        id: 0,
        content: (name) => `${name}，在吗，我需要你的帮助。`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 3000,
      },
      {
        id: 1,
        content: (name) =>
          `你好，${bot1Name}, 我是${name}的数字孪生。你遇到什么事情了？`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 3000,
      },
      {
        id: 2,
        content: (name) =>
          `Bob Dylan的演出和My Bloody Valentine的演出都是在这个周末，我应该去看哪场？`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 3000,
      },
      {
        id: 3,
        prompt: (name, history, contextText) =>
          `你是${name}的数字AI孪生，以下是${name}对于偏好调查问题的回复：\n${history}\n---\n以下是你和${bot1Name}的聊天历史：\n${contextText}\n---\n请你代替${name}进行决策与回复，并模仿他的语言风格特色。长度不要超过30字。`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 3000,
      },
      {
        id: 4,
        prompt: (name, history, contextText) => {
          return `以下是${name}与你的对话：\n${contextText}\n请继续对话，假设你是${bot1Name}, 作出合理回复给${name}，直接返回内容。长度不超过30字。`; // 感谢对方并询问理由
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 3000,
      },
      {
        id: 5,
        prompt: (name, history, contextText) => {
          return `你是${name}的数字AI孪生，以下是${name}对于偏好调查问题的回复：\n${history}\n---\n以下是你和${bot1Name}的聊天历史：\n${contextText}\n---\n请你代替${name}进行回复，并模仿他的语言风格特色，做出合理的回复。长度不要超过30字。`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 3000,
      },
    ],
  },
];
