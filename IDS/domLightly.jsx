//
// domLightly.jsx - a script for Adobe InDesign.
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
// First start the server using 'startServer.bat', then 'runScript.bat domLightly.jsx'

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

var sampleDocFilePath = File("/C/Users/Administrator/Desktop/IDS/Adobe History.indd");
var sampleCount = 5;

var clearTimer;
var endMicroseconds;
var averageWidth;
for (var sampleIdx = 1; sampleIdx <= sampleCount; sampleIdx++) {
    clearTimer = $.hiresTimer;
    averageWidth = averageWidth_HeavyDOM(sampleDocFilePath);
    endMicroseconds = $.hiresTimer;
    output("Heavy DOM. Sample #" + sampleIdx + ". Average Width = " + averageWidth + ". Time lapsed (ms)" + Math.floor(endMicroseconds / 1000 + 0.5));
    
    clearTimer = $.hiresTimer;
    averageWidth = averageWidth_LightDOM(sampleDocFilePath);
    endMicroseconds = $.hiresTimer;
    output("Light DOM. Sample #" + sampleIdx + ". Average Width = " + averageWidth + ". Time lapsed (ms)" + Math.floor(endMicroseconds / 1000 + 0.5));
}

function averageWidth_HeavyDOM(in_docFilePath) {
    var doc = app.open(in_docFilePath);
    var sumWidths = 0;
    var widthCount = 0;
    var pageItem;
    var width;
    for (var idx = 0; idx < doc.allPageItems.length; idx++) {
        try {
            width = doc.allPageItems[idx].geometricBounds[3] - doc.allPageItems[idx].geometricBounds[1];
            sumWidths += width;
            widthCount++;
        }
        catch (err) {
        }
   }
    var averageWidth = sumWidths / widthCount;
    doc.close(SaveOptions.NO);
    return averageWidth;
}

function averageWidth_LightDOM(in_docFilePath) {
    var doc = app.open(in_docFilePath);
    var sumWidths = 0;
    var widthCount = 0;
    var pageItem;
    var width;
    var allPageItems = doc.allPageItems.slice(0);
    for (var idx = 0; idx < allPageItems.length; idx++) {
        try {
            var bounds = allPageItems[idx].geometricBounds;
            width = bounds[3] - bounds[1];
            sumWidths += width;
            widthCount++;
        }
        catch (err) {
        }
    }
    var averageWidth = sumWidths / widthCount;
    doc.close(SaveOptions.NO);
    return averageWidth;
}

