class AnimalSkin extends Armor{
    constructor(){
        super("Animal skin", "Good quality - good price", 4, 20, 40, 100)
    }
}

class ThickAnimalSkin extends Armor{
    constructor(){
        super("Thick animal skin", "Somebody process them into carpets...", 8, 30, 50, 200)
    }
}

class TowerArmor extends Armor{
    constructor(){
        super("Tower armor", "Concrete, steel and many unknown to you materials... Yet, weak against some gunpowder!", 15, 80, 115, 0)
        this.obtainable = false
    }
}