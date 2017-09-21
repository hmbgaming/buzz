
module.exports = {
  uptime: (conf, client, message) => {
    if (message.channel.type === 'dm') {message.author.send({embed: {color: 3447003, title: 'Server commands must be used in the server.',}}); return}
    if (message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}
    message.author.send({embed: {color: 3447003, title: ((client.uptime/1000.0)/60).toFixed(2)+" minutes!",}});
  },

  sync: (conf, message) => {
    if (message.channel.type === 'dm') {message.author.send({embed: {color: 3447003, title: 'Server commands must be used in the server.',}}); return}
    if (message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}
    for (let role in conf['group_roles']) {
      if (message.guild.roles.find("name", conf['group_roles'][role]) === null) {
        let new_role = {
          color : conf['group-color'],
          hoist : false,
          name : conf['group_roles'][role],
          permissions : [],
          mentionable: true
        }
        message.guild.createRole(new_role);

  }} message.author.send({embed: {color: 3447003, title: 'Success',}})},

  release: (release, database, message, option) => {release.add_release_key(database, message, option)},

}
