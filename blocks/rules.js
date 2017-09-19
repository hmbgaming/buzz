
module.exports = {
  handler: (message, discord) => {
    let embed = new discord.RichEmbed()
      .setColor(0x00AE86)
      .setTitle("Rules")
      .setThumbnail("https://cdn2.iconfinder.com/data/icons/helmet/512/warrior-soldier-helmet-war-512.png")
      .setTimestamp()
      .setDescription(`*All community members are expected to abide by the follow rules*`)
      .addField("Rule 1", '*Treat others with respect. Banter is fun, bullying is not. Make sure all parties are on the same page when it comes to communicating. This includes both text and voice chats.*')
      .addField("Rule 2", '*Do not spam any channel with nonsense.*')
      .addField("Rule 3", '*No advertising. If you have an event, or something you would like to promote, please talk to a member of leadership to get permission.*')
      .addField("Rule 4", '*Leave all hate, racism, derogatory terms, and offensive comments out of our community.*')
      .setFooter("Buzz");
    message.author.send(embed);
  }
}
