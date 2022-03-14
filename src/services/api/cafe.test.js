import { getProfile, getArticles } from "./cafe";

test("getProfile", async () => {
  const res = await getProfile();
  console.log(res);
  expect(res.thumbnail).toBe(
    "https://cafeptthumb-phinf.pstatic.net/MjAxOTAxMTdfMjQy/MDAxNTQ3NzMyMjk1MjMy.MBn3xxA39jK8yySSiMC4W2zz9hFw22JNbqTZoCQOO9Eg.tYzE5UxNfviaushMTC_kXiLlQOkuvNdOhVF6V4VV23gg.JPEG.zilioner/externalFile.jpg?type=f72_72_mask",
  );
});

test("getArticles", async () => {
  const res = await getArticles(1, 1);
  console.log(res[0]);
  expect(typeof res).toBe("object");
});
