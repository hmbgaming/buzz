# Buzz

## Setup
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Upload `intents` & `entities` to api.ai

2. Configure Environment Variables
   * `AIRBRAKE_API_KEY`
   * `AIRBRAKE_PROJECT_ID`
   * `APIAI_TOKEN`
   * `DISCORD_TOKEN`
   * `MONGODB_URI`
   * `REDDIT_ID`
   * `REDDIT_SECRET`
   * `REDDIT_USERNAME`
   * `REDDIT_PASSWORD`

3. Configure `config.json` (if deploying to heroku, add config values to server)
```json
{
  "admin-role": "buzz admin",

  "game-deal-channel": "deals",
  "game-trailer-channel": "trailers",
  
  "group_roles": [
    "World of Warcraft: The Burning Crusade",
    "Guild Wars 2",
    "Hearthstone",
    "League of Legends",
    "Playerunknown's Battlegrounds",
    "Rust",
    "Vainglory",
    "Final Fantasy XIV",
    "Clash Royale",
    "Battle Bay",
    "Minecraft",
    "Starcraft II",
    "Podcast"
  ],

  "level-cap": 30,
  "level-ranks": {
    "Reactions": 5,
    "Mute": 6,
    "Deafen": 7,
    "Nickname": 8,
    "Memes": 9,
    "Deals": 11,
    "Members": 12,
    "Emojis": 13
  }
}
```
---
## Available
- admin
  * `!uptime`  ; return how long bot has been running.
- group notification
  * `join`
  * `leave`
  * `help`
- leveling
- community polling
  * `!poll`    ; create a pinned poll with reactions within a channel.
- game deals
- game trailers
- rules
