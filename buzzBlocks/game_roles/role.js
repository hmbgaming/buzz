
function join(conf, message, option) {
  var role = ''; for (i=1; i < option.length; i++) {role += option[i]+' '};
  var server_role = message.guild.roles.find("name", role.slice(0, -1));

  if (server_role === null || role.slice(0, -1) === conf['admin-role']) {return;}
  if (message.member.roles.has(server_role.id)) {return;}

  message.member.addRole(server_role);
  message.author.send('You have joined ' + role.slice(0, -1) + '!');
}
function leave(conf, message, option) {
  var role = ''; for (i=1; i < option.length; i++) {role += option[i]+' '};
  var server_role = message.guild.roles.find("name", role.slice(0, -1));

  if (message.member.roles.has(server_role.id) === false) {return;}
  if (server_role === null || role.slice(0, -1) === conf['admin-role']) {return;}

  message.member.removeRole(server_role);
  message.author.send('You have left ' + role.slice(0, -1) + '!');
}
function create(conf, message, option) {
  var role = ''; for (i=1; i < option.length; i++) {role += option[i]+' '};
  var server_role = message.guild.roles.find("name", role.slice(0, -1));

  if (role.slice(0, -1) === conf['admin-role'] || message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}
  if (server_role === null) {
    var new_role = {
      color : conf['game-role-color'],
      hoist : false,
      name : role.slice(0, -1),
      permissions : [],
      mentionable: true
    }
    message.guild.createRole(new_role);
    message.author.send('You have created ' + role.slice(0, -1) + '!');
  }
}
function remove(conf, message, option) {
  var role = ''; for (i=1; i < option.length; i++) {role += option[i]+' '};
  var server_role = message.guild.roles.find("name", role.slice(0, -1));

  if (role.slice(0, -1) === conf['admin-role'] || message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}
  if (server_role === null) {return;}
  server_role.delete()
    .catch(console.error);
  message.author.send('You have removed ' + role.slice(0, -1) + '!');

}

module.exports = {
  handler: function(conf, message, option) {
    if (option[0] == 'join') {join(conf, message, option)}
    if (option[0] == 'quit') {leave(conf, message, option)}
    if (option[0] == 'create') {create(conf, message, option)}
    if (option[0] == 'remove') {remove(conf, message, option)}
  }
};
