
function reward(conf, message, database) {
  var current_level;
  var collection = database.collection('level-data');
  collection.find({}).toArray(function(err, table) {
    for (let row in table) { if (table[row]['user'] === message.author.username){
      for (let r in conf['level-ranks']) {
        let level_rank = message.guild.roles.find("name", r);
        if (level_rank === null) {return};
        if (message.member.roles.has(level_rank.id) === false) {
          if (table[row]['level'] >= conf['level-ranks'][r]) {
            message.member.addRole(level_rank);
            message.channel.send({embed: {color: 3447003, description: '**'+message.author.username+'** has earned the rank **'+r+'** !',}});
          }
        }
  }}}});
}

function useradd(message, database) {
  var collection = database.collection('level-data');
  collection.find({}).toArray(function(err, table) {
    for (let row in table) {if (table[row]['user'] === message.author.username){return}}
    collection.insertMany([{'user': message.author.username}]);
    collection.updateOne({'user': message.author.username}, { $set:{'level': 1}});
    collection.updateOne({'user': message.author.username}, { $set:{'experience': 0}});

    let embed = {embed: {color: 3447003, description: "Congrats "+message.author.username+", you just advanced to **level 1** !"}}
    message.author.send(embed);
  });
}

function levelup(conf, message, database) {
  var collection = database.collection('level-data');
  collection.find({}).toArray(function(err, table) {
    for (let row in table) {if (table[row]['user'] === message.author.username){
      if (table[row]['level'] >= conf['level-cap']) {return}
      collection.updateOne({'user': message.author.username}, { $set:{'experience': table[row]['experience']+1}});

      if (table[row]['experience'] >= ((table[row]['level'] *.29)+(table[row]['level'] +1))) {
        collection.updateOne({'user': message.author.username}, { $set:{'level': table[row]['level'] +1}});
        collection.updateOne({'user': message.author.username}, { $set:{'experience': 0}});

        let embed = {embed: {color: 3447003, description: "Congrats "+message.author.username+", you just advanced to **level "+(table[row]['level'] +1)+"** !"}}
        message.author.send(embed);
      }
}}});
}

module.exports = {
  handler: (conf, message) => {
    if (message.channel.type === 'text'){

        useradd(message, database);
        levelup(conf, message, database);
        reward(conf, message, database);

  }}
}
