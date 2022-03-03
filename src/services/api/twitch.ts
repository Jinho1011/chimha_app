import axios from "axios";
import { TWITCH_ID, TWITCH_TOKEN } from "./key";

const baseUrl = "https://api.twitch.tv/helix";

const getConfig = (endpoint: string, params: string) => {
  return JSON.stringify({
    method: "get",
    url: `${baseUrl}/${endpoint}?${params}`,
    headers: {
      Authorization: `Bearer ${TWITCH_TOKEN}`,
      "Client-Id": TWITCH_ID,
    },
  });
};

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 3ms9bn5w3dewu4ged99af8a74opy54");
myHeaders.append("Client-Id", "o3gzdrci05o61qilnsetkuerkadplo");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const getIsLive = () => {
  return fetch(
    "https://api.twitch.tv/helix/search/channels?query=침착맨",
    requestOptions,
  ).then((res) => res.json());
};

export const getChannelInfo = (id: string) => {
  return fetch(
    `https://api.twitch.tv/helix/users?id=${id}`,
    requestOptions,
  ).then((res) => res.json());
};

export const getFollowers = () => {
  return fetch(
    "https://api.twitch.tv/helix/users/follows?to_id=66375105",
    requestOptions,
  ).then((res) => res.json());
};
