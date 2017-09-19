
module.exports = {
  handler: (message, discord) => {
    let embed = new discord.RichEmbed()
      .setColor(0x00AE86)
      .setAuthor("Rules")
      .setTitle("All community members are expected to abide by the follow rules")
      .setThumbnail("http://i.imgur.com/p2qNFag.png")
      .setTimestamp()
      .setDescription(`
**Rule 1**
Treat others with respect. Banter is fun, bullying is not. Make sure all parties are on the same page when it comes to communicating. This includes both text and voice chats.
**Rule 2**
Do not spam any channel with nonsense.
**Rule 3**
No advertising. If you have an event, or something you would like to promote, please talk to a member of leadership to get permission.
**Rule 4**
Leave all hate, racism, derogatory terms, and offensive comments out of our community.`);





/*
    let embed = {embed: {
      color: 3447003,
      title: "Rules",
      description: "*All community members are expected to abide by the follow rules*",
      fields: [{
          name: "Rule 1",
          value: "```Treat others with respect. Banter is fun, bullying is not. Make sure all parties are on the same page when it comes to communicating. This includes both text and voice chats.```"},
          {
          name: "Rule 2",
          value: "```Do not spam any channel with nonsense.```"},
          {
          name: "Rule 3",
          value: "```No advertising. If you have an event, or something you would like to promote, please talk to a member of leadership to get permission.```"},
          {
          name: "Rule 4",
          value: "```Leave all hate, racism, derogatory terms, and offensive comments out of our community.```"}
      ],
      timestamp: new Date(),
      footer: {"text": "Buzz"}
    }};

    */
    message.author.send(embed);
  }
}
