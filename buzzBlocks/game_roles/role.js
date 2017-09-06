module.exports = {
  join: function(conf, message, option) {
    var role = ''; for (i=1; i < option.length; i++) {role += option[i]+' '};
    var server_role = message.guild.roles.find("name", role.slice(0, -1));
    
    if (message.member.roles.has(server_role.id)) {return;}
    if (server_role === null || role.slice(0, -1) === conf['admin-role']) {return;}

    message.member.addRole(server_role);
    message.author.send('You have joined ' + role + '!');
  },
  leave: function(conf, message, option) {
    var role = ''; for (i=1; i < option.length; i++) {role += option[i]+' '};
    var server_role = message.guild.roles.find("name", role.slice(0, -1));

    if (message.member.roles.has(server_role.id) === false) {return;}
    if (server_role === null || role.slice(0, -1) === conf['admin-role']) {return;}

    message.member.removeRole(server_role);
    message.author.send('You have left ' + role + '!');
  }
};
