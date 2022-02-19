import axios from "axios";
import { BASE_URL } from "./api.constant";
import { YOUTUBE_KEY } from "./key";
import * as cheerio from "cheerio";

interface Article {
  author: string;
  date: string;
  title: string;
}

interface CafeProfile {
  members: string;
  name: string;
  thumbnail: string | any;
}

export class CafeAPI {
  constructor() {}

  async getHTML(url: string): Promise<string> {
    const response = await axios(url);
    let html = JSON.stringify(response.data);
    return JSON.parse(html);
  }

  async getProfile(): Promise<CafeProfile> {
    const url = "https://cafe.naver.com/CafeProfileView.nhn?clubid=29646865";
    const html = await this.getHTML(url);
    const $ = cheerio.load(html);

    return {
      name: $(".cafe_name").text(),
      thumbnail: $(".mcafe_icon > img").attr("src"),
      members: $(
        "#main-area > div > table > tbody > tr:nth-child(15) > td > span:nth-child(1)",
      ).text(),
    };
  }

  async getArticles(menuId: number, pageId: number): Promise<Article[]> {
    const url = `https://cafe.naver.com/ArticleList.nhn?search.clubid=29646865&userDisplay=30&search.boardtype=L&search.cafeId=29646865&search.page=${pageId}&search.menuid=${menuId}`;
    const html = await this.getHTML(url);
    const $ = cheerio.load(html);
    const trs = $("#main-area > div:nth-child(6) > table > tbody > tr");
    const res: Article[] = [];

    trs.map((index, element) => {
      res.push({
        title: $(".article", element).text().replace(/\s+/g, " ").trim(),
        author: $(".m-tcol-c", element).text(),
        date: $(".td_date", element).text(),
      });
    });

    return res;
  }
}

interface Channel {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}

interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

interface Statistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

interface Snippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: Localized;
  country: string;
}

interface Localized {
  title: string;
  description: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export class YoutubeAPI {
  constructor() {}

  async getChannelInfo(id: string): Promise<Channel> {
    const url = `https://www.googleapis.com/youtube/v3/channels?id=${id}&part=id,snippet,statistics&key=${YOUTUBE_KEY}`;
    const response = await axios(url);
    const data = await response.data;
    return data;
  }
}

/**
 * ? USAGE:
 *
 * import { fetchExample } from "api"
 *
 * fetchExample()
 * .then((res) => {
 *   // Your Magic is here
 * })
 * .catch((err) => {
 *   // Handle your API error
 *   console.error("Fetch Example Error: ", err);
 * });
 *
 */

// export const fetchExample = () =>
//   new Promise(async (resolve, reject) => {
//     const url = BASE_URL + "your-url";
//     axios
//       .get(url, {
//         headers: API_HEADER,
//       })
//       .then((res) => {
//         res && resolve(res.data);
//       })
//       .catch((error) => {
//         // handle error
//         reject(error);
//         console.log(error);
//       });
//   });
