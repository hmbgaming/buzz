const conf = require('./config.json');
const Discord = require('discord.js');

const bot = new Discord.Client();
const buzzFile = require('./buzzwords.json');
const Buzzwords = {};

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


bot.on('ready', () => {
  console.log('buzz-bot-initalized');
  load_buzzwords();
});


bot.on('message', (message) => {
  if (message.author.bot) {return;}
  if (message.isMentioned(bot.user) || message.channel.type === 'dm') {
    check_buzzwords(message);

  }

  if (message.content.indexOf('!') === 0) {} // Admin Commands
});


bot.login(conf['discord-token']);
