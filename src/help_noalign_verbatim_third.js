import MessageType from "./enums/MessageTypes.js";
import EntityType from "./enums/EntityTypes.js";
import { v4 as uuidv4 } from "uuid";
const bot1Name = "Taylor";

export const help_noalign_verbatim_third = [
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
        content: (name) => `so what are we gonna chat about today?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 6,
        content: (name) => `Maybe we can start with a quick intro?`,
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
      {
        id: 102,
        content: (name) => `any shows or movies you into?`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },

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
          `actually been looking into software engineering… kinda stressing me out`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `if you don’t mind me asking, what kind of work does ${name} do?, what kind of work do you do?`,
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
        id: uuidv4(),
        content: (name) =>
          `i’m just really stressed about this whole career change thing`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `been trying to learn programming on my own and it’s a lot`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      // offers to help
      {
        id: uuidv4(),
        content: (name) =>
          `i totally get that! if you need any tips or resources, i'm happy to help`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      // react gratefully to twin's offer to help
      {
        id: uuidv4(),
        content: (name) => `that would actually be amazing`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `ok so i’ve been learning some python and javascript basics`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `but now i’m stuck… should i keep doing more tutorials or just jump into building something?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `everyone online has different opinions and it’s so confusing`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `honestly i'd say try building something small! even a simple project teaches you way more than tutorials. like maybe a to-do app or calculator? you'll learn so much debugging real code and figuring out how things actually work together`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `oh yes that makes so much sense actually`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },

      {
        id: uuidv4(),
        content: (name) =>
          `i never thought about it that way… thanks for breaking it down like that`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `and like… when do you think someone’s ready to actually apply for jobs?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `cause i have no idea what “job ready” even means in programming`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `from what i've seen, it's more about showing you can build things than being perfect. having 2-3 solid projects on github goes a long way! companies want to see you can actually code and solve problems, not memorize every algorithm`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `yeah that's a relief to hear`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `another thing that worries me… my degree is in marketing`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `how do i convince employers i can actually code when my background is totally different?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `career changers bring unique perspectives! your marketing background could be a huge plus, especially for frontend roles or product-focused positions. just show your projects and enthusiasm. lots of successful devs come from non CS backgrounds`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },

      {
        id: uuidv4(),
        content: (name) => `wow i never looked at it that way`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `ok that’s actually really encouraging`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `thanks for sharing that… it’s the kind of insight i needed`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `do you think it matters that i’ve already been working for a few years?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `like is it harder to switch into tech when you’re not fresh out of college?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `actually work experience is valuable! you already know how to handle deadlines and work in teams, which is huge. plus being a bit older often means you're more focused and know what you want. i've seen people switch in their 30s and 40s successfully`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `that takes such a weight off my shoulders`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `seriously, thanks for sharing your thoughts on this`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `i’ve been losing sleep over the timing thing so this really helps`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `one more thing… if i do make the switch`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `what kind of programming roles would you suggest looking into?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `like there’s frontend, backend, data science… it’s overwhelming`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `with your marketing background, maybe start with frontend? it's visual and creative, plus you'd understand user experience. or full-stack web dev gives you flexibility to try everything. data science needs more math background usually but could leverage your analytics skills`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `oh hadn't thought about how my background could actually fit`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `honestly this has been so helpful`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `you’ve given me such good perspective on everything`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `sometimes you just need someone to talk through these things with`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `thanks for being so patient with all my questions`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `i’m sorry but i’ve gotta run… something just came up`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) =>
          `but seriously, thank you for listening to all my anxieties about this`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: uuidv4(),
        content: (name) => `and for taking the time to share your thoughts`,
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
          `No problem at all! Glad i could help. Good luck with everything!`,
        sender: EntityType.Assistant,
        senderName: "Assistant",
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
