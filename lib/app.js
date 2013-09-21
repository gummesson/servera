/* Modules */

var path = require('path'),
    colors = require('colors'),
    fs = require('fs-extra'),
    server = require('connect');

/* App */

// Configuration
var Servera = {},
    Config = {},
    ANSI = {};

var File = {
  config: path.join(process.env.HOME, '.servera.json'),
  sample: path.join(__dirname, '..', 'sample.servera.json')
};

// Colors
ANSI.success = function(output) {
  return output.green;
};

ANSI.warn = function(output) {
  return output.yellow;
};

ANSI.error = function(output) {
  return output.red;
};

ANSI.log = function(output) {
  return output.blue;
};

// Initialization
Servera.copy = function() {
  fs.copy(File.sample, File.config, function(err) {
    if (err) { throw err; }
    console.log(ANSI.success('"' + File.config + '" was created.'));
  });
};

Servera.init = function() {
  fs.exists(File.config, function(exists) {
    if (exists) {
      console.log(ANSI.warn('"' + File.config + '" already exists.'));
    } else {
      try {
        Servera.copy();
      } catch(err) {
        console.log(ANSI.error('"' + File.config + '" couldn\'t be created.'));
      }
    }
  });
};

// Server
Servera.configure = function(project) {
  try {
    var file = require(File.config);
    Config = file[project];
  } catch(err) {
    console.log(ANSI.error('"' + File.config + '" couldn\'t be parsed.'));
    process.exit(1);
  }
};

Servera.serve = function() {
  server()
    .use(server.logger('tiny'))
    .use(server.static(Config.dir))
    .listen(Config.port, function() {
      console.log(ANSI.log('>>  Dir: %s'), Config.dir);
      console.log(ANSI.log('>> Port: %d'), Config.port);
    });
};

Servera.run = function(project) {
  if (project === 'cwd') {
    Config = {
      dir: process.cwd(),
      port: 9000
    };
  } else {
    Servera.configure(project);
  }
  try {
    Servera.serve();
  } catch(err) {
    console.log(ANSI.error('"' + project + '" couldn\'t be served.'));
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
        console.log(ANSI.log(project));
    });
  } catch(err) {
    console.log(ANSI.error('The projects couldn\'t be listed.'));
  }
};

/* Exports */

module.exports = {
  init: Servera.init,
  run: Servera.run,
  list: Servera.list
};
