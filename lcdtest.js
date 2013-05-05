var usblcd = require('./usblcdmo');
var express = require('express');
var app = express();

var fs = require('fs');
var indexhtml = fs.readFileSync('./index.html');

app.get('^/$', function (req, res) {
   res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get(/^\/clearscreen$/, function(req, res) {
    console.log('clearscreen');
    usblcd.clearscreen();
    res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get(/^\/backlight\/(\d)$/, function(req, res) {
    var option = req.params[0];
    console.log('backlight ' + option);
    usblcd.backlight(option);
    res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get(/^\/blockcursor\/(\d+)$/, function(req, res) {
    var option = req.params[0];
    console.log('blockcursor ' + option);
    usblcd.backlight(option);
    res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get(/^\/contrast\/(\d+)$/, function(req, res) {
    var option = req.params[0];
    console.log('contrast ' + option);
    usblcd.contrast(option);
    res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get(/^\/brightness\/(\d+)$/, function(req, res) {
    var option = req.params[0];
    console.log('brightness ' + option);
    usblcd.brightness(option);
    res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get(/^\/backlightRGB\/(\d+)\/(\d+)\/(\d+)$/, function(req, res) {
    var red = req.params[0];
    var green = req.params[1];
    var blue = req.params[2];
    console.log('backlightRGB ' + red + ' ' + green + ' ' + blue);
    usblcd.backlightRGB(red, green, blue);
    res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get(/^\/show\/(.*)$/, function(req, res) {
    var option = req.params[0];
    console.log('show ' + option);
    usblcd.show(option);
    res.end(indexhtml, {'Content-Type': 'text/html'});
});

app.get('^/quote1$', function(req, res) {
    usblcd.clearscreen();
    usblcd.show('node.js, use the force');
    res.end(indexhtml, {'Content-Type': 'text/html'});
    });

app.get('^/quote2$', function(req, res) {
    usblcd.clearscreen();
    usblcd.show('node.js,  phone home');
    res.end(indexhtml, {'Content-Type': 'text/html'});
    });

app.get('^/quote3$', function(req, res) {
    usblcd.clearscreen();
    usblcd.show('node.js, make my day');
    res.end(indexhtml, {'Content-Type': 'text/html'});
    });

app.get('^/quote4$', function(req, res) {
    usblcd.clearscreen();
    usblcd.show('Houston, we havea node.js');
    res.end(indexhtml, {'Content-Type': 'text/html'});
    });

app.get('^/quote5$', function(req, res) {
    usblcd.clearscreen();
    usblcd.show('node.js, you are our only hope');
    res.end(indexhtml, {'Content-Type': 'text/html'});
    });

app.listen(4000);
console.log('Listening on port 4000');

usblcd.clearscreen();
usblcd.backlight(true);
usblcd.brightness(255);
usblcd.contrast(200);
usblcd.autoscroll(true);
usblcd.backlightRGB(0,255,0);
var now = new Date();
usblcd.show(now.toDateString() + ' ' + now.toTimeString().slice(0, 8));

