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

// Info Collection Script (standard)
export const infoCollection = [
  {
    step: 0,
    messages: [
      {
        id: 0,
        content: (name) =>
          `Hello, ${name}! It’s so nice to have you here. In what follows, I’ll ask you some questions to collect some basic info about you.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 4.0,
      },
      {
        id: 0,
        content: (name) =>
          `Before we start, just a couple of things to keep in mind. `,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 4.0,
      },
      {
        id: 0,
        content: (name) =>
          `First, try to answer each question with as much detail as you can. It’ll help us build a better AI agent for you.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 4.0,
      },
      {
        id: 0,
        content: (name) =>
          `Second, try to complete everything in one go. Leaving the page for too long or refreshing it might mess with the data.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 4.0,
      },
      {
        id: 52,
        content: (name) =>
          `Make sure you’re good with the two points above. When you’re ready, just type “I'm ready”`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Great! The first question is: How long have you been using CloudResearch and about how many studies have you done on CloudResearch?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 2,
        content: (name) =>
          `What kinds of tasks on CloudResearch do you like? Please provide some examples.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 3,
        content: (name) =>
          `Are there any tasks you don’t like on CloudResearch? Please provide some examples.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 4,
        content: (name) =>
          `What are your favorite TV shows or movies? Why do you like them?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 5,
        content: (name) =>
          `Do you have any favorite actors or actresses? What do you like about them?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 6,
        content: (name) =>
          `What kind of music do you like? Why do you like it?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 7,
        content: (name) => `Do you have any hobbies?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 8,
        content: (name) => `What is your current or most recent job?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 9,
        content: (name) => `What do you do (or did) in this job?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 10,
        content: (name) => `How did you get into it?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 11,
        content: (name) =>
          `What do you like or find meaningful about this job?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 12,
        content: (name) =>
          `What do you find most challenging or frustrating about this job?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
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
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 13,
        content: (name) =>
          `If someone wanted to enter this field, what advice would you give them?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 14,
    messages: [
      {
        id: 42,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 14,
        content: (name) => `Which city do you currently live in?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 15,
    messages: [
      {
        id: 43,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 15,
        content: (name) => `How long have you lived there?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 16,
    messages: [
      {
        id: 44,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 16,
        content: (name) => `What do you like about living there?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },

  {
    step: 17,
    messages: [
      {
        id: 46,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 18,
        content: (name) =>
          `Is there anything you don’t like about living there?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 18,
    messages: [
      {
        id: 47,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 19,
        content: (name) =>
          `If a friend were visiting your city, what’s one place or activity you would recommend?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 19,
    messages: [
      {
        id: 48,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 20,
        content: (name) =>
          `Do you consider yourself more introverted or extroverted? Why?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 20,
    messages: [
      {
        id: 49,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 21,
        content: (name) =>
          `In social situations, do you tend to lead or follow?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 21,
    messages: [
      {
        id: 50,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 22,
        content: (name) =>
          `How do you usually respond to stressful situations?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 22,
    messages: [
      {
        id: 51,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 52,
        content: (name) =>
          `Are you more of a planner or do you prefer to go with the flow?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 23,
    messages: [
      {
        id: 51,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 52,
        content: (name) =>
          `When making decisions, do you rely more on logic or intuition?`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
  {
    step: 24,
    messages: [
      {
        id: 51,
        prompt: (name) =>
          `Give a reply of around 10 words of user's answer. Don't ask questions.`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.GPT,
        delay: 3,
      },
      {
        id: 23,
        content: (name) =>
          `Great, that’s all the questions I have for now. Thanks so much for your time and participation, ${name}!
        `,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
      {
        id: 24,
        content: (name) =>
          `Please go back to the survey page and enter the following password to continue: YPR11`,
        sender: EntityType.Host,
        senderName: "ConvoAI",
        type: MessageType.Message,
        delay: 3.0,
      },
    ],
  },
];
