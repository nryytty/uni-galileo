/*
    Grove Gas sensor
    http://www.seeedstudio.com/wiki/Grove_-_Gas_Sensor

    Uses http://playground.arduino.cc/Main/RunningMedian for median

    sudo chmod a+rw /dev/ttyACM0
    cu -l /dev/ttyACM0 -s 115200    
*/

#include "RunningMedian.h"
#define Vref 4.95

const int LED_PIN = 13;
const int GAS_SENSOR_PIN = A0;
int counter = 0;

RunningMedian<float,32> median;

void setup() {
    pinMode(LED_PIN, OUTPUT);
    pinMode(GAS_SENSOR_PIN,INPUT);
    Serial.begin(9600);
}

void loop() {
    
    counter++;
    // Turn led on to indicate about operation
    digitalWrite(LED_PIN, HIGH);

    // Statistical
    float _median;
    float _avg;
    float _min;
    float _max;

    // Read data
    int sensorValue = analogRead(GAS_SENSOR_PIN);
    float vol=(float)sensorValue/1023*Vref;
    median.add(vol);

    // Read statistical values
    median.getMedian(_median);
    median.getAverage(_avg);
    median.getLowest(_min);
    median.getHighest(_max);

    // print
    Serial.print(counter);
    Serial.print(":GAS: ");
    Serial.print(vol);
    Serial.print(" (median:");
    Serial.print(_median);
    Serial.print("/avg:");
    Serial.print(_avg);
    Serial.print("/min:");
    Serial.print(_min);
    Serial.print("/max:");
    Serial.print(_max);
    Serial.println(")");

    // Led off
    delay(100);
    digitalWrite(LED_PIN, LOW);

    delay(400);
}
