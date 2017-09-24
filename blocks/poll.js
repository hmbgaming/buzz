
module.exports = {
  create: (conf, bot, discord, message, question) => {
    if (message.channel.type === 'dm') {message.author.send({embed: {color: 3447003, title: 'Server commands must be used in the server.',}}); return}
    //message.delete();
    if (message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}
    let embed = new discord.RichEmbed()
      .setColor('#0086AE')
      .setDescription(question)
      .setFooter('Polls')
      .setTimestamp();
    message.channel.send({embed});

    let up  = bot.emojis.find('name', 'thumbsup');

    console.log(bot)//.react(up.id);
    //bot.user.lastMessage.react(':thumbsdown:');
    //bot.user.lastMessage.pin();
  }
}
