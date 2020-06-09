@ECHO OFF

REM 
REM Install the InDesign CC 2019 server OMV so you can use it from ExtendScript Toolkit
REM
REM getServerOMV.bat - a script for Windows
REM
REM Part of a presentation for the Creative Developer Summit 2020
REM
REM v 1.0.0, May 26, 2020
REM
REM by Kris Coppieters 
REM kris@rorohiko.com
REM https://www.linkedin.com/in/kristiaan/
REM
REM ----------------
REM
REM About Rorohiko:
REM
REM Rorohiko specialises in making printing, publishing and web workflows more efficient.
REM
REM This script is a free sample of the custom solutions we create for our customers.
REM
REM If your workflow is hampered by boring or repetitive tasks, inquire at
REM
REM   sales@rorohiko.com
REM
REM The scripts we write for our customers repay for themselves within weeks or 
REM months.
REM
REM ---------------

CALL runScript.bat "%CD%\getServerOMV.jsx"

REN "%USERPROFILE%\Desktop\server.xml" omv$indesignserver-14.0$14.0.xml
MOVE "%USERPROFILE%\Desktop\omv$indesignserver-14.0$14.0.xml" "%APPDATA%\Adobe\ExtendScript Toolkit\4.0"