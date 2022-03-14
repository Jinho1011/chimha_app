import * as cheerio from "cheerio";
import axios from "axios";
import iconv from "iconv-lite";
import { Buffer } from "buffer";
import { Article, Profile } from "@shared-interfaces/cafe";

const BASE_URL = "https://cafe.naver.com";

interface FetchArticle {
  result: Article[];
  page: number;
}

const getHTML = async (url: string): Promise<string> => {
  const response = await axios.request({
    method: "GET",
    url: url,
    responseType: "arraybuffer",
  });

  let html = response.data;
  let data = Buffer.from(html);
  return iconv.decode(data, "cp949");
};

export const getProfile = async (): Promise<Profile> => {
  const url = BASE_URL + "/CafeProfileView.nhn?clubid=29646865";
  const html = await getHTML(url);
  const $ = cheerio.load(html);
  const res = {
    name: $(".cafe_name").text(),
    thumbnail: $(".mcafe_icon > img").attr("src"),
    members: $(
      "#main-area > div > table > tbody > tr:nth-child(15) > td > span:nth-child(1)",
    ).text(),
  };

  return res;
};

export const getArticles = async (
  menuId: number,
  pageId: number,
): Promise<FetchArticle> => {
  const url = `${BASE_URL}/ArticleList.nhn?search.clubid=29646865&userDisplay=50&search.boardtype=L&search.cafeId=29646865&search.page=${pageId}&search.menuid=${menuId}`;
  const html = await getHTML(url);
  const $ = await cheerio.load(html);
  const trs = $("#main-area > div:nth-child(6) > table > tbody > tr");

  const data = trs
    .map((index, element) => {
      return {
        title: $(".article", element).text().replace(/\s+/g, " ").trim(),
        author: $(".m-tcol-c", element).text(),
        date: $(".td_date", element).text(),
        link: "https://m.cafe.naver.com" + $(".article", element).attr("href"),
      };
    })
    .get();

  return {
    result: data,
    page: pageId,
  };
};
