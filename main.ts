// Project Settings:
// Project Name: Macqueen_US
// 
// No Pairing Required: Anyone can connect via Bluetooth.
// 
// Extensions:
// Maqueen
// Bluetooth
bluetooth.onBluetoothConnected(function () {
    maqueen.motorStop(maqueen.Motors.All)
    speedValue = speedValue
    runningState = 1
    basic.showString("C")
})
bluetooth.onBluetoothDisconnected(function () {
    maqueen.motorStop(maqueen.Motors.All)
    runningState = 0
    basic.showString("D")
   
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_DOWN) {
        direction = 1
        if (obstacle == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speedValue)
        } else {
            maqueen.motorStop(maqueen.Motors.All)
        }
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_1_UP) {
        direction = 0
        maqueen.motorStop(maqueen.Motors.All)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_DOWN) {
        direction = 2
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speedValue)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_2_UP) {
        direction = 0
        maqueen.motorStop(maqueen.Motors.All)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_DOWN) {
        direction = 3
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speedValue)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_3_UP) {
        direction = 0
        maqueen.motorStop(maqueen.Motors.All)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_DOWN) {
        direction = 4
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speedValue)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_4_UP) {
        direction = 0
        maqueen.motorStop(maqueen.Motors.All)
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_DOWN) {
        basic.showString("+")
        if (speedValue < maxSpeed - speedIncrement) {
            speedValue += speedIncrement
        } else {
            speedValue = maxSpeed
        }
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_A_UP) {
    	
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_DOWN) {
        basic.showString("-")
        if (speedValue > speedIncrement - 1) {
            speedValue += 0 - speedIncrement
        } else {
            speedValue = 0
        }
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_B_UP) {
    	
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_C_DOWN) {
        basic.showString("0")
        speedValue = 0
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_C_UP) {
    	
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_DOWN) {
        basic.showString("!")
        speedValue = maxSpeed
    } else if (control.eventValue() == EventBusValue.MES_DPAD_BUTTON_D_UP) {
    	
    }
})
/**
 * On Start
 */
let distance = 0
let direction = 0
let runningState = 0
let obstacle = 0
let speedIncrement = 0
let speedValue = 0
let maxSpeed = 0
maxSpeed = 200
speedValue = 100
speedIncrement = 25
obstacle = 0
runningState = 0
basic.showLeds(`
    . . . . .
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    `)
maqueen.motorStop(maqueen.Motors.All)
// Obstacle Detection and Handling
basic.forever(function () {
    distance = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (distance < 6) {
        obstacle = 1
    }
    if (distance > 8) {
        obstacle = 0
    }
    
    if (direction == 0) {
        if (runningState == 0) {
            basic.showString("D")
        }
        else if (runningState == 1) {
            basic.showString("C")
        }
    } else if (direction == 1) {
        if (obstacle == 1) {
            maqueen.motorStop(maqueen.Motors.All)
            basic.showIcon(IconNames.SmallSquare)
        } else {
            basic.showArrow(ArrowNames.South)
        }
    } else if (direction == 2) {
        basic.showArrow(ArrowNames.North)
    } else if (direction == 3) {
        basic.showArrow(ArrowNames.West)
    } else if (direction == 4) {
        basic.showArrow(ArrowNames.East)
    }
    basic.pause(50)
})
