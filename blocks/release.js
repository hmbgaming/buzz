


function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function release_key(bot, discord, moment, schedule, database, conf) {
  conf['daily-key-release'] = moment().format('LL');

  let release_hour = random(8, 22);
  let release_minute = random(1, 59);
  //let release_date = `* ${release_minute} ${release_hour} * * *`
  let release_date = `1 * * * * *`


  var j = schedule.scheduleJob(release_date, function(){
    var collection = database.collection('release-keys');
    collection.find({}).toArray(function(err, table) {
      for (let row in table) {
        let embed = new discord.RichEmbed()
          .setColor('#0086AE')
          .setTitle(table[row]['key'])
          .setFooter('Game Key Release')
          .setTimestamp();
        bot.channels.find('name', conf['release-channel']).send({embed});
        collection.deleteOne({'key': table[row]['key']}, function(err, result) {});
        return}
    });

    j.cancel();
  });
}

module.exports = {
  handler: (bot, discord, schedule, conf, moment, database) => {
    //if (conf['daily-key-release'] !== moment().format('LL')) {release_key(bot, discord, moment, schedule, database, conf)}
    release_key(bot, discord, moment, schedule, database, conf);
  },

  add_release_key: (database, message, key) => {
    var collection = database.collection('release-keys');
    collection.insertMany([{'key': key}], function(err, result) {
      message.author.send({embed: {color: 3447003, description: `**${key}** was added to the release list!`,}})
    });
  }
}
