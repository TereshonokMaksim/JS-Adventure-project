class RifleRounds extends Ammo {
    constructor(){
        super("Rifle rounds", "Usual rifle rounds, fits on any usual rifle.", 3, 8)
    }
}

class PistolRounds extends Ammo {
    constructor(){
        super("Pistol rounds", "Usual pistol rounds, fits on any pistol.", 2, 4)
    }
}

class HeavyRifleRounds extends Ammo {
    constructor(){
        super("Heavy Rifle rounds", "Big and heavy rounds for big and heavy guns.", 5, 16)
    }
}

class Rockets extends Ammo{
    constructor(){
        super("Rockets", "Rockets for rocket launcher. Heavy artillery.", 20, 50)
    }
}

class SuperChargedBatteries extends Ammo{
    constructor(){
        super("Super charged batteries", "It looks like it has more amps than guy in math book in task about watermelons.", 4, 20)
    }
}