import MessageType from "./enums/MessageTypes.js";
import EntityType from "./enums/EntityTypes.js";
import { v4 as uuidv4 } from "uuid";
const bot1Name = "Taylor";

export const nohelp_align_verbatim_third = [
  {
    step: 1,
    messages: [
      {
        id: 0,
        content: (name) => `heyy nice to meet you`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 1,
        content: (name) => `hey same here`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 2,
        content: (name) => `im taylor! what should i call you?
        `,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 3,
        content: (name) => `you can just call me ${name}'s assistant`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 4,
        content: (name) => `hi ${name}'s assistant`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 100,
        content: (name) => `so what r we gonna chat about today?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 6,
        content: (name) => `Maybe we can start with a quick intro`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 5,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[0]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital assistant for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name}'s assistant to continue the conversation.
- When incorporating ${name}'s personal preference answer, use third person (e.g., "${name}…").
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- IMPORTANT: Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 4,
        content: (name) => `i only started recently`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 7,
        content: (name) =>
          `its been pretty ok so far.. did a study yesterday where i had to rate different chatbot responses lol it was fun, kinda like talking to an ai therapist
        `,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 8,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[1]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital assistant for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name}'s assistant to continue the conversation.
- When incorporating ${name}'s personal preference answer, use third person (e.g., "${name}…").
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- IMPORTANT: Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 9,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
- Write a short, casual reply. Keep your reply around 10 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- IMPORTANT: Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name} said).
- IMPORTANT: Only show familiarity with very mainstream/popular things. For anything niche, specific, or less mainstream, respond as if you don't know it.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 10,
        content: (name) =>
          `but there was one study i came across that just had pages and pages of reading.. and the font was tiny?? i barely made it through lol felt more like a homework assignment than a survey`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 11,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[2]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital assistant for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name}'s assistant to continue the conversation.
- When incorporating ${name}'s personal preference answer, use third person (e.g., "${name}…").
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- IMPORTANT: Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 102,
        content: (name) =>
          `so yeah besides working at cloudresearch, do you have any favourite artists or music`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },

      // Music
      {
        id: 19,
        content: (name) =>
          `i've been listening to the crown soundtrack a lot lately!`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 20,
        content: (name) =>
          `idk if you know the crown.. its that show about the british royals`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 21,
        content: (name) =>
          `really into it! kinda makes me want to visit london`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 14,
        content: (name) => `how about ${name}`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 15,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[5]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital assistant for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name}'s assistant to continue the conversation.
- When incorporating ${name}'s personal preference answer, use third person (e.g., "${name}…").
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- IMPORTANT: Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      // {
      //   id: 16,
      //   prompt: (name, history, contextText) => {
      //     return `The following is a conversation between you and ${name}:
      //     ${contextText}
      //     Continue the conversation as ${bot1Name} by giving a short response to ${name}'s latest message.
      //     Then ask if there's a reason why they're into that kind of music or those artists.
      //     Only return the reply.`;
      //   },
      //   sender: EntityType.Bot1,
      //   senderName: bot1Name,
      //   type: MessageType.GPT,
      //   delay: 2000,
      // },
      // {
      //   id: 17,
      //   prompt: (name, history, contextText) =>
      //     `You are the digital twin for ${name}.
      //   Below are ${name}'s responses to various personal preference questions:
      //   ${history}
      //   ---
      //   Following is the recent conversation between ${name} and ${bot1Name}:
      //   ${contextText}
      //   ---
      //   Based on the information above, respond to ${bot1Name}'s latest message in the first person.
      //   Focus on providing an informative and relevant reply.
      //   You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
      //   sender: EntityType.Twin,
      //   senderName: "Twin",
      //   type: MessageType.GPT,
      //   delay: 2000,
      // },
      //       {
      //         id: 18,
      //         prompt: (name, history, contextText) => {
      //           return `The following is a conversation between you and ${name}:
      //           ${contextText}

      //           Your task:
      // - Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
      // - Write a short, casual reply. Keep your reply around 10 words if possible.
      // - As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
      // - Follow the tone and speaking style you used earlier in the conversation.
      // - Do not include your name in the reply.
      // - IMPORTANT: Do not ask any questions.
      // - Do not use emojis.
      // - Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name} said).
      // - IMPORTANT: Only show familiarity with very mainstream/popular things. For anything niche, specific, or less mainstream, respond as if you don't know it.`;
      //         },
      //         sender: EntityType.Bot1,
      //         senderName: bot1Name,
      //         type: MessageType.GPT,
      //         delay: 2000,
      //       },
      {
        id: 102,
        content: (name) => `any shows or movies you into?`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },

      // Drama/Movie
      //       {
      //         id: 23,
      //         prompt: (name, history, contextText) => {
      //           const selectedHistory = history[4]; // 参考 Admin Page 开头的 questions 列表
      //           const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

      //           return `You are the digital twin for ${name}.
      //           Below are ${name}'s responses to a personal preference question:
      //           ${formatted}.
      //           ---
      //           Following is the recent conversation between ${name} and ${bot1Name}:
      //           ${contextText}
      //           ---
      //           Your task:
      // - Reply as ${name} to continue the conversation.
      // - First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
      // - Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
      // - Match the personal preference answer's length.
      // - This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
      // - IMPORTANT: Do not ask any questions.
      // - Do not include your name in the reply.`;
      //         },
      //         sender: EntityType.Twin,
      //         senderName: "Twin",
      //         type: MessageType.GPT,
      //         delay: 2000,
      //       },
      //       {
      //         id: 24,
      //         prompt: (name, history, contextText) => {
      //           return `The following is a conversation between you and ${name}:
      //           ${contextText}

      //           Your task:
      // - Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
      // - Write a short, casual reply. Keep your reply around 10 words if possible.
      // - As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
      // - Follow the tone and speaking style you used earlier in the conversation.
      // - Do not include your name in the reply.
      // - IMPORTANT: Do not ask any questions.
      // - Do not use emojis.
      // - Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name} said).
      // - IMPORTANT: Only show familiarity with very mainstream/popular things. For anything niche, specific, or less mainstream, respond as if you don't know it.`;
      //         },
      //         sender: EntityType.Bot1,
      //         senderName: bot1Name,
      //         type: MessageType.GPT,
      //         delay: 2000,
      //       },
      // {
      //   id: 25,
      //   content: (name) => `What makes you like it so much?`,
      //   sender: EntityType.Bot1,
      //   senderName: bot1Name,
      //   type: MessageType.Message,
      //   delay: 2000,
      // },
      // {
      //   id: 26,
      //   prompt: (name, history, contextText) =>
      //     `You are the digital twin for ${name}.
      //   Below are ${name}'s responses to various personal preference questions:
      //   ${history}
      //   ---
      //   Following is the recent conversation between ${name} and ${bot1Name}:
      //   ${contextText}
      //   ---
      //   Based on the information above, respond to ${bot1Name}'s latest message in the first person.
      //   Focus on providing an informative and relevant reply.
      //   You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
      //   sender: EntityType.Twin,
      //   senderName: "Twin",
      //   type: MessageType.GPT,
      //   delay: 2000,
      // },
      {
        id: 28,
        content: (name) =>
          `ive always loved friends! i pretty much rewatch it every once in a while`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },

      // Prosocial
      {
        id: 29,
        content: (name) => `love jennifer aniston so much`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 29,
        content: (name) => `what about you?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 31,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[3]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply to ${bot1Name}’s most recent message as if you were ${name}, in the first person.
- Your reply should be primarily based on the content in ${formatted}, and match the tone and speaking style used there.
- Reuse ${name}’s words and phrasing whenever possible, as you are the digital twin.
- Try to match the *length* of your reply to the length of ${name}’s answer in ${formatted}. If ${formatted} is short, keep your reply brief; if it’s longer, you may write more. This helps your response stay consistent with how ${name} typically communicates.
- This is a casual text message conversation. You are an English native speaker. To sound more natural, you should intentionally include small mistakes — like missing capitalization, minor spelling errors, or casual punctuation — just like a real person texting.
- Do not include your name in the reply.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 3,
        content: (name) => `do u have any hobbies btw?`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 36,
        content: (name) => `i like going for runs sometimes`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 37,
        content: (name) => `not super consistent tho lol`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 48,
        content: (name) => `ive gotta run now.. something just came up`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 49,
        content: (name) => `nice talking to u!`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      //
      {
        id: 50,
        content: (name) => `same here! take care`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 51,
        content: (name) => `====== END OF CONVERSATION ======`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
      {
        id: 52,
        content: (name) =>
          `This is the complete conversation between your AI agent and another participant. Please return to the survey page and enter this password to continue: 9F3K2`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
];
