import axios from "axios";
import { YOUTUBE_KEY } from "./key";

export const getChannelInfo = async (id: string): Promise<any> => {
  const url = `https://www.googleapis.com/youtube/v3/channels?id=${id}&part=id,snippet,statistics&key=${YOUTUBE_KEY}`;
  const response = await axios(url);
  return response.data;
};
