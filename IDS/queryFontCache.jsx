//
// queryFontCache.jsx - a script for Adobe InDesign.
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
// Start command line session and navigate into 'IDS' directory.
//
// First start the server using 'startServer.bat', then 'runScript.bat queryFontCache.jsx'


//
// Pre-amble, needed to allow running both with 
// ESTK and sampleclient
//
if ($.fileName) {
    $.global.MODULE_DIR = File($.fileName).parent;
}
else {
    $.global.RUNSCRIPT_DIR = Folder(app.scriptArgs.getValue("RUNSCRIPT_DIR"));
	$.global.MODULE_DIR = Folder($.global.RUNSCRIPT_DIR);
}
//
// End pre-amble
//

// Portable includes of utils.jsx, fontCacheAPI.jsx. Needs proper preamble for $.global.MODULE_DIR in main script
app.doScript("//@include \"" + $.global.MODULE_DIR + "/utils.jsx\"");
app.doScript("//@include \"" + $.global.MODULE_DIR + "/fontCacheAPI.jsx\"");

var clearTimer = $.hiresTimer;
var list = FontCache.getFontListByFontPostscriptName("ArialMT");
endMicroseconds = $.hiresTimer;
if (list) {
	output("ArialMT count = " + list.length + ". Time lapsed (ms)" + Math.floor(endMicroseconds / 1000 + 0.5));
}

clearTimer = $.hiresTimer;
var list = FontCache.getFontListByFontFamily("Arial");
endMicroseconds = $.hiresTimer;
if (list) {
	output("Arial family count = " + list.length + ". Time lapsed (ms)" + Math.floor(endMicroseconds / 1000 + 0.5));
	for (var idx = 0; idx < list.length; idx++) {
		output(list[idx].postscriptName);
	}
}

