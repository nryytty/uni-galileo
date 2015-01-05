// Plots sensor readings to https://plot.ly/~k-sergei/9/school-galileo-grove-gas-and-grove-hcho-sensors/

var Vref = 4.95;

// Sensor settings
var GAS_SENSOR_PIN = "A0";
var GAS_SENSOR_INTERVAL = 100;
var HCHO_SENSOR_PIN = "A1"
var HCHO_SENSOR_INTERVAL = 100;

// Plotly settings
var PLOTLY_USER = "k-sergei";
var PLOTLY_KEY = "4xib699d3r";
var PLOTLY_NAME = "galileo-sensors";
var PLOTLY_OPERATION_MODE = "overwrite";
var GAS_PLOTLY_STREAM_KEY = "eennr7wfiv";
var HCHO_PLOTLY_STREAM_KEY = "aoiykl0zhz";
var PLOTLY_MAX_POINTS = 100000;

var plotly = require('plotly')(PLOTLY_USER, PLOTLY_KEY);
var five = require("johnny-five");
var board = new five.Board();

// Plotly data and layout
var data = [
    {x:[], y:[], name: "GAS Sensor", stream:{token: GAS_PLOTLY_STREAM_KEY, maxpoints: PLOTLY_MAX_POINTS}},
    {x:[], y:[], name: "HCHO Sensor", stream:{token: HCHO_PLOTLY_STREAM_KEY, maxpoints: PLOTLY_MAX_POINTS}}
];
var layout = {
  title: "School Galileo Grove GAS and Grove HCHO sensors",
  xaxis: {
    title: "Time"
  },
  yaxis: {
    title: "Value"
  }
};
var opts = {
    fileopt: PLOTLY_OPERATION_MODE,
    filename: PLOTLY_NAME,
    layout: layout
};

board.on("ready", function() {
    // Init sensors
    var gas_sensor = new five.Sensor({
        pin: GAS_SENSOR_PIN,
        freq: GAS_SENSOR_INTERVAL
    });

    var hcho_sensor = new five.Sensor({
        pin: HCHO_SENSOR_PIN,
        freq: HCHO_SENSOR_INTERVAL
    });

    plotly.plot(data, opts, function (err, res) {
        if (err) {
            console.log("Error with plotly: "+ err);
        }
        console.log("Starting GAS and HCHO stream to plotly. Current time: "+ getDateTime());
        console.log(res);

        // Sensor plotly streams
        var gas_sensor_stream = plotly.stream(GAS_PLOTLY_STREAM_KEY, function (err, res) {
            if (err) {
                console.log("Error with GAS sensor plotly stream: "+ err);
            }
            console.log(res);
        });

        var hcho_sensor_stream = plotly.stream(HCHO_PLOTLY_STREAM_KEY, function (err, res) {
            if (err) {
                console.log("Error with HCHO sensor plotly stream: "+ err);
            }
            console.log(res);
        });

        // Sensor callbacks
        gas_sensor.on("data", function() {
            var vol=this.value/1023*Vref;
            data = {x: getDateTime(), y: vol };
            gas_sensor_stream.write(JSON.stringify(data)+'\n');
        });

        hcho_sensor.on("data", function() {
            var vol=this.value*Vref/1023;
            data = {x: getDateTime(), y: vol };
            hcho_sensor_stream.write(JSON.stringify(data)+'\n');
        });
    });
});

function getDateTime () {
    return new Date().toISOString().replace(/T/, ' ').replace(/Z/, '');
}
