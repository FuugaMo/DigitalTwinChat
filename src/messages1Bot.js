import MessageType from "./enums/MessageTypes";
import EntityType from "./enums/EntityTypes";
import {
  bot1Name,
  bot2Name,
  bot3Name,
  bot4Name,
  bot5Name,
} from "./constants/botNames";
import Message from "./components/Message";

// 这是信息收集script

export const message1BotGroups = [
  {
    step: 1,
    messages: [
      {
        id: 0,
        content: (name) =>
          `Hello, ${name}! Welcome. It’s so nice to have you here. Please allow me to ask you a few questions to collect some basic information about you.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 4.0,
      },
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
        id: 14,
        content: (name) =>
          `When a friend shares something bad that happened to them, how do you usually give emotional support? You can describe what you say or how you act.`,
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
        id: 15,
        content: (name) =>
          `When someone feels bad about something, how do you usually help them think about it in a more positive or different way?`,
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
        id: 16,
        content: (name) =>
          `Have you ever faced a major challenge at work or while looking for a job? What happened? `,
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
        id: 17,
        content: (name) => `How did you feel during that time?`,
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
        id: 18,
        content: (name) =>
          `Do you have any tips or helpful resources for finding a job or dealing with challenges at work?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 19,
    messages: [
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
    step: 20,
    messages: [
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
    step: 21,
    messages: [
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
    step: 22,
    messages: [
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
    step: 23,
    messages: [
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
