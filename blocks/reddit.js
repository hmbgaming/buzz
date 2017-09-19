function reddit_GameDeals(bot, sub_reddit, discord, conf) {
  sub_reddit.watcher.getPostWatcher('popular').on('post', function(post) {
      let embed = new discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle(post.data.title)
        .setURL(post.data.url)
        .setTimestamp();
      bot.channels.find('name', conf['game-deal-channel']).send({embed});
    });
}


module.exports = {
  handler: (bot, reddit, discord, conf) => {
    let sub_reddit = new reddit({
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
      app_id: process.env.REDDIT_ID,
      api_secret: process.env.REDDIT_SECRET,

      automatic_retries: true,
      api_requests_per_minuite: 60
    });
    reddit_GameDeals(bot, sub_reddit, discord, conf);
  }
}
