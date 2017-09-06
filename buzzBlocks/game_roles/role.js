module.exports = {
  join: function(bot, message, option) {
    var role = ''; for (i=1; i < option.length; i++) {role += option[i]+' '};
    var server_role = message.guild.roles.find("name", role.slice(0, -1));
    if (server_role === null) {return;}
    return server_role

    console.log(message.author.username);
  }
};
