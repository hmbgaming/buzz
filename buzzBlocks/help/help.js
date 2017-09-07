module.exports = {
  display: function(conf, buzzwords, message) {
    var buzzword_view = '\n\n**Buzzwords**\n```\n';for (var word in buzzwords){
      if (word != 'new-servermember-message'){
        buzzword_view += word+' '}}
      buzzword_view += '\n```';

    if (conf['game-role']) {
      var group_view = '\n**Group Notification**\n```\njoin [game]\nquit [game]\n```\n'
      buzzword_view += group_view
    }


    message.author.send(buzzword_view)
  }
};
