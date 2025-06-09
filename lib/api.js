import axios from "axios";
import { getAccessToken } from "./auth.js";
import { cacheGet, cacheSet } from "./cache.js";
import { regionHost } from "./utils.js";

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

const DEFAULT_REGION = "eu";

// Fetch WoW item by ID
export async function getItem(itemId, locale = "en_GB", region = "eu") {
  const host = regionHost(region);
  const url = `https://${host}/data/wow/item/${itemId}?namespace=static-${region}&locale=${locale}`;
  return fetchFromAPI(url);
}

export async function getCharacterProfile(
  region,
  realm,
  character,
  locale = "en_GB"
) {
  const host = regionHost(region);
  const url = `https://${host}/profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}?namespace=profile-${region}&locale=${locale}`;
  return fetchFromAPI(url);
}

export async function getCharacterMedia(
  region,
  realm,
  character,
  locale = "en_GB"
) {
  const url = `https://${regionHost(
    region
  )}/profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}/character-media?namespace=profile-${region}&locale=${locale}`;
  try {
    return fetchFromAPI(url);
  } catch (error) {
    if (region !== DEFAULT_REGION) {
      const fallbackUrl = `https://${regionHost(
        DEFAULT_REGION
      )}/profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}/character-media?namespace=profile-${DEFAULT_REGION}&locale=${locale}`;
      return await fetchFromAPI(fallbackUrl);
    }
    throw error;
  }
}

export async function getItemMedia(region, id, locale = "en_GB") {
  const url = `https://${regionHost(
    region
  )}/data/wow/media/item/${id}?namespace=static-${region}&locale=${locale}`;
  try {
    return await fetchFromAPI(url);
  } catch (error) {
    if (region !== DEFAULT_REGION) {
      const fallbackUrl = `https://${regionHost(
        DEFAULT_REGION
      )}/data/wow/media/item/${id}?namespace=static-${DEFAULT_REGION}&locale=${locale}`;
      return await fetchFromAPI(fallbackUrl);
    }
    throw error;
  }
}
