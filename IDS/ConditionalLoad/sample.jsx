//
// sample.jsx - a sample script for Adobe InDesign
//
// Demonstrates module loading and LOG statement stripping functionality
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
//
//
// Start command line session and navigate into 'IDS' directory.
//
// First start the server using 'startServer.bat', then 'runScript.bat ConditionalLoad\regExp.jsx'

// Persistent engine so we can avoid reloading modules
//@targetengine HowToIDSFast

//
// Pre-amble, needed to allow running both with 
// ESTK and sampleclient
//
if ($.fileName) {
    $.global.MODULE_DIR = File($.fileName).parent;
}
else {
    $.global.RUNSCRIPT_DIR = Folder(app.scriptArgs.getValue("RUNSCRIPT_DIR"));
	$.global.MODULE_DIR = Folder($.global.RUNSCRIPT_DIR + "/ConditionalLoad");
}
//
// End pre-amble
//

// Portable include of loader.jsx. Needs proper preamble for $.global.MODULE_DIR in main script
app.doScript("//@include \"" + $.global.MODULE_DIR + "/loader.jsx\"");

var LOG = loadModule("log");

//
// Whatever we set here will cause some LOG... calls to be stripped from
// the persistent code. Increasing the logging beyond these settings will 
// have no effect. If you change this you need to restart the server
// to see any effect because the (possibly log-stripped) modules are 
// loaded in persistent memory
//

LOG.setLogLevel(LOG.LOG_ERROR);
LOG.setLogEntryExit(0);

var UTILS = loadModule("utils");
var MYMODULE = loadModule("mymodule");

UTILS.output("Hello");

LOG.setLogEntryExit(0);
LOG.setLogLevel(LOG.LOG_ERROR);
UTILS.output(MYMODULE.test());

LOG.setLogEntryExit(1);
LOG.setLogLevel(LOG.LOG_ERROR);
UTILS.output(MYMODULE.test());

LOG.setLogEntryExit(0);
LOG.setLogLevel(LOG.LOG_WARNING);
UTILS.output(MYMODULE.test());

LOG.setLogEntryExit(0);
LOG.setLogLevel(LOG.LOG_NOTE);
UTILS.output(MYMODULE.test());

LOG.setLogEntryExit(0);
LOG.setLogLevel(LOG.LOG_TRACE);
UTILS.output(MYMODULE.test());

// If the module was loaded into persistent memory with 'lower' settings, 
// than the ones below, these statements won't have any effect.
LOG.setLogEntryExit(1);
LOG.setLogLevel(LOG.LOG_TRACE);
UTILS.output(MYMODULE.test());
