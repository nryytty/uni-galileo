// Pulse is not yet supported by Galileo-IO so dust sensor is not used
var LED_PIN = 13;
var GAS_SENSOR_PIN = "A0";
var HCHO_SENSOR_PIN = "A1";
var GAS_SENSOR_INTERVAL = 1000;
var HCHO_SENSOR_INTERVAL = 500;
var Vref = 4.95;

// Initialize board
var Galileo = require("galileo-io");
var board = new Galileo();

// GAS -----------
var gasRead = 0;
function gasSensor() {
  gasRead++;
  board.analogRead(GAS_SENSOR_PIN, function(sensorValue) {
    var vol=sensorValue/1023*Vref;
    console.log("Gas sensor (round:"+ gasRead +"): "+ vol);
  });
};

// HCHO ----------
var hchoRead = 0;
function hchoSensor() {
  hchoRead++;
  board.analogRead(HCHO_SENSOR_PIN, function(sensorValue) {
    var vol=sensorValue*Vref/1023;
    console.log("HCHO sensor (round:"+ hchoRead +"): "+ vol);
  });
}

// Board ---------

board.on("ready", function() {
  console.log("Connected to board");

  this.pinMode(LED_PIN, this.MODES.OUTPUT);
  this.pinMode(GAS_SENSOR_PIN, this.MODES.INPUT);
  this.pinMode(HCHO_SENSOR_PIN, this.MODES.INPUT);

  var blink = 1;

  setInterval(function() {
    console.log("*** Blink: "+ blink +" ***");
    board.digitalWrite(LED_PIN, 1);
    blink++;
  }, 1000);

  setInterval(gasSensor, GAS_SENSOR_INTERVAL);
  setInterval(hchoSensor, HCHO_SENSOR_INTERVAL);

});
