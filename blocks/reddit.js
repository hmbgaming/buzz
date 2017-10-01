function reddit_search(bot, reddit_client, sub_reddit, display_name, discord, channel, color) {
  reddit_client.watcher.getPostWatcher('popular')
    .on('post', function(post) {
      console.log(post);
      process.exit();
      /*
      let embed = new discord.RichEmbed()
        .setColor(color)
        .setTitle(display_name)
        .setDescription(post.data.title)
        .setFooter(display_name)
        .setTimestamp()
        .setURL(post.data.url);
      if (post.kind === 't3') {
        bot.channels.find('name', channel).send({embed}); return
      }
      */
    })
    .on('error', console.error)
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
    reddit_search(bot, reddit_client, 'gametrailers', 'Game Trailers', discord, conf['game-trailer-channel'], '#0086AE');
    reddit_search(bot, reddit_client, 'GameDeals', 'Game Deals', discord, conf['game-deal-channel'], '#AE8600');
  }
}
