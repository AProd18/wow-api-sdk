import { getItem, getCharacterProfile } from "./index.js";
import {
  getCharacterMedia,
  getItemMedia,
  getCharacterSpecializations,
  getCharacterEquipment,
  getCharacterAchievements,
  getCharacterMounts,
  getCharacterTitles,
} from "./lib/api.js";

const run = async () => {
  const item = await getItem(19019, "en_GB", "eu");
  console.log("Item:", item.name);

  const character = await getCharacterProfile("eu", "Sylvanas", "Scartx");
  console.log("Character:", character.name);

  const itemMedia = await getItemMedia("eu", 19019); // Thunderfury
  console.log("Item Media URL:", itemMedia.assets?.[0]?.value);

  const characterMedia = await getCharacterMedia("eu", "Sylvanas", "Scartx");
  console.log("Character Media URL:", characterMedia.assets?.[0]?.value);

  const specializations = await getCharacterSpecializations(
    "eu",
    "Sylvanas",
    "Scartx"
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

  const equipment = await getCharacterEquipment("eu", "Sylvanas", "Scartx");

  if (equipment && equipment.equipped_items) {
    console.log("Equipped items:");
    equipment.equipped_items.forEach((item) => {
      console.log(`- ${item.slot.type}: ${item.name}`);
    });
  } else {
    console.log("No equipment found.");
  }

  const achievements = await getCharacterAchievements(
    "eu",
    "Sylvanas",
    "Scartx"
  );

  if (achievements && achievements.achievements?.length) {
    console.log(
      "First Achievement:",
      achievements.achievements[0].achievement.name
    );
  } else {
    console.log("No achievements found.");
  }

  const mounts = await getCharacterMounts("eu", "Sylvanas", "Scartx");

  if (mounts?.mounts?.length) {
    console.log("First Mount:", mounts.mounts[0]?.mount?.name);
  } else {
    console.log("No mounts found.");
  }
  const titles = await getCharacterTitles("eu", "Sylvanas", "Scartx");

  if (titles?.titles?.length) {
    console.log("First Title:", titles.titles[0]?.name);
  } else {
    console.log("No titles found.");
  }
};

run();
