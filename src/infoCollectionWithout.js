import MessageType from "./enums/MessageTypes";
import EntityType from "./enums/EntityTypes";

// Info Collection Script (Group WITHOUT)
export const infoCollectionWithout = [
  {
    step: 0,
    messages: [
      {
        id: 0,
        content: (name) =>
          `(WITHOUT GROUP - TESTING). Hello, ${name}! Welcome. It’s so nice to have you here. Please allow me to ask you a few questions to collect some basic information about you. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 4.0,
      },
      {
        id: 52,
        content: (name) =>
          `This experiment takes about 12 minutes. Try to complete it in one go—leaving for too long or refreshing the page could affect the data. Unless you really have to, avoid stepping away in the middle. When you're ready, just type "I am ready."`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 4.0,
      },
    ],
  },
  {
    step: 1,
    messages: [
      {
        id: 1,
        content: (name) =>
          `How long have you been using CloudResearch and about how many studies have you done on CloudResearch?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 2,
    messages: [
      {
        id: 30,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 2,
        content: (name) =>
          `What kinds of tasks on CloudResearch do you like? Please provide some examples.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 3,
    messages: [
      {
        id: 31,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 3,
        content: (name) =>
          `Are there any tasks you don’t like on CloudResearch? Please provide some examples.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 4,
    messages: [
      {
        id: 32,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 4,
        content: (name) =>
          `What city do you live in? What do you think about it?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 5,
    messages: [
      {
        id: 33,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 5,
        content: (name) =>
          `What are your favorite TV shows or movies? Why do you like them?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 6,
    messages: [
      {
        id: 34,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 6,
        content: (name) =>
          `Do you have any favorite actors or actresses? Why do you like them?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 7,
    messages: [
      {
        id: 35,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 7,
        content: (name) => `What’s your favorite food, and why do you like it?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 8,
    messages: [
      {
        id: 36,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 8,
        content: (name) =>
          `What kind of music do you like? Why do you like it?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 9,
    messages: [
      {
        id: 37,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 9,
        content: (name) =>
          `Do you have any favorite singers or bands? Why are they your favorite?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 10,
    messages: [
      {
        id: 38,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 10,
        content: (name) => `What are your hobbies?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 11,
    messages: [
      {
        id: 39,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 11,
        content: (name) =>
          `What do you usually do when you’re feeling down or not happy?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 12,
    messages: [
      {
        id: 40,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 12,
        content: (name) =>
          `Can you describe a time in your life that was especially positive or meaningful? What happened, when and where did it happen, who was there, and how did you feel?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 13,
    messages: [
      {
        id: 41,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 13,
        content: (name) =>
          `Have you ever experienced a major challenge in a relationship with someone? What happened?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 14,
    messages: [
      {
        id: 47,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 19,
        content: (name) =>
          `What is something you’ve always wanted to do but haven’t yet? Why?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 15,
    messages: [
      {
        id: 48,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 20,
        content: (name) => `What does success mean to you?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 16,
    messages: [
      {
        id: 49,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 21,
        content: (name) =>
          `What value or principle is most important to you in life?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 17,
    messages: [
      {
        id: 50,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 22,
        content: (name) =>
          `Has your most important value changed over time? If so, how and why?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 18,
    messages: [
      {
        id: 51,
        prompt: (name) =>
          `Give a reply of around 20 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 23,
        content: (name) =>
          `Great, that wraps up all the questions I have for now. Thank you so much for your time and participation, ${name}. We really appreciate your input, and we’ll be inviting you back soon to take part in the second part of our experiment. Have a wonderful day!`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
];
