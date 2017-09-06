const conf = require('./config.json');
const Discord = require('discord.js');

const bot = new Discord.Client();
const buzzFile = require('./buzzwords.json');
const Buzzwords = {};

const role = require('./buzzBlocks/group_notification/role.js');
const help = require('./buzzBlocks/help/help.js');

const poll = require('./buzzBlocks/communityPolls/poll.js');

function load_buzzwords() {
  for (var buzzword in buzzFile) {
    var construct_reply = '\n';
    for (var line in buzzFile[buzzword]) {construct_reply += (buzzFile[buzzword][line] + '\n');}
    Buzzwords[buzzword]=construct_reply;
  }}
function check_buzzwords(message) {
  for (var word in Buzzwords) {
    if (message.content.includes(word)) {message.author.send(Buzzwords[word])}
  }}

function uptime(message) {
  message.author.send(((bot.uptime/1000.0)/60).toFixed(2)+" minutes!");
  message.delete()
}

bot.on('ready', () => {
  console.log('buzz-bot-initalized');
  load_buzzwords();
});

bot.on("guildMemberAdd", (member) => {
  member.send(Buzzwords['new-servermember-message'])
});

bot.on("presenceUpdate", (userold, usernew) => {
  if (userold.presence.status === 'offline' && usernew.presence.status === 'online') {
    usernew.send(Buzzwords['motd'])
  }
});

bot.on('message', (message) => {
  if (message.author.bot) {return;}
  if (message.isMentioned(bot.user) || message.channel.type === 'dm') {
    check_buzzwords(message);
    if (message.content.includes('help')){help.display(conf, Buzzwords, message)}

  }

  if (message.content.indexOf('!') === 0) {
    var option = message.content.substring(1).split(' ');

//
    //poll.handler(option);
//

    if (conf['game-role']) {role.handler(conf, message, option)}

    if (message.member.roles.some(r=>[conf['admin-role']].includes(r.name))) { // Admin Commands
      if (option[0] == 'uptime') {uptime(message)}

    message.delete();
  }}
});

bot.login(conf['discord-token']);
