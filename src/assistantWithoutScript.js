import MessageType from "./enums/MessageTypes.js";
import EntityType from "./enums/EntityTypes.js";
const bot1Name = "Taylor";

export const assistantWithoutScript = [
  {
    step: 1,
    messages: [
      {
        id: 0,
        content: (name) => `heyy nice to meet u`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 1,
        content: (name) => `Hi nice to meet you!`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 2,
        content: (name) => `im taylor! what should i call u?
        `,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 3,
        content: (name) => `You may refer to me as ${name}'s assistant.`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 4,
        content: (name) =>
          `cool! has ${name} done a lot of studies before? i only started recently
        `,
        sender: EntityType.Bot1,
        senderName: bot1Name,
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
- As ${name}’s assistant, write a message in response to ${bot1Name}’s most recent text.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 6,
        content: (name) => `How's your experience so far?`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
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
- As ${name}’s assistant, write a message in response to ${bot1Name}’s most recent text.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not ask any questions.`;
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
- Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).`;
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
- As ${name}’s assistant, write a message in response to ${bot1Name}’s most recent text.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },

      // Music
      {
        id: 12,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
- Write a short, casual reply. Keep your reply around 10 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 13,
        content: (name) =>
          `actually they provide some topics for me to chat with u haha`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 14,
        content: (name) => `does ${name} have any favorite artists or music?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 15,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[8]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital assistant for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- As ${name}’s assistant, write a message in response to ${bot1Name}’s most recent text.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not ask any questions.`;
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
      //     `You are the digital assistant for ${name}.
      //   Below are ${name}'s responses to various personal preference questions:
      //   ${history}
      //   ---
      //   Following is the recent conversation between ${name} and ${bot1Name}:
      //   ${contextText}
      //   ---
      //   Based on the information above, respond to ${bot1Name}'s latest message in the first person.
      //   Focus on providing an informative and relevant reply.
      //   You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
      //   sender: EntityType.Assistant,
      //   senderName: "Assistant",
      //   type: MessageType.GPT,
      //   delay: 2000,
      // },
      {
        id: 18,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
- Write a short, casual reply. Keep your reply around 10 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
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
          `idk if u know the crown.. its that show about the british royals`,
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
        id: 22,
        content: (name) => `any shows or movies ${name} into?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },

      // Drama/Movie
      {
        id: 23,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[4]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital assistant for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- As ${name}’s assistant, write a message in response to ${bot1Name}’s most recent text.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 24,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
- Write a short, casual reply. Keep your reply around 10 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
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
      //     `You are the digital assistant for ${name}.
      //   Below are ${name}'s responses to various personal preference questions:
      //   ${history}
      //   ---
      //   Following is the recent conversation between ${name} and ${bot1Name}:
      //   ${contextText}
      //   ---
      //   Based on the information above, respond to ${bot1Name}'s latest message in the first person.
      //   Focus on providing an informative and relevant reply.
      //   You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
      //   sender: EntityType.Assistant,
      //   senderName: "Assistant",
      //   type: MessageType.GPT,
      //   delay: 2000,
      // },
      {
        id: 27,
        content: (name) =>
          `In addition to The Crown, which other shows or films would you suggest?`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
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
        id: 30,
        content: (name) => `whos ${name} favorite actor?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 31,
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
- As ${name}’s assistant, write a message in response to ${bot1Name}’s most recent text.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 32,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
- Write a short, casual reply. Keep your reply around 10 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 33,
        content: (name) => `does ${name} have any hobbies btw?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 34,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[9]; // 参考 Admin Page 开头的 questions 列表
          const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

          return `You are the digital assistant for ${name}.  
          Below are ${name}'s responses to a personal preference question:  
          ${formatted}.
          ---  
          Following is the recent conversation between ${name} and ${bot1Name}:  
          ${contextText}  
          ---  
          Your task:
- As ${name}’s assistant, write a message in response to ${bot1Name}’s most recent text.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 35,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
- Write a short, casual reply. Keep your reply around 10 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
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
        content: (name) => `I feel the same. Wishing you all the best.`,
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
