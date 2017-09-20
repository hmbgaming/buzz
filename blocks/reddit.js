function watcher(bot, conf) {
  let embed = new discord.RichEmbed()
    .setColor(0x00AE86)
    .setTitle('')
    .setDescription('')
    .setFooter('')
    .setTimestamp()
    .setURL('');
  bot.channels.find('name', conf['game-deal-channel']).send({embed});
}




module.exports = {
  watcher: (bot, discord, conf) => {
    let RssFeedEmitter = require('rss-feed-emitter');
    let feeder = new RssFeedEmitter();

    //feeder.add({url: 'https://www.reddit.com/r/GameDeals/new.rss',
      //refresh: 2000 });
    feeder.add({url: 'https://www.reddit.com/r/gametrailers/new.rss',
      refresh: 2000 });

    feeder.on('new-item', function(item) {
      console.log(item.title);
      process.exit();

      let embed = new discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle('')
        .setDescription('')
        .setFooter('')
        .setTimestamp()
        .setURL('');
      bot.channels.find('name', conf['game-deal-channel']).send({embed});
    })
  }






}
