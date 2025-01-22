import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from 'node:fs';

async function performScraping(url: string) {
  try {
    const axiosResponse = await axios.request({
      method: "GET",
      url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });
    return axiosResponse;
  } catch (error) {
    throw new Error(`Error fetching URL: ${url}, ${error}`);
  }
}

function getCharacterUrls(data: string) {
  const characterLinks: Record<string, string[]> = {
    shu: [],
    wei: [],
    wu: [],
    heroes: [],
    demiGods: [],
  };
  const $ = cheerio.load(data);
  const shu = $("div.separator")
    .eq(0)
    .children(
      `a[imageanchor="1"][href*="http://sanguoshaenglish.blogspot.com/"]`
    )
    .each((_i, element) => {
      const href = $(element)
        .attr("href")
        ?.replace(/^http:\/\//, "https://");
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



async function addCharacter(url: string, faction: string): Promise<{ id: string; name: string; faction: string; imageUrl: string | undefined; text: string; }> {
  const characterData = await performScraping(url);
  const $ = cheerio.load(characterData.data);
  const name = $("h2.post-title").text().replace(/\n+/g, "").trim();

  const imageUrl = $("div.post-body img").first().attr("src");

  const text = $("div.post-body")
    .text()

  const character = {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    faction,
    imageUrl,
    text
  };

  return character
}

async function main(): Promise<void> {
  console.log("scraper starting");

  const allCharactersPage = await performScraping(
    "https://sanguoshaenglish.blogspot.com/p/all-characters.html"
  );
  const characterURLs = getCharacterUrls(allCharactersPage.data);


  let shuCharacters: any[] = []
  for (const url of characterURLs.shu) {
    const character = await addCharacter(url, "shu");
    shuCharacters.push(character)

  }
  fs.writeFile('data/scraped/shu.json', JSON.stringify(shuCharacters), function (err) {
    if (err) throw err;
    console.log('Shu Saved!');
  });

  let weiCharacters: any[] = []
  for (const url of characterURLs.wei) {
    const character = await addCharacter(url, "wei");
    weiCharacters.push(character)

  }
  fs.writeFile('data/scraped/wei.json', JSON.stringify(weiCharacters), function (err) {
    if (err) throw err;
    console.log('Wei Saved!');
  });

  let wuCharacters: any[] = []
  for (const url of characterURLs.wu) {
    const character = await addCharacter(url, "wu");
    wuCharacters.push(character)

  }
  fs.writeFile('data/scraped/wu.json', JSON.stringify(wuCharacters), function (err) {
    if (err) throw err;
    console.log('Wu Saved!');
  });

  let heroCharacters: any[] = []
  for (const url of characterURLs.heroes) {
    const character = await addCharacter(url, "heroes");
    heroCharacters.push(character)
  }
  fs.writeFile('data/scraped/heroes.json', JSON.stringify(heroCharacters), function (err) {
    if (err) throw err;
    console.log('Heroes Saved!');
  });

  let demiGodCharacters: any[] = []
  for (const url of characterURLs.demiGods) {
   const character = await addCharacter(url, "demi-gods");
   demiGodCharacters.push(character)

  }
  fs.writeFile('data/scraped/demi-gods.json', JSON.stringify(demiGodCharacters), function (err) {
    if (err) throw err;
    console.log('DemiGods Saved!');
  });
}

main();
