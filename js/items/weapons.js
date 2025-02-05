class Pistol extends RangedWeapon{
    constructor(){
        super("Pistol", "Looks like some from fort series. Still good for simple task - neutralize target.", 12, 30, [PistolRounds], 3, false, -1, 1, 120, 5)
    }
}

class AdvancedPistol extends RangedWeapon{
    constructor(){
        super("Advanced Pistol", "This thing got auto reload and laser aim, so its easier for you to handle it. Unlike Advanced Rifle, doesnt need heavy rounds.", 20, 55, [PistolRounds], 5, false, -1, 1, 350, 10)
    }
}

class SemiRifle extends RangedWeapon{
    constructor(){
        super("Semi Automatic Rifle", "Were popular back in days, old classic.", 12, 45, [RifleRounds], 2, true, -1, 1, 300, -5)
    }
}

class AutoRifle extends RangedWeapon{
    constructor(){
        super("Automatic Rifle", "Bad new rifle, straight out from 21 century!", 8, 42, [RifleRounds], 3, true, -1, 3, 500, 0)
    }
}

class SniperRifle extends RangedWeapon{
    constructor(){
        super("Sniper Rifle", 'Long distance powerful gun that requires quite expensive bullets. Quite bulky in close range', 18, 60, [HeavyRifleRounds], 1, true, -1, 1, 800, -10)
    }
}

class AdvancedRifle extends RangedWeapon{
    constructor(){
        super("Advanced Rifle", 'This looks like the new invention on military base, except it is in your hands. Just hope that it won`t disassemble itself.', 12, 34, [HeavyRifleRounds], 4, true, -1, 3, 1200, 0)
    }
}

class RocketLauncher extends RangedWeapon{
    constructor(){
        super("Rocket Launcher", "Now THIS is heavy artillery, yeah, soldier?", 40, 40, [Rockets], 6, true, -1, 1, 1100, -5)
    }
}

class AcidSynthesizer extends RangedWeapon{
    constructor(){
        super("Acid synthesizer", "Synthesizes acid from thin air! Quite big, as you could expect.", 36, 36, [SuperChargedBatteries], 10, false, 10, 1, 2000, 15)
    }
}

class Minigun extends RangedWeapon{
    constructor(){
        super("Minigun", "It is so tiny, that you cant see it! Oh wait...", 12, 30, [RifleRounds], 10, false, -1, 10, 1550, 30)
    }
}

class Fists extends MeleeWeapon{
    constructor(){
        super("Fists", "i would recommend to find a better weapon", 5, 1, 60, 0)
    }
}

class Knife extends MeleeWeapon{
    constructor(){
        super("Knife", "This knife is combat one, so be careful while doing tricks with it in your hands.", 15, 0, 45, 120)
    }
}

class Shovel extends MeleeWeapon{
    constructor(){
        super("Shovel", "What do you think when you see this? Stun.", 20, 1, 30, 180)
    }
}

class Mace extends MeleeWeapon{
    constructor(){
        super("Mace", "Quite old-fashioned, but still quite useful, especially if enemy doesn't have armor.", 20, 1, 40, 160)
    }
}

class Sword extends MeleeWeapon{
    constructor(){
        super("Sword", "Quite bulky, but much better than some little knife! No, like, it's really bigger, you need an entire scabard.", 34, 0, 50, 290)
    }
}

class NeutroKnife extends MeleeWeapon{
    constructor(){
        super("Neutral knife", "Neutral to anything knife. Its very hard for you to hold it in your hands.\nWait a minute, that's dev weapon, how you got it???", 18, 0, 32, 150)
        this.obtainable = false
    }
}