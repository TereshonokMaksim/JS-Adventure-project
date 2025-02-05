function heal(addedHp = 10, effect = true, message = null) {
    'color of heal will be green if it will result in <=100 hp, otherwise it will be lime'
    player.hp.heal(addedHp)
    if (effect) {
        if (player.hp.overallPain < 20){
            color = [0, 255, 0]
        }
        else {
            color = [190, 255, 36]
        }
        activatePulse(color, 0.25, 10)
    }
    if (message != null){
        console.log(message)
    }
}

function harm(takenHp = 10, effect = true, message = null, bodyPartNum = -1) {
    'color of heal will be dark red with heavy vingette if it will result in >=20 hp or will be more than half of start hp, otherwise it will be red with mid vingette'
    // let takenPortion = 100 / (hp / takenHp)
    if (bodyPartNum != -1){
        player.hp.hit(takenHp, bodyPartNum)
    }
    else {
        player.hp.hurtRandomPart(takenHp)
    }
    if (effect) {
        if (player.hp.overallPain < 60){
            color = [255, 0, 0]
            vingette = 70
            time = 0.3
        }
        else {
            color = [180, 0, 0]
            vingette = 150
            time = 0.55
        }
        activatePulse(color, time, vingette)
    }
    if (message != null){
        console.log(message)
    }
}