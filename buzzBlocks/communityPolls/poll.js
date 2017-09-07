
function select_option(option) {
  var fs = require('fs');
  var community_data = require('./data.json');

  var poll_option = ''; for (i=2; i < option.length; i++) {poll_option += option[i]+' '};
  community_data[option[1]] = poll_option;
  fs.writeFileSync('./data.json',JSON.stringify(community_data))

  console.log(community_data)
}


//function save() {fs.writeFileSync(conf['RaidGroup'],JSON.stringify(raid))}

module.exports = {
  handler: function(option) {
    if (option[0] == 'poll') {select_option(option)}
  }
};
