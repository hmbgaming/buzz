function reddit_search(bot, reddit_client, sub_reddit, display_name, discord, conf) {
  var watch = reddit_client.watcher.getPostWatcher(sub_reddit).
  watch.on('post', function(post) {
      let embed = new discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle(display_name)
        .setDescription(post.data.title)
        .setFooter(display_name)
        .setTimestamp()
        .setURL(post.data.url);
      bot.channels.find('name', conf['game-deal-channel']).send({embed});
    });
}

module.exports = {
  handler: (bot, reddit, discord, conf) => {
    let reddit_client = new reddit({
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
      app_id: process.env.REDDIT_ID,
      api_secret: process.env.REDDIT_SECRET,

      automatic_retries: true,
      api_requests_per_minuite: 10
    });
    reddit_search(bot, reddit_client, 'popular', 'Game Trailers', discord, conf);
    //reddit_search(bot, reddit_client, 'GameDeals', 'Game Deals', discord, conf);
  }
}
