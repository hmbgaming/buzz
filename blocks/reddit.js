function watcher(bot, discord, conf, feed, feed_name, color) {
  let RssFeedEmitter = require('rss-feed-emitter');
  let feeder = new RssFeedEmitter();

  feeder.add({url: feed, refresh: 2000 });
  feeder.on('new-item', function(item) {
    let embed = new discord.RichEmbed()
      .setColor(color)
      .setTitle(feed_name)
      .setDescription(item.title)
      .setFooter(feed_name)
      .setTimestamp()
      .setURL(item.link);
    bot.channels.find('name', conf['game-deal-channel']).send({embed});
});
}

module.exports = {
  handler: (bot, discord, conf) => {
    watcher(bot, discord, conf, 'https://www.reddit.com/r/gametrailers/new.rss', 'Game Trailers', '#AE0086');
    watcher(bot, discord, conf, 'https://www.reddit.com/r/GameDeals/new.rss', 'Game Deals', '#00AE86');
  }
}
