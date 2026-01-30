/* gulpfile.js */
const uswds = require("@uswds/compile");

/**
 * USWDS version:
 * Set the version of USWDS you are using.
 */
uswds.settings.version = 3;

/**
 * Path settings:
 * Change these to match your Drupal theme structure.
 */
// Where the compiled CSS will go
uswds.paths.dist.css = "./assets/css"; 

// Where the USWDS theme files (settings, etc) are located
uswds.paths.dist.theme = "./sass";

// Where the USWDS assets (images, fonts, js) will be copied
uswds.paths.dist.img = "./assets/img";
uswds.paths.dist.fonts = "./assets/fonts";
uswds.paths.dist.js = "./assets/js";

/**
 * Exports:
 * These enable the commands: npx gulp init, npx gulp compile, etc.
 */
exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.updateUswds = uswds.updateUswds;
exports.default = uswds.watch;
