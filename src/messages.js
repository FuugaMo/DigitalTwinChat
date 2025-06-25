import MessageType from "./enums/MessageTypes";
import EntityType from "./enums/EntityTypes";
import {
  bot1Name,
  bot2Name,
  bot3Name,
  bot4Name,
  bot5Name,
} from "./constants/botNames";

import { infoCollection } from "./infoCollection";
import { infoCollectionWithout } from "./infoCollectionWithout";
import { message5BotGroups } from "./messages5bots";

export const messageGroupsAllBots = [
  infoCollection,
  infoCollectionWithout,
  message5BotGroups,
];
