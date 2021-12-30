enum RBPingUnit {
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches,
    //% block="μs"
    MicroSeconds
}

enum MotorDirection {
    //% block="forward"
    Forward,
    //% block="reverse"
    Reverse
}
/**
  * Stop modes. Coast or Brake
  */
enum BBStopMode {
    //% block="no brake"
    Coast,
    //% block="brake"
    Brake
}

enum BiasDirection {
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="none"
    None
}

/**
  * Enumeration of line sensors.
  */
enum BBLineSensor {
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
 * Custom blocks
 * KEYESTUDIO Motor Shield Pins
 * Standby Pin P14
 * Motor 1 - Forward - P13(high), P12(low), PWM - P1
 * Motor 2 - Forward - P15(high), P16(low),PWM - P2
 */
//% weight=50 color=#07a8ed icon="\uf21a"
//% groups='["New style blocks","Basic","Advanced","Special","Ultrasonic","Line Sensor","5x5 Matrix","BitFace","OLED 128x64","Old style blocks"]'
namespace blubot {

    let leftBias = 0;
    let rightBias = 0;
    let stbyPin = DigitalPin.P14;
    let lMotorD0 = DigitalPin.P13;
    let lMotorD1 = DigitalPin.P12;
    let lMotorA0 = AnalogPin.P1;
    let rMotorD0 = DigitalPin.P15;
    let rMotorD1 = DigitalPin.P16;
    let rMotorA0 = AnalogPin.P2;
    let sonarDPin = DigitalPin.P11;

 function clamp(value: number, min: number, max: number): number {
        return Math.max(Math.min(max, value), min);
    }
    
    /**
    * Test Motor function. TB6612FNG Driver - STBY-14,M1-PWM-P1,M1-DIR-P13,12, M2-PWM-P2,M2-DIR-P15,16
    * @param unit desired conversion unit
    */
    //% blockId="blubot_motor_test" block="motor test"
    //% weight=50
    //% subcategory=Motor
    //% group="New style blocks"
    //% blockGap=8
    export function motorTest(): void {
        pins.digitalWritePin(stbyPin, 1);
        pins.analogWritePin(lMotorA0, 600);
        pins.digitalWritePin(lMotorD0, 1);
        pins.digitalWritePin(lMotorD1, 0);
        pins.analogWritePin(rMotorA0, 600);
        pins.digitalWritePin(rMotorD0, 1);
        pins.digitalWritePin(rMotorD1, 0);
        basic.pause(3000);
        pins.analogWritePin(lMotorA0, 0);
        pins.digitalWritePin(lMotorD0, 0);
        pins.digitalWritePin(lMotorD1, 0);
        pins.analogWritePin(rMotorA0, 0);
        pins.digitalWritePin(rMotorD0, 0);
        pins.digitalWritePin(rMotorD1, 0);
        basic.pause(3000);
        pins.analogWritePin(lMotorA0, 600);
        pins.digitalWritePin(lMotorD0, 0);
        pins.digitalWritePin(lMotorD1, 1);
        pins.analogWritePin(rMotorA0, 600);
        pins.digitalWritePin(rMotorD0, 0);
        pins.digitalWritePin(rMotorD1, 1);
        basic.pause(3000);
        pins.analogWritePin(lMotorA0, 0);
        pins.digitalWritePin(lMotorD0, 0);
        pins.digitalWritePin(lMotorD1, 0);
        pins.analogWritePin(rMotorA0, 0);
        pins.digitalWritePin(rMotorD0, 0);
        pins.digitalWritePin(rMotorD1, 0);

    }
    /**
    * Test Motor function. TB6612FNG Driver - STBY-14,M1-PWM-P1,M1-DIR-P13,12, M2-PWM-P2,M2-DIR-P15,16
    */
    //% blockId="blubot_motor_drive" block="Drive Motor %direction %speed"
    //% weight=100
    //% subcategory="Motor"
    export function motorDrive(): void {
        pins.digitalWritePin(stbyPin, 1);
        pins.analogWritePin(lMotorA0, 600);
        pins.digitalWritePin(lMotorD0, 1);
        pins.digitalWritePin(lMotorD1, 0);
        pins.analogWritePin(rMotorA0, 600);
        pins.digitalWritePin(rMotorD0, 1);
        pins.digitalWritePin(rMotorD1, 0);

    }
    // Use expandableArgumentMode=enabeled to collapse or
    // expand EACH input parameter

