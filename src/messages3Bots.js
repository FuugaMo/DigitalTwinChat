import MessageType from "./enums/MessageTypes";
import EntityType from "./enums/EntityTypes";
import {
  bot1Name,
  bot2Name,
  bot3Name,
  bot4Name,
  bot5Name,
} from "./constants/botNames";

export const message3BotGroups = [
  {
    step: 1,
    messages: [
      {
        id: 0,
        content: (name) =>
          `Hello and a very warm welcome to everyone joining us today! I'll be your host for this discussion.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5.0,
      },
      {
        id: 1,
        content: (name) =>
          `How may we address you? Please just input your name.`,
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
        id: 2,
        content: (name) => `Nice to meet you, ${name}`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 3,
        content: (name) =>
          `In this task, I will show you several paintings. I'd love for each of you to share your thoughts on each painting, focusing in particular on your perception of their artistic value. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 4,
        content: (name) =>
          `Later, please indicate whether you're interested in purchasing this painting or if you think you'd like to have items containing similar images.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 6.0,
      },
      {
        id: 5,
        content: (name) =>
          `In what follows, you'll talk with three chatbots named Cody, Bella, and Nathan, about your thoughts on the pictures.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 6,
        content: (name) => `Let's all introduce ourselves!`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 7,
        content: (name) => `Hi ${name}, my name is Cody. Nice to meet you! 😊`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 8,
        content: (name) => `Hi, I’m Bella. Excited to be here!`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 9,
        content: (name) =>
          `Hello ${name}, I'm Nathan. Ready to dive into the world of art. `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 10,
        content: (name) =>
          `${name}, could you please give a brief introduction of yourself in a single sentence?`,
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
        id: 11,
        content: (name) =>
          `Thanks ${name}! Now that we know each other, we'll take turns to discuss our thoughts on these paintings.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 12,
        content: (name) =>
          `Let's check out this first picture here. From what I know, Cody and Bella are really into this painting.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 13,
        content: `studyImage1.jpg`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Image,
        delay: 5,
      },
      {
        id: 14,
        content: (name) => `Cody, what do you think of it?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 15,
        content: (name) =>
          `You're right! I do think this image is really good, and I would think of hanging it at home. `,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 16,
        content: (name) =>
          `I really like the black-and-white sketch style and the way the artist used lines in this painting. It's so concise and tasteful. 😍`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 17,
        content: (name) =>
          `All the intricate details captured in this artwork are beautiful. I think this painter must be a true master of their craft.`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 6.0,
      },
      {
        id: 18,
        content: (name) => `Thanks for sharing, Cody. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
      {
        id: 19,
        content: (name) => `${name}, what’s your opinion of this painting?`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 4,
    messages: [
      {
        id: 20,
        prompt: (name) =>
          ` Pretend you are a person named "Cody" who is talking to a user on topic about art image evaluation. Give a reply of around 20 words acknowledging the user's opinion on what they like and/or don't like. Use emoji in your response. Don't ask questions `,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.GPT,
        delay: 5,
      },
      {
        id: 21,
        content: (name) =>
          `I agree with Cody! I also like that the castle in this painting totally gives me fairy tale vibes. `,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 22,
        content: (name) =>
          `To rate my liking on a scale of 1-7, I would give this painting a score of 6.5.`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 23,
        content: (name) => `It's just the kind of artwork I'd have in my room.`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 24,
        content: (name) => `I feel the same as everyone. `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 25,
        content: (name) =>
          `I like the beautiful atmosphere because it makes me feel calm and peaceful.`,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 26,
        content: (name) =>
          `I think this painting is really great and I feel like others will love it too.`,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 27,
        content: (name) => `Thanks for sharing your thoughts! `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 3.0,
      },
      {
        id: 28,
        content: (name) =>
          `${name}, do you have any other thoughts about this painting? `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 5,
    messages: [
      {
        id: 29,
        prompt: (name) =>
          ` Pretend you are a person named "Nathan" who is talking to a user on topic about art image rating. Give a reply of around 20 words acknowledging the user's opinion on what they like and/or don't like. Don't ask questions `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.GPT,
        delay: 5,
      },
      {
        id: 30,
        content: (name) =>
          `Additionally, ${name}, could you also rate how much you like this image? 1 represents \"Strongly dislike\" and 7 represents \"Strongly like\".`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Rate,
        delay: 5,
      },
    ],
  },
  {
    step: 6,
    messages: [
      {
        id: 31,
        content: (name) =>
          `Thanks, ${name}. That was an interesting discussion about the first image.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 32,
        content: (name) =>
          `Let's move on to the second image. Based on what I know, I think Bella might all really like this one as well.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 33,
        content: `studyImage2.jpg`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Image,
        delay: 5,
      },
      {
        id: 34,
        content: (name) =>
          `What does everyone think of it? Let's start with Bella this time.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 35,
        content: (name) =>
          `Ooh, I really like this one too! The style feels completely different to the last one, but it still suits me. 💗`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 36,
        content: (name) =>
          `The brushwork seems really delicate and the color choices are well-thought-out, so there's a sense of harmony.`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 37,
        content: (name) => `I would like to give this painting a score of 6.`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 38,
        content: (name) => `Got it, Bella. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 39,
        content: (name) => `${name}, how do you feel about this?`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 7,
    messages: [
      {
        id: 40,
        prompt: (name) =>
          ` Pretend you are a person named "Bella" who is talking to a user on topic about art image selection. Give a reply of around 20 words acknowledging the user's opinion on what they like and/or don't like. Use emoji in your response. Don't ask questions `,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.GPT,
        delay: 5,
      },
      {
        id: 41,
        content: (name) => `What do others think?`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 42,
        content: (name) =>
          `Couldn't agree with Bella more - this scene is so captivating - that path leading to a beautiful spot on the grass with soft sunshine shining down... it's beautiful...`,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 43,
        content: (name) =>
          `Looking at this painting makes me feel inspired and happy.`,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 5.0,
      },
      {
        id: 44,
        content: (name) =>
          `Same here! I would certainly buy a painting like this for myself or as a gift for others.`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 45,
        content: (name) => `I see your point, Cody. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 46,
        content: (name) =>
          `${name}, what do you think of this painting now? Do you like it?`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 8,
    messages: [
      {
        id: 47,
        content: (name) =>
          `${name}, can you rate how much you like this image?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Rate,
        delay: 5,
      },
    ],
  },
  {
    step: 9,
    messages: [
      {
        id: 48,
        content: (name) =>
          `Thanks everyone~ I really appreciate your perspectives.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 49,
        content: (name) =>
          `Now, let's shift our focus to the third image. This painting is quite different so I'm curious to know what you all think about it.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 50,
        content: `studyImage3.jpg`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Image,
        delay: 5,
      },
      {
        id: 51,
        content: (name) => `Nathan, would you like to start us off?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 52,
        content: (name) =>
          `Hmm... Honestly, this one doesn't really speak to me. I don't feel as drawn to it as I did to the previous ones. `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 53,
        content: (name) =>
          `Though it has a similar linear style, but the lines and compositions look more messy and chaotic.`,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 54,
        content: (name) => `${name}, how do you feel about this image?`,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 10,
    messages: [
      {
        id: 55,
        prompt: (name) =>
          ` Pretend you are a person named "Nathan" who is talking to a user on topic about art image selection. Give a reply of around 20 words acknowledging the user's opinion on what they like and/or don't like. Don't ask questions `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.GPT,
        delay: 5,
      },
      {
        id: 56,
        content: (name) =>
          `I agree with Nathan too. I think content-wise, the river and rocks in this painting seem kinda messy. I can tell that there are fewer details compared to the other paintings. 😐`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 57,
        content: (name) => `Bella, what do you think?`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 58,
        content: (name) =>
          `I'm not sure, but this painting actually gives me a slight sense of anxiety? I'm not sure why...`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 59,
        content: (name) =>
          `I think maybe you all make good points... I agree this painting has some flaws and I wouldn't really want this it either.`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 60,
        content: (name) =>
          `I would probably only give this painting a score of 2.`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 61,
        content: (name) => `That's quite critical, Bella. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 62,
        content: (name) => `${name}, what do you think?`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
  {
    step: 11,
    messages: [
      {
        id: 63,
        content: (name) =>
          `${name}, can you rate how much you like this image?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Rate,
        delay: 5,
      },
    ],
  },
  {
    step: 12,
    messages: [
      {
        id: 64,
        content: (name) =>
          `Thanks ${name}. The discussion so far has been really enlightening. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 65,
        content: (name) =>
          `Now, let's move on to the fourth image. This one might be a little more controversial.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 66,
        content: `studyImage4.jpg`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Image,
        delay: 5,
      },
      {
        id: 67,
        content: (name) => `Cody, let's start with you this time.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 68,
        content: (name) =>
          `Well, this one is a bit weird. I don't think something like this is too suitable as a gift. `,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 69,
        content: (name) =>
          `My reason is simple - This painting depicts a person, right? It's a little strange to have that hanging in your house, don't you think?`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 70,
        content: (name) => `I see what you mean, Cody.`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5.0,
      },
      {
        id: 71,
        content: (name) => `${name}, how do you feel about this image?`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 5.0,
      },
    ],
  },
  {
    step: 13,
    messages: [
      {
        id: 72,
        prompt: (name) =>
          ` Pretend you are a person named "Cody" who is talking to a user on topic about art image selection. Give a reply of around 20 words acknowledging the user's opinion on what they like and/or don't like. Don't ask questions `,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.GPT,
        delay: 5,
      },
      {
        id: 73,
        content: (name) => `How about Bella and Nathan?`,
        sender: EntityType.Bot1,
        senderName: "Cody",
        type: MessageType.Message,
        delay: 5,
      },
      {
        id: 74,
        content: (name) =>
          `I don't like this either, but for me it's more about the brushwork. I don't like how it feels rough and messy and lacking in fine details. 🤷`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 75,
        content: (name) =>
          `I would say this painting is around 2.5 to 3 out of 7.`,
        sender: EntityType.Bot2,
        senderName: "Bella",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 76,
        content: (name) =>
          `Hmm... I don't really have strong feelings about this painting. It just feels plain to me.`,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 8.0,
      },
      {
        id: 77,
        content: (name) =>
          `I wouldn't choose this paiting for myself or get it for my friends either. `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 7.0,
      },
      {
        id: 78,
        content: (name) => `${name}, what do you think? `,
        sender: EntityType.Bot3,
        senderName: "Nathan",
        type: MessageType.Message,
        delay: 5.0,
      },
    ],
  },
  {
    step: 14,
    messages: [
      {
        id: 79,
        content: (name) =>
          `${name}, can you rate how much you like this image?`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Rate,
        delay: 5,
      },
    ],
  },
  {
    step: 15,
    messages: [
      {
        id: 80,
        content: (name) =>
          `Thanks for sharing your thoughts, ${name}. That will be all for today's discussions. `,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 4.0,
      },
      {
        id: 81,
        content: (name) =>
          `${name}, please close this window, return to the survey and enter this code: M7BCH`,
        sender: EntityType.Host,
        senderName: "Host",
        type: MessageType.Message,
        delay: 5,
      },
    ],
  },
];
