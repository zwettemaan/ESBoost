//
// fontCacheAPI.jsx - a script for Adobe InDesign.
//
// API wrapper for fontCache.jsx
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

//@include "json2.js"

var FontCache = {};

(function() {
	
var gLoader = 
"//@targetengine \"fontCache\"\n" +
"if (\"undefined\" == typeof getFontListJSONByFontName) {\n" +
"  $.evalFile(File(\"" + File($.fileName).parent + 
"\" + \"/fontCache.jsx\"));\n" +
"}\n";

function escape(s) {
    return s.replace(/\\/g,"\\\\").replace(/"/g,"\\\"");
}

function callFontCacheFunction(functionName, fontKey) {
    var fontScript = gLoader + functionName + "(JSON.parse(\"" + escape(JSON.stringify(fontKey)) + "\"));\n";
    var retVal = app.doScript(fontScript);
    if (! retVal) {
        return retVal;
    }
    else {
        return JSON.parse(retVal);
    }  
}

FontCache.getFontListByFontName = function(fontName) {
     var functionName = "getFontListJSONByFontName";
     return callFontCacheFunction(functionName, fontName);
}

FontCache.getFontListByFontFamily = function(fontFamily) {
     var functionName = "getFontListJSONByFontFamily";
     return callFontCacheFunction(functionName, fontFamily);
}

FontCache.getFontListByFontFullName = function(fontFullName) {
     var functionName = "getFontListJSONByFontFullName";
     return callFontCacheFunction(functionName, fontFullName);
}

FontCache.getFontListByFontFullNameNative = function(fontFullNameNative) {
     var functionName = "getFontListJSONByFontFullNameNative";
     return callFontCacheFunction(functionName, fontFullNameNative);
}

FontCache.getFontListByFontPlatformName = function(fontPlatformName) {
     var functionName = "getFontListJSONByFontPlatformName";
     return callFontCacheFunction(functionName, fontPlatformName);
}

FontCache.getFontListByFontPostscriptName = function(fontPostscriptName) {
     var functionName = "getFontListJSONByFontPostscriptName";
     return callFontCacheFunction(functionName, fontPostscriptName);
}

})();

