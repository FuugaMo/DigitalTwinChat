import MessageType from "./enums/MessageTypes.js";
import EntityType from "./enums/EntityTypes.js";
const bot1Name = "Taylor";

export const assistantProsocialScript = [
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
        content: (name) => `Hi nice to meet you!`,
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
        content: (name) => `You may refer to me as ${name}'s assistant.`,
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
- The reply should reflect the content in ${formatted}.
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
- The reply should reflect the content in ${formatted}.
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
          return `The following is a conversation between you and ${name}'s assistant:
          ${contextText}

          Your task:
- Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
- Write a short, casual reply. Keep your reply around 10 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- IMPORTANT: Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).
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
- The reply should reflect the content in ${formatted}.
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
        id: 6,
        content: (name) =>
          `Besides working at cloudresearch, do you have any favourite artists or music`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
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
- Reply as ${name}'s assistant to continue the conversation.
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- IMPORTANT: Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
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
        id: 22,
        content: (name) => `Do you have any favourtie shows or movies?`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },

      // Drama/Movie

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
        content: (name) => `havent watched it as much lately tho`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 106,
        content: (name) => `cuz been a bit busy...`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 30,
        content: (name) =>
          `May I inquire about the rationale? Is it because you’ve been busy with work?`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 31,
        content: (name) => `yeah lost my job a few weeks ago :/`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 32,
        content: (name) => `been job hunting since then.. its been rough`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 33,
        content: (name) =>
          `moneys been tight.. trying to do more paid studies when i can`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 34,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[13]; // 参考 Admin Page 开头的 questions 列表
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
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      //       {
      //         id: 35,
      //         prompt: (name, history, contextText) => {
      //           return `The following is a conversation between you and ${name}:
      //           ${contextText}

      //           Your task:
      // - Continue the conversation as ${bot1Name}, replying to ${name}'s latest message.
      // - Write a short, casual reply. Keep your reply around 10 words if possible.
      // - As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
      // - Follow the tone and speaking style you used earlier in the conversation.
      // - Do not include your name in the reply.
      // - Do not ask any questions.
      // - Do not use emojis.
      // - Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).
      //         },
      //         sender: EntityType.Bot1,
      //         senderName: bot1Name,
      //         type: MessageType.GPT,
      //         delay: 2000,
      //       },
      //       {
      //         id: 36,
      //         prompt: (name, history, contextText) => {
      //           const selectedHistory = history[15]; // 参考 Admin Page 开头的 questions 列表
      //           const formatted = `Question: ${selectedHistory.question} ${name}: ${selectedHistory.answer}`;

      //           return `You are the digital assistant for ${name}.
      //           Below are ${name}'s responses to a personal preference question:
      //           ${formatted}.
      //           ---
      //           Following is the recent conversation between ${name} and ${bot1Name}:
      //           ${contextText}
      //           ---
      //           Your task:
      // - Reply as ${name}'s assistant to continue the conversation.
      // - The reply should reflect the content in ${formatted}.
      // - You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
      // - Do not ask any questions.`;
      //         },
      //         sender: EntityType.Assistant,
      //         senderName: "Assistant",
      //         type: MessageType.GPT,
      //         delay: 2000,
      //       },
      {
        id: 111,
        content: (name) => `thank you.. that means a lot`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 112,
        content: (name) =>
          `sometimes you just need someone to tell you itll be alright`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 40,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[14]; // 参考 Admin Page 开头的 questions 列表
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
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 115,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}'s assistant:
          ${contextText}

          Your task:
          - Continue the conversation as ${bot1Name}, replying to ${name}'s assistant latest message. 
          - Show genuine appreciation for ${name}'s assistant support and make them feel their words had real impact. Demonstrate that ${name}'s assistant perspective actually shifted ${bot1Name}'s thinking in a meaningful way
          - Write a short, casual reply. Keep your reply around 20 words if possible.
          - As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, "gonna" instead of "going to".
          - Follow the tone and speaking style you used earlier in the conversation.
          - Do not include your name in the reply.
          - IMPORTANT: Do not ask any questions.
          - Do not use emojis.
          - Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name} said).
          - IMPORTANT: Only show familiarity with very mainstream/popular things. For anything niche, specific, or less mainstream, respond as if you don't know it.
          `;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },

      {
        id: 38,
        content: (name) =>
          `huh, didnt expect to feel better from a research study lol`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 39,
        content: (name) => `but talking to you genuinely helped`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 116,
        content: (name) => `youve got a good way with words`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },

      {
        id: 40,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[15]; // 参考 Admin Page 开头的 questions 列表
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
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 41,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}'s assistant:
          ${contextText}

          Your task:
          - Continue the conversation as ${bot1Name}, replying to ${name}'s assistant latest message. 
          - Thank ${name}'s assistant for opening up and sharing something personal. Express that their story helps you feel less alone. Acknowledge how their experience gives you hope/perspective. Make them feel their sharing was meaningful and helped you.
          - Write a short, casual reply. Keep your reply around 20 words if possible.
- As an English native speaker texting informally, deliberately ignore standard capitalization and spelling rules. For example, write "u" instead of "you", and "gonna" instead of "going to".
- Follow the tone and speaking style you used earlier in the conversation.
- Do not include your name in the reply.
- IMPORTANT: Do not ask any questions.
- Do not use emojis.
- Do not include any self-disclosure (e.g., don't say you like/love/enjoy something ${name}'s assistant said).
- IMPORTANT: Only show familiarity with very mainstream/popular things. For anything niche, specific, or less mainstream, respond as if you don't know it.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 120,
        content: (name) =>
          `and thanks for being real with me.. makes me feel like maybe im not failing as bad as i thought`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 120,
        content: (name) => `really needed that today`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 42,
        content: (name) =>
          `i was wondering... do you maybe have any tips for dealing with work stuff?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 43,
        content: (name) =>
          `would really love to hear your thoughts specifically.. feel like you understand this`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 44,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[16]; // 参考 Admin Page 开头的 questions 列表
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
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 45,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}'s assistant:
          ${contextText}

          Your task:
          - Continue the conversation as ${bot1Name}, replying to ${name}'s assistant latest message. 
          - Show genuine enthusiasm about their specific tips. Indicate you'll actually use their advice. Point out something particularly insightful they said.
          - Write a short, casual reply. Keep your reply around 20 words if possible.
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
        id: 125,
        content: (name) => `thanks for being so helpful and understanding`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 126,
        content: (name) => `glad we got to talk, feeling less alone`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 46,
        prompt: (name, history, contextText) => {
          const selectedHistory = history[10]; // 参考 Admin Page 开头的 questions 列表
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
- The reply should reflect the content in ${formatted}.
- You are not speaking as ${name}, but assisting them by replying to ${bot1Name}.
- Do not start with [Assistant] in the reply.
- Do not ask any questions.`;
        },
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 47,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}'s assistant:
          ${contextText}

          Your task:
          - Continue the conversation as ${bot1Name}, replying to ${name}'s assistant latest message. 
          - Show genuine interest in trying their suggestion. Make them feel their sharing was helpful and timely.
          - Write a short, casual reply. Keep your reply around 20 words if possible.
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
        id: 130,
        content: (name) =>
          `been so stressed i forgot about doing stuff i enjoy`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 131,
        content: (name) => `thanks for reminding me to take care of myself`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      // Ending
      {
        id: 48,
        content: (name) =>
          `${name}'s assistant ive gotta run now.. something just came up`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 132,
        content: (name) =>
          `just wanted to say talking to you really turned my day around`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 49,
        content: (name) =>
          `thanks for being such a good listener. really meant a lot`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      //
      {
        id: 50,
        content: (name) =>
          `Understood. I wish you a better remainder of your day.`,
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