    /**
     * Set the motor speed and direction
     * @param directon to turn the motor shaft in,
     *      eg: MotorShaftDirection.Clockwise
     * @param speed of the motor in RPM, eg: 30
     * @param duration in milliseconds to run the
     *      motor the alarm sound, eg: 2000
     */
    //% block="set the motor to run %direction at %speed rate with bias %turn weight %bias"
    //% duration.shadow=timePicker
    //% speed.min=0 speed.max=60
    //% weight=50
    //% subcategory=Motor
    //% group="New style blocks"
    //% blockGap=8
    export function setMotorSpeed(
        direction: MotorDirection,
        speed: number,
        bias: BiasDirection,
        biasWeight: number
        ) {

    }
/**
      * Stop robot by coasting slowly to a halt or braking
      * @param mode Brakes on or off
      */
    //% blockId="BBstop" block="stop with%mode"
    //% weight=60
    //% subcategory=Motor
    //% group="New style blocks"
    //% blockGap=8
    export function stop(mode: BBStopMode): void {
        let stopMode = 0;
        if (mode == BBStopMode.Brake)
            stopMode = 1;
        pins.analogWritePin(lMotorA0, 0);
        pins.digitalWritePin(lMotorD0, stopMode);
        pins.digitalWritePin(lMotorD1, stopMode);
        pins.analogWritePin(rMotorA0, 0);
        pins.digitalWritePin(rMotorD0, stopMode);
        pins.digitalWritePin(rMotorD1, stopMode);
    }
    /**
      * Set left/right bias to match motors
      * @param direction direction to turn more (if robot goes right, set this to left)
      * @param bias percentage of speed to bias with eg: 10 
      */
    //% blockId="BBBias" block="bias%direction|by%bias|\\%"
    //% bias.min=0 bias.max=80 bias.defl=0
    //% direction.defl=BiasDirection.None
    //% weight=40
    //% subcategory=Motor
    //% group="New style blocks"
    //% blockGap=8
    export function BBBias(direction: BiasDirection, bias: number): void {
        bias = clamp(bias, 0, 80);
        if (direction == BiasDirection.Left) {
            leftBias = bias;
            rightBias = 0;
        }
        else if (direction == BiasDirection.Right) {
            leftBias = 0;
            rightBias = bias;
        }

        else {
            leftBias = 0
            rightBias = 0;
        }
    }


// Inputs and Outputs (Sensors)
    /**
    * Read distance from sonar module connected to accessory connector. Pin 11
    * @param unit desired conversion unit
    */
    //% blockId="blubot_sonar" block="read sonar as%unit"
    //% weight=100
    //% subcategory="Inputs & Outputs"
    export function sonar(unit: RBPingUnit): number {
        // send pulse
        let maxCmDistance = 500;
        let d = 10;
        pins.setPull(sonarDPin, PinPullMode.PullNone);
        for (let x = 0; x < 10; x++) {
            pins.digitalWritePin(sonarDPin, 0);
            control.waitMicros(2);
            pins.digitalWritePin(sonarDPin, 1);
            control.waitMicros(10);
            pins.digitalWritePin(sonarDPin, 0);
            // read pulse
            d = pins.pulseIn(sonarDPin, PulseValue.High, maxCmDistance * 58);
            if (d > 0)
                break;
        }
        switch (unit) {
            case RBPingUnit.Centimeters: return Math.round(d / 58);
            case RBPingUnit.Inches: return Math.round(d / 148);
            default: return d;
        }
    }

 /**
      * Read line sensor. Left Pin 9 , Right Pin 8
      * @param sensor Line sensor to read.
      */
    //% blockId="robobit_read_line" block="read%sensor|line sensor"
    //% weight=90
    //% subcategory="Inputs & Outputs"
    export function readLine(sensor: BBLineSensor): number {
        if (sensor == BBLineSensor.Left) {
                return pins.digitalReadPin(DigitalPin.P9);
        }
        else {
                return pins.digitalReadPin(DigitalPin.P8);
        }
    }
   
}
