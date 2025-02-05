// Drinks

class BlueberryCompote extends Food{
    constructor(){
        super("Blueberry compote", "Nice drink from blueberries. Tastier than the apple one.", 12, 40, 5, 10, {"Blueberries": 1, "Water": 1})
    }
}

class AppleCompote extends Food{
    constructor(){
        super("Apple compote", "Nice drink from apple.", 12, 40, 5, 10, {"Apple": 1, "Water": 1})
    }
}

class DirtyWater extends Food{
    constructor(){
        super("Dirty water", "You need to boil and filter it first, if you dont want to lose your health.", -25, 15, -5, 2)
    }
}

class Water extends Food{
    constructor(){
        super("Water", "Standart bottled water, 0.5l.", 8, 50, 2, 7, {"Dirty water": 1})
    }
}

class CleanWater extends Food{
    constructor(){
        super("Clean water", "Pure water in a big bottle.", 15, 100, 0, 20)
    }
}

// Foods

class Blueberries extends Food{
    constructor(){
        super("Blueberries", "Some blueberries. Can hold you alive for little longer.", 10, 10, 10, 5)
    }
}

class RawMeat extends Food{
    constructor(){
        super("Raw meat", "Its not looking tasty in that state.", 5, 20, 20, 20)
    }
}

class CookedMeat extends Food{
    constructor(){
        super("Cooked meat", "Now, its looking tasty!", 30, 10, 25, 40, {"Raw meat": 1})
    }
}

class Tomato extends Food{
    constructor(){
        super("Tomato", "Red and big tomato. Do not use as ingridient for juice.", 15, 15, 10, 7)
    }
}

class Potato extends Food{
    constructor(){
        super("Potato", "Yellow potato. Tasty, but not sure.", 15, 6, 10, 5)
    }
}

class CookedPotato extends Food{
    constructor(){
        super("Cooked potato", "Dark yellow potato. Much tastier than the raw one!", 25, 3, 20, 10, {"Potato": 1})
    }
}

class Corn extends Food{
    constructor(){
        super("Corn", "Corn 🌽🌽🌽.", 10, 10, 10, 5)
    }
}

class CookedCorn extends Food{
    constructor(){
        super("Cooked corn", "Reminds you of your child years. It was a great time, isn't it?", 25, 5, 15, 12, {"Corn": 1})
    }
}

class Apple extends Food{
    constructor(){
        super("Apple", "Apple a day keeps doctor away!", 10, 8, 15, 10)
    }
}

class Bread extends Food{
    constructor(){
        super("Bread", "i love eating bread in middle of fight", 25, -2, 30, 20)
    }
}

class Borsch extends Food{
    constructor(){
        super("Borsch", "Not even enemy can distract you from eating borsch.", 65, 45, 65, 80, {"Potato": 2, "Tomato": 1, "Raw meat": 1, "Water": 2})
    }
}

// Specialized heal items

class Iodine extends Consumable{
    constructor(){
        super("Iodine", "Its not a beatiful wound you got there, lets make it even uglier!.. and healthier.", 15, false, 15)
    }
}

class Bandage extends Consumable{
    constructor(){
        super("Bandage", "A piece of fabric, made for closing wounds. Cheap and pretty good.", 20, false, 8)
    }
}

class SoakedBandage extends Consumable{
    constructor(){
        super("Soaked Bandage", "A piece of fabric soaked with iodine. Not really cheap, but effective.", 40, false, 30)
    }
}

class MedKit extends Consumable{
    constructor(){
        super("Medical Kit", "Pair of bandages and basic tools. Good to fix your head.", 60, false, 40)
    }
}

class AdvMedKit extends Consumable{
    constructor(){
        super("Advanced Medical Kit", "Specialized set of chemically processed tools with various things to fix you up.", 120, true, 100)
    }
}

class NeutroHeal extends Consumable{
    constructor(){
        super("NeutroHeal", '<i>Advanced healing gel - restructurizes into your cells if they are damaged...</i><br>Nah, just use it and see what happens!', 160, 0, 100)
    }
}