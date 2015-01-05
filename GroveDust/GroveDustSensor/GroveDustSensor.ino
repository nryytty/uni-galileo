/*
    Grove - Dust Sensor
    http://www.seeedstudio.com/wiki/Grove_-_Dust_Sensor
*/

const int LED_PIN = 13;
const int DUST_SENSOR_PIN = 8;

unsigned long duration;
unsigned long last_print_ms;
unsigned long sampletime_ms = 15000; // sample time 15s ;
unsigned long lowpulseoccupancy = 0;

float ratio = 0;
float concentration = 0;
int counter = 0;

void setup() {
    pinMode(LED_PIN, OUTPUT);
    pinMode(DUST_SENSOR_PIN,INPUT);
    Serial.begin(9600);
    last_print_ms = millis();
}

void loop() {
    duration = pulseIn(DUST_SENSOR_PIN, LOW);
    lowpulseoccupancy = lowpulseoccupancy+duration;

    if ((millis()-last_print_ms) > sampletime_ms) {
        counter++;

        // Turn led on to indicate about operation
        digitalWrite(LED_PIN, HIGH);

        ratio = lowpulseoccupancy/(sampletime_ms*10.0);  // Integer percentage 0=>100
        concentration = 1.1*pow(ratio,3)-3.8*pow(ratio,2)+520*ratio+0.62; // using spec sheet curve

        Serial.print(counter);
        Serial.print(":DUST: occ:");
        Serial.print(lowpulseoccupancy);
        Serial.print(", ratio:");
        Serial.print(ratio);
        Serial.print(", conc.:");
        Serial.println(concentration);
        lowpulseoccupancy = 0;

        // Led off
        delay(100);
        digitalWrite(LED_PIN, LOW);

        last_print_ms = millis();
    }
}
