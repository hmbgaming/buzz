


function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function release_key(database) {
  let release_hour = random(8, 22);
  let release_minute = random(1, 59);
  let release_date = `* ${release_minute} ${release_hour} * * *`

  var j = schedule.scheduleJob(release_date, function(){
    let release_number = Math.floor(Math.random()*available_keys.length);
    if (available_keys[release_number] === undefined) {j.cancel(); return}

    var collection = database.collection('release-keys');
    console.log(collection);

    available_keys.splice(release_number, 1);
    j.cancel();
  });
}

module.exports = {
  handler: (conf, moment, database) => {
    //if (conf['daily-key-release'] !== moment().format()) {release_key(database); conf['daily-key-release'] = moment().format()}

    var collection = database.collection('release-keys');
    console.log(collection);
  }}
