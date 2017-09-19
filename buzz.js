const fs = require('fs');
const discord = require('discord.js');
const api_ai = require('apiai');
const snooper = require('reddit-snooper');

const conf = require('./config.json');
const admin = require('./blocks/admin.js');
const groups = require('./blocks/groups.js');
const rules = require('./blocks/rules.js');
const level = require('./blocks/level.js');
const reddit = require('./blocks/reddit.js');

const discord_api_token = process.env.DISCORD_TOKEN || conf['discord-token'];
const ai = api_ai(process.env.APIAI_TOKEN || conf['api-ai-token']);


const airbrake = require('airbrake').createClient(
  process.env.AIRBRAKE_PROJECT_ID,
  process.env.AIRBRAKE_API_KEY
);
airbrake.handleExceptions();


const bot = new discord.Client();

function handler(message) {
  let request = ai.textRequest(message.content, {sessionId: message.author.username});
  request.on('response', function(response) {
    let discord_response = response['result']['fulfillment']['speech'];

    if (response['result']['actionIncomplete']) {message.author.send(discord_response).catch(function(){});}
    if (response['result']['actionIncomplete'] === false) {
      let intent = response['result']['metadata']['intentName'];


      if (response['result']['action'] === 'group') {groups.handler(conf, message, intent, discord_response, discord); return}
      if (response['result']['action'] === 'rules') {rules.handler(message, discord); return}

      message.author.send(discord_response); return;
    }
  });

  request.on('error', function(error) {console.log(error)});
  request.end();
}


bot.on('ready', () => {
  console.log('buzz-bot-initalized');
  reddit.handler(bot, snooper, discord, conf);
});
bot.on("guildMemberAdd", (member) => {
  console.log('new-server-member');
});
bot.on("presenceUpdate", (userold, usernew) => {
  if (userold.presence.status === 'offline' && usernew.presence.status === 'online') {
    console.log('presence-update');
  }
});
bot.on('message', (message) => {
  if (message.author.bot) {return;}
  if (message.content.startsWith('!')) {
    var option = message.content.split(' ')
    if (option[0] === '!uptime') {admin.uptime(conf, bot, message)}
    if (option[0] === '!sync')   {admin.sync(conf, message)}

    return;
  }

  if (message.isMentioned(bot.user)) {handler(message)}
  level.handler(conf, message);

});
bot.login(discord_api_token);
