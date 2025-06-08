import axios from "axios";
import { getAccessToken } from "./auth.js";
import { cacheGet, cacheSet } from "./cache.js";

async function fetchFromAPI(url) {
  const cached = cacheGet(url);
  if (cached) return cached;

  const token = await getAccessToken();
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  cacheSet(url, response.data);
  return response.data;
}

export async function getItem(itemId, locale = "en_GB") {
  const url = `https://eu.api.blizzard.com/data/wow/item/${itemId}?namespace=static-eu&locale=${locale}`;
  return fetchFromAPI(url);
}

export async function getCharacterProfile(
  region,
  realm,
  character,
  locale = "en_GB"
) {
  const url = `https://${region}.api.blizzard.com/profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}?namespace=profile-${region}&locale=${locale}`;
  return fetchFromAPI(url);
}
