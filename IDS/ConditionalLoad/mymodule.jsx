//
// mymodule.jsx - a sample loadable module for Adobe InDesign or InDesign Server.
//
// Sample module demoing strippable logging code
//
// Part of a presentation for the Creative Developer Summit 2020
//
// v 1.0.0, May 26, 2020
//
// by Kris Coppieters
// kris@rorohiko.com
// https://www.linkedin.com/in/kristiaan/
//
// ----------------
//
// About Rorohiko:
//
// Rorohiko specialises in making printing, publishing and web workflows more efficient.
//
// This script is a free sample of the custom solutions we create for our customers.
//
// If your workflow is hampered by boring or repetitive tasks, inquire at
//
//   sales@rorohiko.com
//
// The scripts we write for our customers repay for themselves within weeks or
// months.
//
// ---------------

if (! loadModule) {
    app.doScript("//@include \"" + $.global.MODULE_DIR + "/loader.jsx\"");
}

(function() {

var CONTAINER = $.global.MODULE_CONTAINER;
var MYMODULE = CONTAINER.__LOADING_MODULE;

var LOG = loadModule("log");
var UTILS = loadModule("utils");

MYMODULE.test = function() {
    var retVal;

    LOG.logEntry("MYMODULE.test");

    LOG.logTrace("Trace");
    LOG.logNote("Note");
    LOG.logWarning("Warning");
    LOG.logError("Error");

    retVal = 123;

    LOG.logExit("MYMODULE.test");

    return retVal;
}

})();
