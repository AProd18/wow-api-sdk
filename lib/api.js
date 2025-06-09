import axios from "axios";
import { getAccessToken } from "./auth.js";
import { cacheGet, cacheSet } from "./cache.js";
import { regionHost } from "./utils.js";

const DEFAULT_REGION = "eu";

async function fetchFromAPI(url) {
  const cached = cacheGet(url);
  if (cached) return cached;

  const token = await getAccessToken();

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    cacheSet(url, response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      let msg = `API error: ${status} - ${data?.detail || "No details"}`;
      if (status === 401) msg = "Unauthorized: Invalid or expired token.";
      else if (status === 404) msg = "Not Found: Resource does not exist.";
      throw new Error(msg);
    } else if (error.request) {
      throw new Error("No response received from API server.");
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
}

// Fetch WoW item by ID
export async function getItem(
  itemId,
  locale = "en_GB",
  region = DEFAULT_REGION
) {
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
    return await fetchFromAPI(url);
  } catch (error) {
    if (region !== DEFAULT_REGION) {
      console.warn(
        `Character media fetch failed for region "${region}", trying fallback region "${DEFAULT_REGION}". Error: ${error.message}`
      );

      const fallbackUrl = `https://${regionHost(
        DEFAULT_REGION
      )}/profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}/character-media?namespace=profile-${DEFAULT_REGION}&locale=${locale}`;
      try {
        return await fetchFromAPI(fallbackUrl);
      } catch (fallbackError) {
        throw new Error(`Fallback failed: ${fallbackError.message}`);
      }
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
      console.warn(
        `Item media fetch failed for region "${region}", trying fallback region "${DEFAULT_REGION}". Error: ${error.message}`
      );

      const fallbackUrl = `https://${regionHost(
        DEFAULT_REGION
      )}/data/wow/media/item/${id}?namespace=static-${DEFAULT_REGION}&locale=${locale}`;
      try {
        return await fetchFromAPI(fallbackUrl);
      } catch (fallbackError) {
        throw new Error(`Fallback failed: ${fallbackError.message}`);
      }
    }
    throw error;
  }
}
