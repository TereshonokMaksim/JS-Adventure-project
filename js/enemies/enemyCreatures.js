class Wolf extends LiveObject{
    constructor(){
        super("Wolf", 1, 10, new Health(100), new WolfClaw(), new AnimalSkin(), "Usual wolf - nightmare of your dreams - now became true.", {"Animal skin": [100, 1, 1], "Raw meat": [100, 2, 5]}, 20)
        this.botFunction = (targetDamageReduction) => {return aliveBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackAnimal(this, target)}
    }
}

class Bear extends LiveObject{
    constructor(){
        super("Bear", 1, 20, new Health(220), new BearClaw(), new ThickAnimalSkin(), "Big bets you making here - a lot of skin and meat... Homever, i dont know yours or his.", {"Thick animal skin": [100, 1, 1], "Raw meat": [100, 6, 10]}, 27)
        this.botFunction = (targetDamageReduction) => {return aliveBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackAnimal(this, target)}
    }
}

class Soldier extends LiveObject{
    constructor(){
        super("Soldier", 0, 10, new Health(120), new SemiRifle(), new SoldierArmor(), "He doesnt look like a good guy, does he?", {"Soldier armor": [10, 1, 1], "Semi Automatic Rifle": [7, 1, 1], "Rifle rounds": [75, 5, 18], "Money": [60, 10, 40]}, 15)
        this.botFunction = (targetDamageReduction) => {return aliveBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackHuman(this, target)}
    }
}

class VeteranSoldier extends LiveObject{
    constructor(){
        super("Veteran soldier", 0, 15, new Health(140), new SemiRifle(), new SoldierArmor(), "He is more serious than any other guy...", {"Soldier armor": [18, 1, 1], "Semi Automatic Rifle": [15, 1, 1], "Rifle rounds": [75, 10, 24], "Money": [100, 20, 100]}, 28)
        this.botFunction = (targetDamageReduction) => {return aliveBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackHuman(this, target)}
    }
}

class ModernSoldier extends LiveObject{
    constructor(){
        super("Modern soldier", 0, 10, new Health(140), new AutoRifle(), new QualitySoldierArmor(), "Is he 20 years old? I thought there were only 30-40 years old man?", {"Quality soldier armor": [5, 1, 1], "Automatic Rifle": [8, 1, 1], "Rifle rounds": [100, 20, 40], "Money": [100, 30, 80]}, 18)
        this.botFunction = (targetDamageReduction) => {return aliveBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackHuman(this, target)}
    }
}

class SpecialSoldier extends LiveObject{
    constructor(){
        super("Special forces soldier (SFS)", 1, 20, new Health(155), new AdvancedRifle(), new SpecialForcesArmor(), "It looks like you haven't cleared your browse history.", {"Special forces armor (SFA)": [5, 1, 1], "Advanced Rifle": [9, 1, 1], "Heavy rifle rounds": [100, 25, 50], "Rifle rounds": [40, 20, 60], "Money": [100, 40, 120]}, 32)
        this.botFunction = (targetDamageReduction) => {return aliveBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackHuman(this, target)}
    }
}

class Sniper extends LiveObject{
    constructor(){
        super("Sniper", 1, 10, new Health(100), new SniperRifle(), new SoldierArmor(), '"As long as there are 2 people left on the planet - someone wants someone dead"', {"Sniper Rifle": [12, 1, 1], "Soldier armor": [20, 1, 1], "Heavy rifle rounds": [90, 10, 20], "Pistol": [5, 1, 1], "Money": [100, 50, 100]}, 36)
        this.botFunction = (targetDamageReduction) => {return aliveBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackHuman(this, target)}
    }
}

class LaserTower extends LiveObject{
    constructor(){
        super("Laser tower", 1, 10, new Health(290), new LaserTurret(), new TowerArmor(), "Who ever built this?!", {"Super charged batteries": [100, 50, 100]}, 30)
        this.botFunction = (targetDamageReduction) => {return turretBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackTurret(this, target)}
    }
}

class BigLaserTower extends LiveObject{
    constructor(){
        super("Big laser tower", 1, 18, new Health(450), new LaserTurretHeavy(), new TowerArmor, "Okay, what is this?! No, for real, i dont think we have technologies to build such things, and it stands right in front of you!", {"Super charged batteries": [100, 180, 300]}, 30)
        this.botFunction = (targetDamageReduction) => {return turretBot(this, targetDamageReduction)}
        this.whatAttackFunction = (target) => {return chooseAttackTurret(this, target)}
    }
}