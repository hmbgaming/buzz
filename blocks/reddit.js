function reddit_search(bot, reddit_client, sub_reddit, channel) {
  reddit_client.watcher.getPostWatcher(sub_reddit)
    .on('post', function(post) {
      let message = `**${post.data.title}**\n*link: ${post.data.url}*`
      if (post.kind === 't3') {
        bot.channels.find('name', channel).send(message); return
      }
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
    reddit_search(bot, reddit_client, 'popular', conf['game-trailer-channel']);
    reddit_search(bot, reddit_client, 'GameDeals', conf['game-deal-channel']);
  }
}
