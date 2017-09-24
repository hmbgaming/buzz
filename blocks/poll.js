
module.exports = {
  create: (conf, bot, discord, message, option) => {
    if (message.channel.type === 'dm') {message.author.send({embed: {color: 3447003, title: 'Server commands must be used in the server.',}}); return}
    message.delete();
    if (message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}

    let question=''; for (i=1; i < option.length; i++) {question += option[i]+' '}
    let embed = new discord.RichEmbed()
      .setColor('#8600AE')
      .setDescription(question)
    message.channel.send({embed}).then(msg => {
      msg.react('👍');
      msg.react('👎');
      msg.pin()
    });
  }
}
