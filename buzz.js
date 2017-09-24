const fs = require('fs');
const discord = require('discord.js');
const api_ai = require('apiai');
const snooper = require('reddit-snooper');
const moment = require('moment');
const schedule = require('node-schedule');

const conf = require('./config.json');
const admin = require('./blocks/admin.js');
const groups = require('./blocks/groups.js');
const rules = require('./blocks/rules.js');
const level = require('./blocks/level.js');
const reddit = require('./blocks/reddit.js');
//const release = require('./blocks/release.js');
const poll = require('./blocks/poll.js');

const discord_api_token = process.env.DISCORD_TOKEN || conf['discord-token'];
const ai = api_ai(process.env.APIAI_TOKEN || conf['api-ai-token']);

const bot = new discord.Client();


const help_fallback = new discord.RichEmbed()
  .setColor(0x00AE86)
  .setTitle("Welcome to Hold My Beer Discord Server")
  .setThumbnail("https://cdn2.iconfinder.com/data/icons/helmet/512/warrior-soldier-helmet-war-512.png")
  .setTimestamp()
  .setFooter("Buzz")
  .setDescription("*Salutaions! My name is Buzz, I'm here to assist you. Below are several of the services I offer! I also tell great jokes!*")
  .addField('Group Notifications','You can *join* roles to recieve game specific messages no matter what channel they are in! Ask me about it to get started!')
  .addField('Leveling','As you communicate with your peers you will accumulate experience, as you level up you will be rewarded with new roles & privileges')
  .addField('Channel Polls','Make sure to check a channels pinned messages for the current polls going on!');


const airbrake = require('airbrake').createClient(
  process.env.AIRBRAKE_PROJECT_ID,
  process.env.AIRBRAKE_API_KEY
);
airbrake.addFilter(function(notice) {
  notice.context.environment = 'development';
  notice.context.version = '1.0.4';
  return notice;
});
airbrake.handleExceptions();

function handler(message) {
  let request = ai.textRequest(message.content, {sessionId: message.author.username});
  request.on('response', function(response) {
    let discord_response = response['result']['fulfillment']['speech'];

    if (response['result']['actionIncomplete']) {message.author.send(discord_response).catch(function(){});}
    if (response['result']['actionIncomplete'] === false) {
      let intent = response['result']['metadata']['intentName'];


      if (response['result']['action'] === 'group') {groups.handler(conf, message, intent, discord_response, discord); return}
      if (response['result']['action'] === 'rules') {rules.handler(message, discord); return}
      if (response['result']['action'] === 'help-fallback') {
        message.author.send(help_fallback); return}

      message.author.send(discord_response); return;
    }
  });

  request.on('error', function(error) {console.log(error)});
  request.end();
}

var mDB = require('mongodb').MongoClient;
mDB.connect(process.env.MONGODB_URI, (err, database) => {

  bot.on('ready', () => {
    console.log('buzz-bot-initalized');
    reddit.handler(bot, snooper, discord, conf);
  });
  bot.on("guildMemberAdd", (member) => {
    member.send(help_fallback);
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
      if (option[0] === '!uptime')  {admin.uptime(conf, bot, message)}
      if (option[0] === '!sync')    {admin.sync(conf, message)}
      if (option[0] === '!poll')    {poll.create(conf, bot, discord, message, option)}
      //if (option[0] === '!release') {release.add_release_key(database, conf, message, option[1])}

      return;
    }

    if (message.isMentioned(bot.user)) {handler(message)}
    level.handler(conf, message, database);
    //release.handler(bot, discord, schedule, conf, moment, database);

  });
  bot.login(discord_api_token);

});
