import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let token = null;
let tokenExpiresAt = null;

export async function getAccessToken() {
  if (token && tokenExpiresAt && tokenExpiresAt > Date.now()) {
    return token;
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await axios.post(
    "https://eu.battle.net/oauth/token",
    params,
    {
      auth: {
        username: process.env.BLIZZARD_CLIENT_ID,
        password: process.env.BLIZZARD_CLIENT_SECRET,
      },
    }
  );

  token = response.data.access_token;
  tokenExpiresAt = Date.now() + response.data.expires_in * 1000 - 10000;

  return token;
}
