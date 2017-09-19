function reddit_search(bot, reddit_client, sub_reddit, discord, conf) {
  reddit_client.watcher.getPostWatcher(sub_reddit).on('post', function(post) {
      let embed = new discord.RichEmbed()
        .setColor(0x00AE86)
        .setDescription(post.data.title)
        .setURL(post.data.url)
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
    reddit_search(bot, reddit_client, 'popular', discord, conf);
    reddit_search(bot, reddit_client, 'GameDeals', discord, conf);
  }
}
