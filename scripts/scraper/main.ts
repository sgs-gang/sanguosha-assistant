import axios from "axios";
import * as cheerio from "cheerio";

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

function parseCharacterAbilities(text: string) {
  let ability;
  const abilityRegex =
    /Character ability (\d+):(?: \[Ruler Ability\])? "([^"]+)"\s*([\s\S]+?)(?=Character ability \d+:|$)/g;
  let match;

  if ((match = abilityRegex.exec(text)) !== null) {
    const [_, id, name, description] = match;
    ability = { name, description: description.trim(), ruler: false };
    if (text.includes("Ruler Ability")) {
      ability.ruler = true;
    }
  } else {
    throw new Error(`did not match: ${text}`);
    console.log(text);
  }

  return ability;
}

async function addCharacter(url: string, faction: string): Promise<void> {
  const characterData = await performScraping(url);
  const $ = cheerio.load(characterData.data);
  const name = $("h2.post-title").text().replace(/\n+/g, "").trim();

  const imageUrl = $("div.post-body img").first().attr("src");
  let abilities: { name: string; description: string }[] = [];
  $('b:contains("Character ability")')
    .parent()
    .each((i, el) => {
      abilities.push(parseCharacterAbilities($(el).text()));
    });

  // Extract description
  const description = $("div.post-body")
    .children("b")
    .text()
    .replace(/^Translated description:"/, "");
  console.log(description);

  // Create the character object
  const character = {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    faction,
    imageUrl,
    abilities,
    description,
  };

  console.log(character);
}

async function main(): Promise<void> {
  console.log("scraper starting");

  const allCharactersPage = await performScraping(
    "https://sanguoshaenglish.blogspot.com/p/all-characters.html"
  );
  const characterURLs = getCharacterUrls(allCharactersPage.data);

  console.log(characterURLs.shu);

  for (const url of characterURLs.shu) {
    await addCharacter(url, "shu");
  }
  for (const url of characterURLs.wei) {
    await addCharacter(url, "wei");
  }

  for (const url of characterURLs.wu) {
    await addCharacter(url, "wu");
  }

  for (const url of characterURLs.heroes) {
    await addCharacter(url, "heroes");
  }

  for (const url of characterURLs.demiGods) {
    await addCharacter(url, "demi-gods");
  }
}

main();
