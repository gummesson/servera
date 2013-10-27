/* Modules */

var path   = require('path'),
    chalk  = require('chalk'),
    fs     = require('fs-extra'),
    server = require('connect');

/* Servera */

// Configuration
var Servera = {},
    config  = {},
    log     = {};

var File = {
  config: path.join(process.env.HOME, '.servera.json'),
  sample: path.join(__dirname, '..', 'sample.servera.json')
};

// Logging
log.success = function(output) {
  console.log(chalk.green(output));
};

log.warn = function(output) {
  console.log(chalk.yellow(output));
};

log.error = function(output) {
  console.log(chalk.red(output));
};

log.info = function(output) {
  console.log(chalk.blue(output));
};

// Initialization
Servera.copy = function() {
  fs.copy(File.sample, File.config, function(err) {
    if (err) { throw err; }
    log.success('"' + File.config + '" was created.');
  });
};

Servera.init = function() {
  fs.exists(File.config, function(exists) {
    if (exists) {
      log.warn('"' + File.config + '" already exists.');
    } else {
      try {
        Servera.copy();
      } catch(err) {
        log.error('"' + File.config + '" couldn\'t be created.');
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
    log.error('"' + File.config + '" couldn\'t be parsed.');
    process.exit(1);
  }
};

Servera.serve = function() {
  server()
    .use(server.logger('tiny'))
    .use(server.static(config.dir))
    .listen(config.port, function() {
      log.info('>>  Dir: ' + config.dir);
      log.info('>> Port: ' + config.port);
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
    log.error('"' + project + '" couldn\'t be served.');
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
        console.log(log.info(project));
    });
  } catch(err) {
    log.error('The projects couldn\'t be listed.');
  }
};

/* Exports */

module.exports = {
  init: Servera.init,
  run: Servera.run,
  list: Servera.list
};
