import { getItem, getCharacterProfile } from "./index.js";
import { getCharacterMedia, getItemMedia } from "./lib/api.js";

const run = async () => {
  const item = await getItem(19019, "en_GB", "eu");
  console.log("Item:", item.name);

  const character = await getCharacterProfile("eu", "Sylvanas", "Scartx");
  console.log("Character:", character.name);

  const itemMedia = await getItemMedia("eu", 19019); // Thunderfury
  console.log("Item Media URL:", itemMedia.assets?.[0]?.value);

  const characterMedia = await getCharacterMedia("eu", "Sylvanas", "Scartx");
  console.log("Character Media URL:", characterMedia.assets?.[0]?.value);
};

run();
