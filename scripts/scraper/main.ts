import fetch from "node-fetch";
import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

async function performScraping(url: string) {
  const axiosResponse = await axios.request({
    method: "GET",
    url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  return axiosResponse;
}

// function getCharacterUrls(res: string) {
//   const characterLinks: string[] = [];
//   const $ = cheerio.load(res);
//   const a = $(
//     `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`
//   );
//   a.each((_i, element) => {
//     const href = $(element).attr("href");
//     if (href != null) characterLinks.push(href);
//   });

//   return characterLinks;
// }

function getCharacterUrls(res: string) {
  const characterLinks: Record<string, string[]> = {
    shu: [],
    wei: [],
    wu: [],
    heroes: [],
    demiGods: [],
  };
  let tempLinks: string[] = [];
  const $ = cheerio.load(res);
  const shu = $("div.separator")
    .eq(0)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`
    )
    .each((_i, element) => {
      const href = $(element).attr("href");
      if (href != null) characterLinks.shu.push(href);
    });

  const wei = $("div.separator")
    .eq(1)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`
    )
    .each((_i, element) => {
      const href = $(element).attr("href");
      if (href != null) characterLinks.wei.push(href);
    });

  const wu = $("div.separator")
    .eq(2)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`
    )
    .each((_i, element) => {
      const href = $(element).attr("href");
      if (href != null) characterLinks.wu.push(href);
    });

  const heroes = $("div.separator")
    .eq(3)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`
    )
    .each((_i, element) => {
      const href = $(element).attr("href");
      if (href != null) characterLinks.heroes.push(href);
    });

  const demiGods = $("div.separator")
    .eq(4)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`
    )
    .each((_i, element) => {
      const href = $(element).attr("href");
      if (href != null) characterLinks.demiGods.push(href);
    });

  return characterLinks;
}

async function main(): Promise<void> {
  console.log("scraper starting");

  const res = await performScraping(
    "https://sanguoshaenglish.blogspot.com/p/all-characters.html"
  );
  const characterURLs = getCharacterUrls(res.data);
  console.log(characterURLs);
  //   for (const url of characterURLs) {
  //     const scrape = await performScraping(url);
  //   }
}

main();
