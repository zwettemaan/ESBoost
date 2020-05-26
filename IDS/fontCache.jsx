//
// fontCache.jsx - a script for Adobe InDesign.
//
// Cache font database into persistent engine memory. Use fontCacheAPI.jsx to query databasze
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

//@targetengine fontCache

// https://github.com/douglascrockford/JSON-js
//@include "json2.js"

var getFontListJSONByFontName;
var getFontEntriesJSONByFontFamily;
var getFontListJSONByFontFullName;
var getFontListJSONByFontFullNameNative;
var getFontListJSONByFontPlatformName;
var getFontListJSONByFontPostscriptName;
var gFontCache;

(function() {

var gOmitAttrList = [ 
    "eventListeners",
    "events",
    "parent",
    "properties"
];

var gOmitAttrs = {};
for (var attrIdx = 0; attrIdx < gOmitAttrList.length; attrIdx++) {
    gOmitAttrs[gOmitAttrList[attrIdx]] = true;
}

if (! gFontCache) {
    loadFontCache();
}

function getFontEntry(font) {
    var fontEntry = {};
    for (var attr in font) {
        if (! gOmitAttrs[attr]) {
            fontEntry[attr] = font[attr];
        }
    }   
    return fontEntry;
}

getFontListJSONByFontPostscriptName = function(fontPostscriptName) {
    
    var retVal;

    try {
        var fontList = gFontCache.byFontPostscriptName[fontPostscriptName];
        retVal = JSON.stringify(fontList);
    }
    catch (err) {
    }
    
    return retVal;
}

getFontListJSONByFontPlatformName = function(fontPlatformName) {
    
    var retVal;

    try {
        var fontList = gFontCache.byFontPlatformName[fontPlatformName];
        retVal = JSON.stringify(fontList);
    }
    catch (err) {
    }
    
    return retVal;
}

getFontListJSONByFontFullNameNative = function(fontFullNameNative) {
    
    var retVal;

    try {
        var fontList = gFontCache.byFontFullNameNative[fontFullNameNative];
        retVal = JSON.stringify(fontList);
    }
    catch (err) {
    }
    
    return retVal;
}

getFontListJSONByFontFullName = function(fontFullName) {
    
    var retVal;

    try {
        var fontList = gFontCache.byFontFullName[fontFullName];
        retVal = JSON.stringify(fontList);
    }
    catch (err) {
    }
    
    return retVal;
}

getFontListJSONByFontFamily = function(fontFamily) {
    
    var retVal;

    try {
        var fontList = gFontCache.byFontFamily[fontFamily];
        retVal = JSON.stringify(fontList);
    }
    catch (err) {
    }
    
    return retVal;
}

getFontListJSONByFontName = function(fontName) {
    
    var retVal;

    try {
        var fontList = gFontCache.byFontName[fontName];
        retVal = JSON.stringify(fontList);
    }
    catch (err) {
    }
    
    return retVal;
}

function loadFontCache() {
    
    gFontCache = {};
    
    gFontCache.byFontName = {};
    gFontCache.byFontFamily = {};
    gFontCache.byFontFullName = {};
    gFontCache.byFontFullNameNative = {};
    gFontCache.byFontPlatformName = {};
    gFontCache.byFontPostscriptName = {};
    
    function addToList(table, key, entry) {
        var list = table[key];
        if (! list) {
            list = [];
            table[key] = list;
        }
        list.push(entry);
    }

    var fontIdx = app.fonts.length - 1;
    while (fontIdx >= 0) {
        try {
            var font = app.fonts.item(fontIdx);
            var fontEntry = getFontEntry(font);
            try {
                addToList(gFontCache.byFontName, fontEntry.name, fontEntry);
            }
            catch (err) {
            }
            try {
                addToList(gFontCache.byFontFamily, fontEntry.fontFamily, fontEntry);
            }
            catch (err) {
            }
            try {
                addToList(gFontCache.byFontFullName, fontEntry.fullName, fontEntry);
            }
            catch (err) {
            }
            try {
                addToList(gFontCache.byFontFullNameNative, fontEntry.fullNameNative, fontEntry);
            }
            catch (err) {
            }
            try {
                addToList(gFontCache.byFontPlatformName, fontEntry.platformName, fontEntry);
            }
            catch (err) {
            }
            try {
                addToList(gFontCache.byFontPostscriptName, fontEntry.postscriptName, fontEntry);
            }
            catch (err) {
            }
        }
        catch (err) {
        }
        fontIdx--;  
    }
}

})();
