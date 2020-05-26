//
// loader.jsx - a helper script for Adobe InDesign or InDesign Server.
//
// Module loader which can strip unused LOG... calls from modules as they are loaded
// This module loaders uses persistence to avoid re-loading modules
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

var loadModule;

(function() {
if (! loadModule) {
    
    var REGEXP_LOGENTRYEXIT = /LOG\.log(Entry|Exit)\(\".*?\"\)/g;
    var REGEXP_LOGERROR = /LOG\.logError\(\".*?\"\)/g;
    var REGEXP_LOGWARNING = /LOG\.logWarning\(\".*?\"\)/g;
    var REGEXP_LOGNOTE = /LOG\.logNote\(\".*?\"\)/g;
    var REGEXP_LOGTRACE = /LOG\.logTrace\(\".*?\"\)/g;
    
    loadModule = function(in_moduleName) {
        var upperCaseModuleName = in_moduleName.toUpperCase();
        if (upperCaseModuleName != "LOG") {
            loadModule("log");
        }
        if (! $.global.MODULE_CONTAINER || ! $.global.MODULE_CONTAINER[upperCaseModuleName]) {
            
            if (! $.global.MODULE_CONTAINER) {
                $.global.MODULE_CONTAINER = {};
            }
        
            if (! $.global.MODULE_CONTAINER[upperCaseModuleName]) {
                $.global.MODULE_CONTAINER[upperCaseModuleName] = {};
            }
            
            var savedModuleLoading = $.global.MODULE_CONTAINER.__LOADING_MODULE;
            
            $.global.MODULE_CONTAINER.__LOADING_MODULE = $.global.MODULE_CONTAINER[upperCaseModuleName];
            $.global.MODULE_DIR = File($.fileName).parent;
            var moduleScriptFile = File($.global.MODULE_DIR + "/" + in_moduleName + ".jsx");
            moduleScriptFile.encoding = "UTF8";
            moduleScriptFile.open("r");
            var moduleScript = moduleScriptFile.read();
            moduleScriptFile.close();
            var LOG = $.global.MODULE_CONTAINER.LOG;
            if (upperCaseModuleName != "LOG" && LOG) {
                if (LOG.getLogEntryExit && ! LOG.getLogEntryExit()) {
                    moduleScript = moduleScript.replace(REGEXP_LOGENTRYEXIT, ";");
                }
                if (LOG.getLogLevel) {
                    var logLevel = LOG.getLogLevel();
                    if (logLevel < LOG.LOG_ERROR) {
                        moduleScript = moduleScript.replace(REGEXP_LOGERROR,  ";");
                    }
                    if (logLevel < LOG.LOG_WARNING) {
                        moduleScript = moduleScript.replace(REGEXP_LOGWARNING,";");
                    }
                    if (logLevel < LOG.LOG_NOTE) {
                        moduleScript = moduleScript.replace(REGEXP_LOGNOTE, ";");
                    }
                    if (logLevel < LOG.LOG_TRACE) {
                        moduleScript = moduleScript.replace(REGEXP_LOGTRACE, ";");
                    }
                }
            }
            
            app.doScript(moduleScript);

            $.global.MODULE_CONTAINER.__LOADING_MODULE = savedModuleLoading;
        }

        return $.global.MODULE_CONTAINER[upperCaseModuleName];
    }
}
})();
