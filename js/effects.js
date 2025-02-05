
const body = document.querySelector("body")

const PULSE_ACCURACY = 10
/*
    How much there are miliseconds between pulses (approximately)
*/
let defaultScreenColor = [255, 255, 255]
defaultScreenColor = [+defaultScreenColor[0], +defaultScreenColor[1], +defaultScreenColor[2]]
let defaultVingetteSize = 20
let pulseStorage = () => {pulse([255, 255, 255], 1)}
let pulseId = 0
let timesPulse = 0
"How much pulse should be repeated"

function pulse(color = [255, 0, 0], time = 0.3, vingetteUsed = -1, activated = 0) {
    "Time set in seconds"
    "If vingette needed to be used, then set its size in px in vingetteUsed"
    if (timesPulse > 0) {
        timesPulse--

        if (vingetteUsed == -1) {
            vingetteUsed = defaultVingetteSize
        }
        
        if (activated == 0) {
            body.style.background = `rgb(${color})`
            body.style.boxShadow = `0 0 ${vingetteUsed}px rgba(0,0,0,0.9) inset`
            activatePulse(color, time, vingetteUsed, 1)
        }
        else{
            let currentColor = body.style.background.slice(4, -1).split(",")
            let divider = time * 1000 / PULSE_ACCURACY
            body.style.boxShadow = `0 0 ${+body.style.boxShadow.split(" ")[6].slice(0, -2) + (defaultVingetteSize - vingetteUsed) / divider}px rgba(0,0,0,0.9) inset`
            body.style.background = `rgb(${+currentColor[0] + (defaultScreenColor[0] - color[0]) / divider},${+currentColor[1] + (defaultScreenColor[1] - color[1]) / divider},${+currentColor[2] + (defaultScreenColor[2] - color[2]) / divider})`
        }
    }
}

function activatePulse(color = [255, 0, 0], time = 0.3, vingetteUsed = 0, activated = 0){
    timesPulse = time * 1000 / PULSE_ACCURACY 
    clearInterval(pulseId)
    pulseStorage = () => {pulse(color, time, vingetteUsed, activated)}
    pulseId = setInterval(pulseStorage, PULSE_ACCURACY)
}

pulseId = setInterval(pulseStorage, PULSE_ACCURACY)