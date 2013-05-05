'use strict';

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", { baudrate: 57600 });
var Open = false;
var SaveBuffer = new Buffer(1024);
var SaveLen = 0;

function sp_write(data) {
    if (Open) {
        serialPort.write(data, function(err, results) {
            console.log('err ' + err + ' results ' + results);
        });
    }
    else {
        if (Buffer.isBuffer(data)) {
            data.copy(SaveBuffer, SaveLen);
            SaveLen += data.length;
        }
        else {
            new Buffer(data).copy(SaveBuffer, SaveLen);
            SaveLen += data.length;
        }
        //console.log('SaveLen ' + SaveLen);
    }
}

function show(data) {
    console.log('show ' + data);
    sp_write(data);
}

serialPort.on("open", function() {
    Open = true;
    serialPort.on("data", function (data) {
        console.log('serialPort data');
    });
    serialPort.on("close", function (data) {
        console.log('serialPort close');
    });
    //console.log('SaveBuffer ' + SaveBuffer.slice(0, SaveLen));
    console.log('open, sending buffered data ' + SaveLen);
    serialPort.write(SaveBuffer.slice(0, SaveLen), function(err, results) {
        console.log('err ' + err + ' results ' + results);
    });
    SaveLen = 0;
});

function backlight(data) {
    console.log('backlight ' + data);
    if (data === true || data === 1) {
        sp_write([0xFE, 0x42, 0x00]);
    }
    else {
        sp_write([0xFE, 0x46]);
    }
}

function brightness(bright) {
    console.log('brightness ' + bright);
    sp_write([0xFE, 0x99, bright]);
}

function contrast(contr) {
    console.log('contrast ' + contr);
    sp_write([0xFE, 0x50, contr]);
}

function clearscreen() {
    console.log('clearscreen');
    sp_write([0xFE, 0x58]);
}

function gotoxy(row,col) {
    console.log('gotoxy ' + row + ' ' + col);
    sp_write([0xFE, 0x47, row, col]);
}

function binarychoice(featurename, onCode, offCode, data) {
    console.log(featurename + ' ' + data);
    if (data === true || data === 1) {
        sp_write([0xFE, onCode]);
    }
    else {
        sp_write([0xFE, offCode]);
    }
}

function autoscroll(data) {
    binarychoice('autoscroll', 0x51, 0x52, data);
}

function underlinecursor(data) {
    binarychoice('underlinecursor', 0x4A, 0x4B, data);
}

function blockcursor(data) {
    binarychoice('blockcursor', 0x53, 0x54, data);
}

function backlightRGB(red, green, blue) {
    console.log('backlightRGB ' + red + ' ' + green + ' ' + blue);
    sp_write([0xFE, 0xD0, red, green, blue]);
}

exports.show = show;
exports.backlight = backlight;
exports.brightness = brightness;
exports.contrast = contrast;
exports.clearscreen = clearscreen;
exports.gotoxy = gotoxy;
exports.autoscroll = autoscroll;
exports.underlinecursor = underlinecursor;
exports.blockcursor = blockcursor;
exports.backlightRGB = backlightRGB;

