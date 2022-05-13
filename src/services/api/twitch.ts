import { TWITCH_ID, TWITCH_TOKEN } from "./key";
import { IsLive, Channel, Followers, Stream } from "@shared-interfaces/twitch";
import { useQuery, UseQueryResult } from "react-query";

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${TWITCH_TOKEN}`);
myHeaders.append("Client-Id", TWITCH_ID);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const twitchApi = {
  isLive: (): Promise<IsLive> => {
    return fetch(
      "https://api.twitch.tv/helix/search/channels?query=침착맨",
      requestOptions,
    ).then((res) => res.json());
  },
  channel: (id: string): Promise<Channel> => {
    return fetch(
      `https://api.twitch.tv/helix/users?id=${id}`,
      requestOptions,
    ).then((res) => res.json());
  },
  followers: (id: string): Promise<Followers> => {
    return fetch(
      `https://api.twitch.tv/helix/users/follows?to_id=${id}`,
      requestOptions,
    ).then((res) => res.json());
  },
  stream: (id: string): Promise<Stream> => {
    return fetch(
      `https://api.twitch.tv/helix/streams?user_id=${id}`,
      requestOptions,
    ).then((res) => res.json());
  },
};

export const useTwitchApi = {
  useIsLiveQuery: (): UseQueryResult<IsLive> =>
    useQuery("isLive", twitchApi.isLive),
  useChannelQuery: (id: string): UseQueryResult<Channel> =>
    useQuery("channel", () => twitchApi.channel(id)),
  useFollowersQuery: (id: string): UseQueryResult<Followers> =>
    useQuery("followers", () => twitchApi.followers(id)),
  useStreamQuery: (id: string): UseQueryResult<Stream> =>
    useQuery("stream", () => twitchApi.stream(id)),
};
