import fetch from "node-fetch";

async function main(): Promise<void> {
  console.log("scraper starting");

  const getReddit = async () => {
    const response = await fetch("https://reddit.com/");
    const body = await response.text();
    console.log(body); // prints a chock full of HTML richness
    return body;
  };
}

main();
