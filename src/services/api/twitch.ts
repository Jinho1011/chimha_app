import { TWITCH_ID, TWITCH_TOKEN } from "./key";
import { IsLive, Channel, Followers, Stream } from "@shared-interfaces/twitch";

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${TWITCH_TOKEN}`);
myHeaders.append("Client-Id", TWITCH_ID);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const getIsLive = (): Promise<IsLive> => {
  return fetch(
    "https://api.twitch.tv/helix/search/channels?query=침착맨",
    requestOptions,
  ).then((res) => res.json());
};

export const getChannelInfo = (id: string): Promise<Channel> => {
  return fetch(
    `https://api.twitch.tv/helix/users?id=${id}`,
    requestOptions,
  ).then((res) => res.json());
};

export const getFollowers = (id: string): Promise<Followers> => {
  return fetch(
    `https://api.twitch.tv/helix/users/follows?to_id=${id}`,
    requestOptions,
  ).then((res) => res.json());
};

export const getStream = (id: string): Promise<Stream> => {
  return fetch(
    `https://api.twitch.tv/helix/streams?user_id=${id}`,
    requestOptions,
  ).then((res) => res.json());
};
