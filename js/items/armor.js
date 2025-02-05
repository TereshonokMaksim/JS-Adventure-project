class UsualClothes extends Armor{
    constructor(){
        super("Usual clothes", "Nothing special, just clothes. What did you expect?", 6, 15, 35, 80)
    }
}

class ReinforcedClothes extends Armor{
    constructor(){
        super("Reinforced clothes", "Has something solid in it. Is it iron sheets?", 10, 30, 35, 160)
    }
}

class SoldierArmor extends Armor{
    constructor(){
        super("Soldier armor", "Armor helmet, weak vest... quality is not the best too...", 12, 40, 38, 240)
    }
}

class QualitySoldierArmor extends Armor{
    constructor(){
        super("Quality soldier armor", "Titanium armor helmet, bulletproof vest... Nice actually!", 18, 60, 50, 500)
    }
}

class SpecialForcesArmor extends Armor{
    constructor(){
        super("Special forces armor (SFA)", "Kevlar helmet, special mask, titanium sheets in your pants and vest? You never knew that such exists!", 24, 70, 70, 900)
    }
}