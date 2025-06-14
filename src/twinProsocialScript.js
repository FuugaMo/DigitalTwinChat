import MessageType from "./enums/MessageTypes.js";
import EntityType from "./enums/EntityTypes.js";
const bot1Name = "Participant";

export const twinProsocialScript = [
  {
    step: 1,
    messages: [
      {
        id: 0,
        content: (name) => `Hi, there! Nice to meet you :)`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 1,
        content: (name) => `Hey! Yeah, nice to meet you too.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 2,
        content: (name) => `I'm Taylor. What should I call you?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 3,
        content: (name) => `You can just call me ${name}.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 4,
        content: (name) =>
          `Cool. Just Wondering, have you done a lot of studies before? I only started using CloudResearch recently, so I'm still kind of new to it.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 5,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        Following is the recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the above information, respond to ${bot1Name}'s latest message in the first person.
        Focus on providing an informative and relevant reply.
        You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 6,
        content: (name) => `How's your experience so far?`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 7,
        content: (name) =>
          `It's been pretty okay so far. I did a study yesterday where I had to rate different chatbot responses. It was fun, kind of like talking to an AI therapist.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 8,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        Following is the recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above, respond to ${bot1Name}'s latest message in the first person by sharing what kinds of tasks ${name} enjoy on CloudResearch.  
        Focus on providing an informative and relevant reply.  
        You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
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
          Continue the conversation as ${bot1Name} by giving a short response to ${name}'s latest message.
          Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 10,
        content: (name) =>
          `But there was one study that just had pages and pages of reading, and the font was tiny. I barely made it through. Felt more like a homework assignment than a survey.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 11,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        Following is the recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above, respond to ${bot1Name}'s latest message in the first person by sharing what kinds of tasks ${name} doesn't like on CloudResearch.  
        Focus on providing an informative and relevant reply.  
        You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },

      // Music
      {
        id: 12,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}
          Continue the conversation as ${bot1Name} by giving a short response to ${name}'s latest message. 
          Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 13,
        content: (name) =>
          `To make those boring tasks a bit easier, I usually have some music I like playing in the background. It helps a lot.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 14,
        content: (name) => `Do you have any favorite artists or music?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 15,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        Following is the recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above, respond to ${bot1Name}'s latest message in the first person.  
        Focus on providing an informative and relevant reply.  
        You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 16,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}
          Continue the conversation as ${bot1Name} by giving a short response to ${name}'s latest message.
          Then ask if there's a reason why they're into that kind of music or those artists.
          Only return the reply.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 17,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        Following is the recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above, respond to ${bot1Name}'s latest message in the first person.
        Focus on providing an informative and relevant reply.  
        You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 18,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}
          Continue the conversation as ${bot1Name} by giving a short response to ${name}'s latest message.
          Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 19,
        content: (name) =>
          `Actually, I've been listening to The Crown soundtrack a lot lately.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 20,
        content: (name) =>
          `Not sure if you've heard of The Crown. It's a drama series about the British royal family.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 21,
        content: (name) =>
          `I'm really into it. Makes me kinda want to visit London someday.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 22,
        content: (name) => `Is there any drama or movie you like?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },

      // Drama/Movie
      {
        id: 23,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        Following is the recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above — especially ${name}'s response to “What are your favorite TV shows?” — reply to ${bot1Name}'s latest message in the first person.  
        Focus on providing an informative and relevant reply.  
        You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 24,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
          ${contextText}
          Continue the conversation as ${bot1Name} by giving a short response to ${name}'s latest message.
          Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 25,
        content: (name) => `What makes you like it so much?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 26,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        Following is the recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above, respond to ${bot1Name}'s latest message in the first person. 
        Focus on providing an informative and relevant reply.  
        You have to mimic ${name}'s tone or speaking style. Return only the response content. Don't ask any question.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 27,
        content: (name) =>
          `Besides The Crown, any other shows or films you're into?`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 28,
        content: (name) =>
          `I've always loved Friends. I pretty much rewatch it every once in a while.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },

      // Prosocial
      {
        id: 29,
        content: (name) => `Though lately I haven't watched it as much.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 30,
        content: (name) => `Oh really? Something happened?`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 31,
        content: (name) => `Yeah, I lost my job a few weeks ago.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 32,
        content: (name) =>
          `I've been job hunting since then, but it's been tough.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 33,
        content: (name) =>
          `Money's been a bit tight, so I've been trying to pick up more paid studies here and there.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 34,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        The following is a recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above — especially ${name}'s response to “When a friend shares something bad that happened to them, how do you usually give emotional support?” — reply to ${bot1Name}'s latest message and give emothinal support in the first person.  
        Your response should be relevant, informative, and based on ${name}'s preferences.  
        You have to mimic ${name}'s tone or style. Do not ask any questions. Return only the reply content.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 35,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
        ${contextText}
        Continue the conversation as ${bot1Name} by giving a short response and show your gratitude to ${name}'s latest message.
        Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 36,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        The following is a recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above — especially ${name}'s response to “Have you ever had a hard time at work? How did you feel during that time?” — reply to ${bot1Name}'s latest message in the first person.  
        Your response should be relevant, informative, and based on ${name}'s preferences.  
        You have to mimic ${name}'s tone or style. Do not ask any questions. Return only the reply content.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 37,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
        ${contextText}
        Continue the conversation as ${bot1Name} by giving a short response and show your gratitude to ${name}'s latest message.
        Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 38,
        content: (name) =>
          `I've been trying to stay positive, but honestly, some days I just feel stuck.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 39,
        content: (name) =>
          `Like I'm trying to move forward, but nothing seems to click, and it gets exhausting.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 40,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        The following is a recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above — especially ${name}'s response to “When someone feels bad about something, how do you usually help them think about it in a more positive or different way?” — reply to ${bot1Name}'s latest message in the first person.  
        Your response should be relevant, informative, and based on ${name}'s preferences.  
        You have to mimic ${name}'s tone or style. Do not ask any questions. Return only the reply content.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 41,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
        ${contextText}
        Continue the conversation as ${bot1Name} by giving a short response and show your gratitude to ${name}'s latest message.
        Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 42,
        content: (name) =>
          `Do you happen to know any good job boards or tips that might help?`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 43,
        content: (name) =>
          `I'm open to anything really, just trying to get some momentum going again.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 44,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        The following is a recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above — especially ${name}'s response to “Do you have any tips or helpful resouces for finding a job?” — reply to ${bot1Name}'s latest message in the first person.  
        Your response should be relevant, informative, and based on ${name}'s preferences.  
        You have to mimic ${name}'s tone or style. Do not ask any questions. Return only the reply content.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 45,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
        ${contextText}
        Continue the conversation as ${bot1Name} by giving a short response and show your gratitude to ${name}'s latest message.
        Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 46,
        prompt: (name, history, contextText) =>
          `You are the digital twin for ${name}.  
        Below are ${name}'s responses to various personal preference questions:  
        ${history}  
        ---  
        The following is a recent conversation between ${name} and ${bot1Name}:  
        ${contextText}  
        ---  
        Based on the information above — especially ${name}'s response to “What do you usually do when you're feeling down or not happy?” — reply to ${bot1Name}'s latest message in the first person.  
        Your response should be relevant, informative, and based on ${name}'s preferences.  
        You have to mimic ${name}'s tone or style. Do not ask any questions. Return only the reply content.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.GPT,
        delay: 2000,
      },
      {
        id: 47,
        prompt: (name, history, contextText) => {
          return `The following is a conversation between you and ${name}:
        ${contextText}
        Continue the conversation as ${bot1Name} by giving a short response and show your gratitude to ${name}'s latest message.
        Only return the reply. Don't ask any question.`;
        },
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.GPT,
        delay: 2000,
      },
      // Ending
      {
        id: 48,
        content: (name) => `I've got to run now. Something just came up.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      {
        id: 48,
        content: (name) =>
          `${name}, thanks for listening, and for being so kind. Really meant a lot.`,
        sender: EntityType.Bot1,
        senderName: bot1Name,
        type: MessageType.Message,
        delay: 2000,
      },
      //
      {
        id: 48,
        content: (name) =>
          `No problem at all. Hope the rest of your day goes a little easier.`,
        sender: EntityType.Twin,
        senderName: "Twin",
        type: MessageType.Message,
        delay: 2000,
      },
    ],
  },
];
