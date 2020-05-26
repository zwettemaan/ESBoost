﻿//
// utils.jsx - a script for Adobe InDesign.
//
// Just an output bottleneck function for outputting some strings
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


function output(msg) {

    // $.writeln(msg); // to write to ESTK console

    var f = File(Folder.temp + "/runscriptOutput.txt");
    f.open("a");
    f.writeln(msg);
    f.close();

}