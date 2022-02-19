import axios from "axios";
import { BASE_URL } from "./api.constant";
import * as cheerio from "cheerio";

interface Article {
  author: string;
  date: string;
  title: string;
}

class API {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get() {
    const res = await axios.get(this.url);
    return await res.data;
  }
}

export class CafeAPI extends API {
  constructor(menuId: number, pageId: number) {
    const url = `https://cafe.naver.com/ArticleList.nhn?search.clubid=29646865&userDisplay=30&search.boardtype=L&search.cafeId=29646865&search.page=${pageId}&search.menuid=${menuId}`;
    super(url);
  }

  async getArticles(): Promise<Article[]> {
    const response = await axios(this.url);
    let html = JSON.stringify(response.data);
    html = JSON.parse(html);
    const $ = cheerio.load(html);
    const trs = $("#main-area > div:nth-child(6) > table > tbody > tr");
    const res: Article[] = [];

    // $(element).text().replace(/\s+/g, " ").trim()
    trs.map((index, element) => {
      res.push({
        title: $(".article", element).text().replace(/\s+/g, " ").trim(),
        // thumb: $(".movie-img  img", element).attr("src"),
        author: $(".m-tcol-c", element).text(),
        date: $(".td_date", element).text(),
      });
    });

    return res;
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
