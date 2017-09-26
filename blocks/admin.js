
module.exports = {
  uptime: (conf, client, message) => {
    if (message.channel.type === 'dm') {message.author.send({embed: {color: 3447003, title: 'Server commands must be used in the server.',}}); return}
    if (message.member.roles.some(r=>[conf['admin-role']].includes(r.name)) === false) {return;}
    message.author.send({embed: {color: 3447003, title: ((client.uptime/1000.0)/60).toFixed(2)+" minutes!",}});
  }
}
