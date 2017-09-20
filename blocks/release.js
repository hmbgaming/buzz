


function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function release_key(schedule, database) {
  let release_hour = random(8, 22);
  let release_minute = random(1, 59);
  //let release_date = `* ${release_minute} ${release_hour} * * *`
  let release_date = `1 * * * * *`

  var j = schedule.scheduleJob(release_date, function(){
    var collection = database.collection('release-keys');
    collection.find({}).toArray(function(err, table) {
      for (let row in table) {console.log(table[row])}//process.env.CURRENT_RELEASE = table[row]['key']; return}
    });
    console.log(process.env.CURRENT_RELEASE);

    console.log('release');
    j.cancel();
  });
}

module.exports = {
  handler: (schedule, conf, moment, database) => {
    if (conf['daily-key-release'] !== moment().format()) {release_key(schedule, database); conf['daily-key-release'] = moment().format()}
  },

  add_release_key: (database, message, key) => {
    var collection = database.collection('release-keys');
    collection.insertMany([{'key': key}], function(err, result) {
      message.author.send({embed: {color: 3447003, description: `**${key}** was added to the release list!`,}})
    });
  }
}
