//
// regExp.jsx - a script for Adobe InDesign.
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
// First start the server using 'startServer.bat', then 'runScript.bat regExp.jsx'

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
    $.global.MODULE_DIR = Folder($.global.RUNSCRIPT_DIR);
}
//
// End pre-amble
//

// Portable include of utils.jsx. Needs proper preamble for $.global.MODULE_DIR in main script
app.doScript("//@include \"" + $.global.MODULE_DIR + "/utils.jsx\"");

var sampleCount = 2;
var loopCount = 100000;

var clearTimer;
var endMicroseconds;
var targetString = "mysamplestring";
var re = /A{2,3}.*(abd|def|ghi)/;
    
for (var sampleIdx = 1; sampleIdx <= sampleCount; sampleIdx++) {
    
    clearTimer = $.hiresTimer;
    averageWidth = patternMatch_LiteralRegexp();
    endMicroseconds = $.hiresTimer;
    output("Literal RegExp. Sample #" + sampleIdx + ". Time lapsed (ms)" + Math.floor(endMicroseconds / 1000 + 0.5));
    
    clearTimer = $.hiresTimer;
    averageWidth = patternMatch_CachedRegexp();
    endMicroseconds = $.hiresTimer;
    output("Cached RegExp. Sample #" + sampleIdx + ". Time lapsed (ms)" + Math.floor(endMicroseconds / 1000 + 0.5));
}

function patternMatch_LiteralRegexp() {
    for (var idx = 0; idx < loopCount; idx++) {
        var match = targetString.match(/A{2,3}.*(abd|def|ghi)/);
    }
}

function patternMatch_CachedRegexp() {
    for (var idx = 0; idx < loopCount; idx++) {
        var match = targetString.match(re);
    }
}
