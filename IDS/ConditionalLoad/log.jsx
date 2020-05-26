//
// log.jsx - a loadable module script for Adobe InDesign or InDesign Server.
//
// Logging functions
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
var LOG = CONTAINER.__LOADING_MODULE;

var UTILS = loadModule("utils");
	
LOG.LOG_NONE = 0;
LOG.LOG_ERROR = 1;
LOG.LOG_WARNING = 2;
LOG.LOG_NOTE = 3;
LOG.LOG_TRACE = 4;

var logLevel = LOG.LOG_WARNING;
var logEntryExit = 0;

LOG.getLogEntryExit = function() {
	return logEntryExit;
};

LOG.getLogLevel = function() {
	return logLevel;
};

LOG.logEntry = function(in_ftnName) {
	if (logEntryExit) {
		LOG.logTrace("ENTRY: " + in_ftnName);
	}
};

LOG.logError = function(in_msg) {
	if (logLevel >= LOG.LOG_ERROR) {
		LOG.logMessage("ERROR: " + in_msg);
	}
};

LOG.logExit = function(in_ftnName) {
	if (logEntryExit) {
		LOG.logTrace("EXIT : " + in_ftnName);
	}
};

LOG.logMessage = function(in_msg) {
	UTILS.output(in_msg);
};

LOG.logNote = function(in_msg) {
	if (logLevel >= LOG.LOG_NOTE) {
		LOG.logMessage("NOTE : " + in_msg);
	}
};

LOG.logTrace = function(in_msg) {
	if (logLevel >= LOG.LOG_TRACE) {
		LOG.logMessage("TRACE: " +in_msg);
	}
};

LOG.logWarning = function(in_msg) {
	if (logLevel >= LOG.LOG_WARNING) {
		LOG.logMessage("WARN : " + in_msg);
	}
};

LOG.setLogEntryExit = function(in_enableLogEntryExit) {
	logEntryExit = in_enableLogEntryExit;
};

LOG.setLogLevel = function(in_level) {
	logLevel = in_level;
};

})();
