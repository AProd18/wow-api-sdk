import { getItem, getCharacterProfile } from "./index.js";
import {
  getCharacterMedia,
  getItemMedia,
  getCharacterSpecializations,
} from "./lib/api.js";

const run = async () => {
  const item = await getItem(19019, "en_GB", "eu");
  console.log("Item:", item.name);

  const character = await getCharacterProfile("eu", "Kazzak", "Qtxoxo");
  console.log("Character:", character.name);

  const itemMedia = await getItemMedia("eu", 19019); // Thunderfury
  console.log("Item Media URL:", itemMedia.assets?.[0]?.value);

  const characterMedia = await getCharacterMedia("eu", "Kazzak", "Qtxoxo");
  console.log("Character Media URL:", characterMedia.assets?.[0]?.value);

  const specializations = await getCharacterSpecializations(
    "eu",
    "Kazzak",
    "Qtxoxo"
  );
  // console.dir(specializations, { depth: null });

  if (specializations?.active_specialization?.name) {
    console.log(
      "Active Specialization:",
      specializations.active_specialization.name
    );
  } else {
    console.log("Active Specialization: No active spec");
  }
};

run();
