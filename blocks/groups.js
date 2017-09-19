
function help(conf, message, discord) {
  let available_groups = ''; for (var role in conf['group_roles']) {available_groups += conf['group_roles'][role]+'\n'}
  let embed = new discord.RichEmbed()
    .setColor(0x00AE86)
    .setTitle("Group Notifications")
    .setThumbnail("https://cdn2.iconfinder.com/data/icons/helmet/512/warrior-soldier-helmet-war-512.png")
    .setTimestamp()
    .setDescription(`*You can join game roles to send and receive games specific mentions! I'm very intuitive, so just let me know what game you wish to join!*`)
    .addField("Available", '```'+available_groups.slice(0,-1)+'```')
    .setFooter("Buzz");
  message.author.send(embed); return;
}

function join(conf, message, intent, value) {
  let server_role = message.guild.roles.find("name", value);
  if (server_role === null || conf['exclude-roles'].indexOf(value) === 0) {return}

  message.member.addRole(server_role);
  var embed = {embed: {color: 3447003, title: 'You have joined ' + value + '!',}}
  message.author.send(embed);
}

function quit(conf, message, intent, value) {
  let server_role = message.guild.roles.find("name", value);
  if (server_role === null || conf['exclude-roles'].indexOf(value) === 0) {return}
  if (message.member.roles.has(server_role.id) === false) {return}

  message.member.removeRole(server_role);
  var embed = {embed: {color: 3447003, title: 'You have left ' + value + '!',}}
  message.author.send(embed);
}

module.exports = {
  handler: (conf, message, intent, value, discord) => {
    if (message.channel.type === 'text'){
      if (intent === 'group_join') {join(conf, message, intent, value); return}
      if (intent === 'group_quit') {quit(conf, message, intent, value); return}
      if (intent === 'group_help') {help(conf, message, discord); return}
    } else {
      if (intent === 'group_help') {help(conf, message, discord); return}
      message.author.send("Attempted to interact with "+value+", but you are in a DM channel. Please try again in the server.")}
}};
