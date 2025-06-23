# WoW API SDK

A simple and flexible SDK for interacting with the [Blizzard World of Warcraft API](https://develop.battle.net/documentation/world-of-warcraft). It provides streamlined access to character profiles, items, media, gear, specializations, and more—with built-in caching, token management, and error handling.

## Features

- Multi-region support with automatic fallback logic
- In-memory caching to reduce redundant API calls
- Built-in OAuth token management
- Modular API helpers for common use cases
- Robust error handing with meaningful messages

## Installation

```bash
npm install wow-api-sdk
```

## Quick Start

```jsx
import { getCharacterData } from "wow-api-sdk";

const data = await getCharacterData("characterName", "realm");
console.log(data);
```

```jsx
import {
  getCharacterProfile,
  getCharacterMedia,
  getCharacterSpecializations,
  getCharacterEquipment,
  getItem,
  getItemMedia,
} from "wow-api-sdk";

// Fetch character profile
const profile = await getCharacterProfile("eu", "twisting-nether", "scartx");

// Fetches the character's specializations including the active one (e.g. DPS, Healer, Tank).
const specs = await getCharacterSpecializations("eu", "Sylvanas", "Scartx");
console.log(specs.active_specialization.name); // e.g., "Holy"

// Get item data and media
const item = await getItem(18803, "en_GB", "us");
const itemMedia = await getItemMedia("us", 18803);

// Fetch character media with fallback
const characterMedia = await getCharacterMedia("eu", "Sylvanas", "Scartx");

// Returns the list of achievements earned by the character
const achievements = await getCharacterAchievements("eu", "Sylvanas", "Scartx");
console.log(
  "First Achievement:",
  achievements.achievements[0].achievement.name
);

// Returns the list of character titles the player has earned
const titles = await getCharacterTitles("eu", "Sylvanas", "Scartx");
console.log("First Title:", titles.titles[0].name);

// Returns the list of battle pets collected by the character
const pets = await getCharacterPets("eu", "Sylvanas", "Scartx");
console.log("First Pet:", pets.pets[0]?.creature?.name);
```

## Available Methods

| Function                      | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `getCharacterProfile`         | Fetches core character info (level, race, class, etc.) |
| `getCharacterMedia`           | Retrieves character portraits and visuals              |
| `getCharacterSpecializations` | Returns active and inactive specialization data        |
| `getCharacterEquipment`       | Fetches gear currently equipped by the character       |
| `getItem`                     | Retrieves item stats and metadata by ID                |
| `getItemMedia`                | Fetches item icon and visual resources                 |
| `getCharacterAchievements`    | Returns earned achievements for the character          |
| `getCharacterMounts`          | Returns all collected mounts                           |
| `getCharacterTitles`          | Returns character titles earned by the player          |
| `getCharacterPets`            | Returns collected battle pets by the character         |
| `getCharacterPvpSummary`      | Returns the character's PvP statistics and rankings    |

## Error Handling

All API functions implement try/catch blocks and throw descriptive errors when calls fail. The media fetching functions implement fallback to the default region (eu) if data is not found for the requested region, improving resilience.

```jsx
try {
  const media = await getCharacterMedia("us", "sylvanas", "nonexistent");
} catch (err) {
  console.error("Error fetching character media:", err.message);
}
```

## How it Works

- All API calls use `fetchFromAPI()` which:

  - Handles access tokens via `getAccessToken()`
  - Applies in-memory caching with `cacheGet()` / `cacheSet()`
  - Adds proper headers and retry logic

- Region-based URLs are constructed via `regionHost(region)`

- JSON responses are returned directly with no transformation
