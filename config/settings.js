var nconf = require('nconf'),
  fs    = require('fs');

nconf.argv()
  .env();

// Base configuration for all environments
nconf.file('./config/develop.json');
// Override with specific enviroment config
var envConf = nconf.get('NODE_ENV')
if (envConf) {
  nconf.file('src/config/' + nconf.get('NODE_ENV') + '.json');
}

module.exports = nconf;
