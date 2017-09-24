
module.exports = {
  create: (conf, bot, discord, message, option) => {
    if (message.channel.type === 'dm') {message.author.send({embed: {color: 3447003, title: 'Server commands must be used in the server.',}}); return}
    //message.delete();
    if (message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}

    console.log(option)

    let embed = new discord.RichEmbed()
      .setColor('#8600AE')
      .setDescription(question)
      .setFooter('Polls')
      .setTimestamp();
    message.channel.send({embed}).then(msg => {
      msg.react('👍');
      msg.react('👎');
      msg.pin()
    });

    //bot.user.lastMessage.react(':thumbsup:');
    //bot.user.lastMessage.react(':thumbsdown:');
    //bot.user.lastMessage.pin();
  }
}
