const chapters = ["Awakening", "New life", "Back to forest", "Looking for the Machine", "The Meeting", "Da End"]
let time = 0

function passTime(timeAdded){
    // time should be in seconds
    time += timeAdded
    player.thirst += timeAdded / 64800 
    player.hunger += timeAdded / 172800
    if (player.thirst > 1){
        damage = (player.thirst - 1) * 50
        player.hp.bluntHit(damage, 1)
        player.thirst = 1
    }
    if (player.hunger > 1){
        damage = (player.hunger - 1) * 75
        player.hp.bluntHit(damage, 1)
        player.hunger = 1
    }
}

class Location {
    constructor(name, settlement, dangerLevel, additional = {}){
        this.name = name
        this.settlement = settlement
        this.dangerLevel = dangerLevel
        this.additional = additional
    }
}

class Event {
    constructor(name, immediateAction, textMessage = null, dialogMessage = null, locations = []){
        this.name = name
        this.action = immediateAction
        this.textMessage = textMessage
        this.dialogMessage = dialogMessage
        this.locations = locations
    }
    isPossible(){
        "checks whether this event can happen, looking onto current location"
        return locations.includes(currentLocation)
    }
    happen(){
        "calls this event if it is possible"
        if (this.isPossible()){
            alert(this.textMessage)
            return prompt(this.dialogMessage)
        }
    }
}
// let awakeningEvents = [Event()]