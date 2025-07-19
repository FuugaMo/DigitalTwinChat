import MessageType from "./enums/MessageTypes.js";
import EntityType from "./enums/EntityTypes.js";
import { v4 as uuidv4 } from "uuid";
const bot1Name = "Taylor";

export const help_align_verbatim_first = [
  {
    step: 1,
    messages: [
      {
        id: uuidv4(),
        content: (name) => `heyy nice to meet you`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `hey same here`,
        sender: EntityType.Twin,
        senderName: "Twin",
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
        content: (name) => `you can just call me ${name}`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 4,
        content: (name) => `hi ${name}`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 100,
        content: (name) => `so what are we gonna chat about today?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 6,
        content: (name) => `Maybe we can start with a quick intro?`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 5,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[0]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
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

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
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

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 102,
        content: (name) =>
          `so yeah besides working at cloudresearch, do you have any favourite artists or music`,
        sender: EntityType.Twin,
        senderName: "Twin",
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
        content: (name) => `how about you`,
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

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
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
        sender: EntityType.Twin,
        senderName: "Twin",
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
        content: (name) => `ive always loved friends!`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },

      // Prosocial
      {
        id: 29,
        content: (name) => `though lately i haven’t been watching it as much`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 106,
        content: (name) =>
          `been too busy thinking about work stuff and what i wanna do next`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `if you don’t mind me asking, what kind of work do you do?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          const selectedHistory = history[7]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `oh that’s super cool`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `i’ve actually been looking into that field a bit`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `like not seriously applying yet lol but i’ve been curious`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `i’ve been hoping to talk to someone who actually works in that space`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `just to get a real sense of what it’s actually like day to day`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 102,
        content: (name) =>
          `if you need, i'd be happy to share what my day-to-day actually looks like`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `that'd be perfect`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          const selectedHistory = history[8]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message. React naturally to Twin’s work description, showing genuine interest in specific details they mentioned.
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
        id: uuidv4(),
        content: (name) => `thanks for explaining it like that`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `i think what confuses me is like… job postings always list all these requirements but they never really say what you’ll actually be doing`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `so hearing you describe the actual tasks helps picture it better`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `no worries! happy to help`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `i'm curious how do you feel about it overall?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `i guess what i’m trying to figure out is… would i find it fulfilling? or would it just feel like going through the motions every day`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          const selectedHistory = history[10]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message. Respond to specific aspects Twin mentioned they find meaningful, connecting it to your own values or interests
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
        id: uuidv4(),
        content: (name) =>
          `also gives me more to think about than just the salary stuff`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `i’ve been worried that work is just work... but hearing you talk about that part makes me think maybe i could find something similar`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `that's great to hear! tho i should mention it's not always easy, there are tough days too`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          const selectedHistory = history[11]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message. Acknowledge the specific challenge Twin mentioned and show appreciation for their honesty.
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
        id: uuidv4(),
        content: (name) => `thanks for being real about it `,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `at least now i know what i’d be signing up for`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `do you think is there anything else i should keep in mind?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          const selectedHistory = history[12]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital twin for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- Reply as ${name} to continue the conversation.
- First priority: Try to use ${name}'s personal preference answer as directly as possible. If it can work as a response with minimal adaptation, use it nearly verbatim.
- Only if the personal preference answer doesn't fit the current context, adapt it naturally while still incorporating their words, topics, and style.
- Match the personal preference answer's length.
- This is a casual text message. Include natural imperfections like missing caps or casual punctuation.
- IMPORTANT: Do not ask any questions.
- Do not include your name in the reply.`;
        },
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: uuidv4(),
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message. React to specific advice Twin gave, mentioning how it changes your approach or gives you a concrete next step.
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
        id: uuidv4(),
        content: (name) =>
          `ok that actually makes it feel way less intimidating`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `this helps a lot, thanks`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `you’ve given me a lot to think about… and some actual steps i can take`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `way better than reading another generic career blog lol`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `that's really nice to hear, glad our chat helped!`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `${name} i’m sorry but i’ve gotta run… something just came up`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `but i just wanted to say, talking with you was nice today`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `thanks for sharing so much about your work and being such a good listener`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `it really meant a lot`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `no problem at all! glad i could help. good luck with everything!`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      //
      //
      //

      {
        id: uuidv4(),
        content: (name) => `====== END OF CONVERSATION ======`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
      {
        id: uuidv4(),
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
