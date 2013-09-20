/* Modules */

var path = require('path'),
    colors = require('colors'),
    fs = require('fs-extra'),
    server = require('connect');

/* App */

// Configuration
var Servera = {};

Servera.file = path.join(process.env.HOME, '/.servera.json');
Servera.sample = path.join(__dirname, '../sample.servera.json');

// Colors
var success = function(message) {
  return message.green;
};

var warn = function(message) {
  return message.yellow;
};

var error = function(message) {
  return message.red;
};

var log = function(message) {
  return message.blue;
};

// Initialization
Servera.copy = function() {
  fs.copy(Servera.sample, Servera.file, function(err) {
    if (err) { throw err; }
    console.log(success('"' + Servera.file + '" was created.'));
  });
};

Servera.init = function() {
  fs.exists(Servera.file, function(exists) {
    if (exists) {
      console.log(warn('"' + Servera.file + '" already exists.'));
    } else {
      try {
        Servera.copy();
      } catch(err) {
        console.log(error('"' + Servera.file + '" couldn\'t be created.'));
      }
    }
  });
};

// Server
Servera.configure = function(project) {
  try {
    var config = require(Servera.file);
    Servera.config = config[project];
  } catch(err) {
    console.log(error('"' + Servera.file + '" couldn\'t be parsed.'));
    process.exit(1);
  }
};

Servera.serve = function() {
  server()
    .use(server.logger('tiny'))
    .use(server.static(Servera.config.dir))
    .listen(Servera.config.port, function() {
      console.log(log('>>  Dir: %s'), Servera.config.dir);
      console.log(log('>> Port: %d'), Servera.config.port);
    });
};

Servera.run = function(project) {
  if (project === 'cwd') {
    Servera.config = {
      dir: process.cwd(),
      port: 9000
    };
  } else {
    Servera.configure(project);
  }
  try {
    Servera.serve();
  } catch(err) {
    console.log(error('"' + project + '" couldn\'t be served.'));
  }
};

// List
Servera.list = function() {
  try {
    var config = require(Servera.file);
    Object.keys(config)
      .sort()
      .forEach(function(project) {
        console.log(log(project));
    });
  } catch(err) {
    console.log(error('The projects couldn\'t be listed.'));
  }
};

/* Exports */

module.exports = {
  init: Servera.init,
  run: Servera.run,
  list: Servera.list
};
