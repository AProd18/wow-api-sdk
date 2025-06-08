import { getItem, getCharacterProfile } from "./index.js";

const run = async () => {
  const item = await getItem(19019);
  console.log("Item:", item.name);

  const character = await getCharacterProfile("eu", "Sylvanas", "Scartx");
  console.log("Character:", character.name);
};

run();
