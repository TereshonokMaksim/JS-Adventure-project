// MAIN PLAYER DATA

class Player extends LiveObject {
    constructor(){
        super("Main Hero", -1, 10, new Health(200), new Fists(), new UsualClothes(), "It is you, hero, or player.", {}, 10)
        this.hunger = 0
        this.thirst = 0
        /*
            Hunger and thirst are in percents
            Once one of them is empty, hero will get damage every turn,
            no matter on equipment.
        */
        this.currentAmmo = 0
        this.money = 0
        this.inventory = {"Usual clothes": 1}
        this.log = []
        this.currentChapter = 0
        this.equipment = {"suit": 0, "backpack": 0}

        // CURRENT LOCATION DATA

        this.currentEncounter = 0
        this.currentLocation = 0
        this.avalaibleLocations = []
        this.previousLocations = []
    }
    addItem(itemName, count){
        if (Object.keys(this.inventory).includes(itemName)){
            this.inventory[itemName] += count
        }
        else{
            this.inventory[itemName] = count
        }
    }
    takeItem(itemName, count){
        if (Object.keys(this.inventory).includes(itemName)){
            this.inventory[itemName] -= count
            if (this.inventory[itemName] <= 0){
                delete this.inventory[itemName]
            }
        }
    }
}

let player = new Player()