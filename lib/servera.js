/* Modules */

var path   = require('path'),
    chalk  = require('chalk'),
    fs     = require('fs-extra'),
    server = require('st'),
    http   = require('http');

/* Servera */

// Configuration
var Servera = {},
    config  = {},
    msg     = {};

var File = {
  config: path.join(process.env.HOME, '.servera.json'),
  sample: path.join(__dirname, '..', 'sample.servera.json')
};

// Colors
msg.success = function(output) {
  return chalk.green(output);
};

msg.warn = function(output) {
  return chalk.yellow(output);
};

msg.error = function(output) {
  return chalk.red(output);
};

msg.info = function(output) {
  return chalk.blue(output);
};

// Initialization
Servera.copy = function() {
  fs.copy(File.sample, File.config, function(err) {
    if (err) { throw err; }
    console.log(msg.success('"' + File.config + '" was created.'));
  });
};

Servera.init = function() {
  fs.exists(File.config, function(exists) {
    if (exists) {
      console.log(msg.warn('"' + File.config + '" already exists.'));
    } else {
      try {
        Servera.copy();
      } catch(err) {
        console.log(msg.error('"' + File.config + '" couldn\'t be created.'));
      }
    }
  });
};

// Server
Servera.configure = function(project) {
  try {
    var file = require(File.config);
    config = file[project];
  } catch(err) {
    console.log(msg.error('"' + File.config + '" couldn\'t be parsed.'));
    process.exit(1);
  }
};

Servera.serve = function() {
  server()
    .use(server.logger('tiny'))
    .use(server.static(config.dir))
    .listen(config.port, function() {
      console.log(msg.info('>>  Dir: %s'), config.dir);
      console.log(msg.info('>> Port: %d'), config.port);
    });
};

Servera.run = function(project) {
  if (project === 'cwd') {
    config = {
      dir: process.cwd(),
      port: 9000
    };
  } else {
    Servera.configure(project);
  }
  try {
    Servera.serve();
  } catch(err) {
    console.log(msg.error('"' + project + '" couldn\'t be served.'));
  }
};

// List
Servera.list = function() {
  try {
    var file = require(File.config);
    Object
      .keys(file)
      .sort()
      .forEach(function(project) {
        console.log(msg.info(project));
    });
  } catch(err) {
    console.log(msg.error('The projects couldn\'t be listed.'));
  }
};

/* Exports */

module.exports = {
  init: Servera.init,
  run: Servera.run,
  list: Servera.list
};
