




# nodkp

> Discord DKP management bot.

##### Run Locally
1. Clone repository
2. `npm install`
3. Configure `conf.json` & create `buzzwords.json`
4. Setup bot permissions & add to server `https://discordapi.com/permissions.html`
5. `node buzz`

##### available buzzBlocks
- Game-Specific Roles
  - [x] *join role.*
  - [x] *quit role.*
  - [x] *create role.*
  - [ ] *delete role.*

###### conf.json
```json
{
  "discord-token": "discord-api-token",
     "admin-role": "admin",

     "game-role": true,
     "game-role-color": "0xFF0000"
}
```
###### buzzwords.json
```json
{

  "rules": [
    "All community members are expected to abide by the follow:",
    "1. Treat others with respect. Banter is fun, bullying is not. Make sure all parties are on the same page when it comes to communicating. This includes both text and voice chats.",
    "2. Do not spam any channel with nonsense.",
    "3. No advertising. If you have an event, or something you would like to promote, please talk to a member of leadership to get permission.",
    "4. Leave all hate, racism, derogatory terms, and offensive comments out of our community."
  ],

  "beer": [
    "I love beer so much!"
  ]

}

```
