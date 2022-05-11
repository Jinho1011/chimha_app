import React, { useState, useRef, useEffect, useCallback } from "react";
import { getProfile, getArticles } from "./cafe";
import { useQuery, useQueries, useInfiniteQuery } from "react-query";
import { MENU_IDS } from "../../services/api/api.constant";

// test("getProfile", async () => {
//   const res = await getProfile();
//   console.log(res);
//   expect(res.thumbnail).toBe(
//     "https://cafeptthumb-phinf.pstatic.net/MjAxOTAxMTdfMjQy/MDAxNTQ3NzMyMjk1MjMy.MBn3xxA39jK8yySSiMC4W2zz9hFw22JNbqTZoCQOO9Eg.tYzE5UxNfviaushMTC_kXiLlQOkuvNdOhVF6V4VV23gg.JPEG.zilioner/externalFile.jpg?type=f72_72_mask",
//   );
// });

// test("getArticles", async () => {
//   const res = await getArticles(1, 1);
//   console.log(res[0]);
//   expect(typeof res).toBe("object");
// });

const Temp = () => {
  const posts = MENU_IDS.map((menu) => {
    return useInfiniteQuery(
      menu.category,
      ({ pageParam = 1 }) => getArticles(menu.id, pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.page + 1;
        },
      },
    );
  });

  console.log(posts);

  return <></>;
};

test("InfiniteQuery", async () => {
  expect(Temp).toBe(React.Component);
});
