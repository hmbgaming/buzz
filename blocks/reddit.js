function reddit_search(bot, reddit_client, sub_reddit, display_name, discord, conf, color) {
  reddit_client.watcher.getPostWatcher(sub_reddit)
    .on('post', function(post) {
      let embed = new discord.RichEmbed()
        .setColor(color)
        .setTitle(display_name)
        .setDescription(post.data.title)
        .setFooter(display_name)
        .setTimestamp()
        .setURL(post.data.url);
      bot.channels.find('name', conf['game-deal-channel']).send({embed});
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
    reddit_search(bot, reddit_client, 'gametrailers', 'Game Trailers', discord, conf, '#0086AE');
    reddit_search(bot, reddit_client, 'GameDeals', 'Game Deals', discord, conf, '#AE8600');
  }
}
