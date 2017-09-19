function reddit_GameDeals(bot, reddit_client, discord, conf) {
  reddit_client.watcher.getPostWatcher('popular').on('post', function(post) {
      let embed = new discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle(post.data.title)
        .setURL(post.data.url)
      bot.channels.find('name', conf['game-deal-channel']).send({embed});
    });
}

function reddit_GameTrailers(bot, reddit_client, discord, conf) {
  reddit_client.watcher.getPostWatcher('videos').on('post', function(post) {
      let embed = new discord.RichEmbed()
        .setColor(0x00AE86)
        .setDescription(post.data.title)
        .setURL(post.data.url)
        .setThumbnail(post.data.thumbnail)
      bot.channels.find('name', conf['game-trailer-channel']).send({embed});
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
    //reddit_GameDeals(bot, reddit_client, discord, conf);
    reddit_GameTrailers(bot, reddit_client, discord, conf);
  }
}
