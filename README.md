bbusblcd
========

Beaglebone USB LCD 16x2 line display

Simple webapp to drive an Adafruit 16x2 line LCD with RGB backlight and a USB
interface.

== Ingredients ==

* Adafruit USB + Serial Backpack Kit with 16x2 RGB backlight negative LCD - RGB on Black

* Beaglebone (BB) running Angstrom Linux 2013-04-13 http://beagleboard.org/latest-images.

== Steps ==

. Assemble the LCD with backpack following the Adafruit directions. 
Plug the LCD into the BB USB host port.

. Login to the BB using ssh.

----
# git clone git://github.com/bbx10/bbusblcd.git
# cd bbusblcd
# npm install serialport
# npm install express
# node lcdtest.js
----

. Connect to the BB webapp from any device with a web browsing using the URL
http://beaglebone.lan:4000

See the wiki for pictures.

