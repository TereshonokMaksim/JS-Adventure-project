class WolfClaw extends MeleeWeapon{
    constructor(){
        super("Wolf claw", "Scared many, and still, on its duty to mercilessly kill you.", 18, 0, 60, 0)
        this.obtainable = false
    }
}

class BearClaw extends MeleeWeapon{
    constructor(){
        super("Bear claw", "Same as Wolf claw, but even worse.... For you, not for bear.", 26, 1, 70, 0)
        this.obtainable = false
    }
}

class PigeonClaw extends MeleeWeapon{
    constructor(){
        super("Pigeon claw", "Same as Wol... wait, pigeons dont have claws, what is this.", 20, 0, 50, 0)
        this.obtainable = false
    }
}

class LaserTurret extends RangedWeapon{
    constructor(){
        super("Auto laser turret", "Before the event, we fought using rifles, now laser turrets??", 12, 80, [SuperChargedBatteries], 0, false, -1, 1, 0, -5)
        this.obtainable = false
    }
}

class LaserTurretHeavy extends RangedWeapon{
    constructor(){
        super("Heavy auto laser turret (HALT)", "It will halt you for sure. Maybe... Idk.", 16, 70, [SuperChargedBatteries], 0, true, -1, 3, 0, 5)
        this.obtainable = false
    }
}

class IonDisintegrator extends RangedWeapon{
    constructor(){
        super("Ion disintegrator", "Dont get close to it, it even ionizes air around it!", 50, 40, [SuperChargedBatteries], 80, true, -1, 1, 0, 10)
        this.obtainable = false
    }
}