# WoW API SDK

## Overview

This SDK provides a streamlined interface to interact with the Blizzard World of Warcraft API. It encapsulates API calls with built-in features like caching, dynamic region handling, token management, and robust error handling. Designed to simplify fetching character profiles, item data, and media resources from different Blizzard regions.

## Features

- Dynamic region support via `regionHost()` helper
- Response caching to improve performance and reduce redundant calls
- Centralized OAuth token retrieval with `getAccessToken()`
- Error handling with descriptive custom messages
- Fallback logic for character and item media endpoints to default region (`eu`) if requested region data is unavailable
- Helper functions for fetching:
  - Character profiles (`getCharacterProfile`)
  - Character media (`getCharacterMedia`)
  - Item data (`getItem`)
  - Item media (`getItemMedia`)

## Installation

```bash
npm install wow-api-sdk
```

```jsx
import { getCharacterData } from "wow-api-sdk";

const data = await getCharacterData("characterName", "realm");
console.log(data);
```

```jsx
import {
  getItem,
  getCharacterProfile,
  getCharacterMedia,
  getItemMedia,
} from "./api.js";

// Fetch WoW item data by ID
const item = await getItem(18803, "en_GB", "us");

// Fetch character profile
const profile = await getCharacterProfile("eu", "twisting-nether", "scartx");

// Fetch character media with fallback
const characterMedia = await getCharacterMedia("us", "stormrage", "thrall");

// Fetch item media with fallback
const itemMedia = await getItemMedia("eu", 18803);

// Fetches the character's specializations including the active one (e.g. DPS, Healer, Tank).
const specs = await getCharacterSpecializations("eu", "Sylvanas", "Scartx");
console.log(specs.active_specialization.name); // e.g., "Holy"
```

## Error Handling

All API functions implement try/catch blocks and throw descriptive errors when calls fail. The media fetching functions implement fallback to the default region (eu) if data is not found for the requested region, improving resilience.

## Development

- The SDK uses a centralized fetchFromAPI function that handles caching and token authorization.

- Region hosts are dynamically resolved via regionHost(region) helper.

- OAuth tokens are retrieved from getAccessToken().

- Cache is managed in-memory via cacheGet() and cacheSet().

- Error handling is done consistently with clear messages and fallback logic for media endpoints.
