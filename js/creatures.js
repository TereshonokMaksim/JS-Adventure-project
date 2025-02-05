
class LiveObject{
    constructor(name, aggresivity = 0, strength = 5, hp = new Health(100), weapon = new Fists(), armor = new Armor("none", "Naked and afraid", 0, 0, 0), description = "No description", drop = {}, combatSkills = 40){
        /*
            aggresivity -1 means that this creature would be completely friendly, and will run in case of player's attack
            aggresivity 0 means that this creature will not attack the player, unless he will attack this creature
            aggresivity 1 means that this creature will attack player in any case
            combatSkills affects on accuracy of weapons. It should be between 0 and 50
        */
        this.name = name
        this.aggresivity = aggresivity
        this.strength = strength
        this.hp = hp
        this.weapon = weapon
        this.armor = armor
        this.description = description
        this.drop = drop
        this.combatSkills = combatSkills
        this.botFunction = 0
        this.whatAttackFunction = 0
    }
    hurt(damage = 0, typeOfDamage = 0, hitAccuracy = 0, bodyPartNum = 0){
        /*
            typeOfDamage can be in 2 types:
                0 - Sharp type
                1 - Blunt type
            bodyPartNum can be 4 different values and defines where hit was made:
                0 - Head
                1 - Body
                2 - Hands
                3 - Legs
        */
        if (typeOfDamage == 0){
            damage = this.armor.reduceSharpHit(damage, hitAccuracy)
            this.hp.sharpHit(damage, bodyPartNum)
        }
        else{
            damage = this.armor.reduceBluntHit(damage, hitAccuracy)
            this.hp.bluntHit(damage, bodyPartNum)
        }
    }
    attack(target, distanceToTarget, bodyPartNum, targetDamageReduction){
        if (this.weapon instanceof RangedWeapon){
            if (this.weapon.longRanged){
                if (distanceToTarget < 5){
                    return this.move(999, -1)
                }}
            else if (!this.weapon.longRanged){
            // console.log("hih")
                if (distanceToTarget > 5){
                    console.log("im going for you")
                    return this.move(distanceToTarget, 1)
                }
            }
            this.weapon.shoot((this.combatSkills - 10) * 2, new this.weapon.allowedAmmo[0](), target, distanceToTarget, () => {activatePulse([255, 255, 200], 0.1, 5)}, bodyPartNum, 0, (100 - targetDamageReduction) / 100, [50, 0, 15, 15][bodyPartNum])
            return "attackRanged"
        }
        
        else if (this.weapon instanceof MeleeWeapon){
            if (distanceToTarget > 2){
                return this.move(distanceToTarget, 1)
            }
            let randomNum = Math.floor(Math.random() * 100)
            if (randomNum < 35){
                this.weapon.weakHit((this.combatSkills - 5) * 2 * (100 - targetDamageReduction) / 100, this.combatSkills / 10, target, bodyPartNum)
            }
            else{
                this.weapon.strongHit((this.combatSkills - 5) * 2 * (100 - targetDamageReduction) / 100, this.combatSkills / 10, target, bodyPartNum)
            }
            return "attackMelee"
        }
        else{
            let result = "moveTo"
            if (distanceToTarget < 8){
                result = this.move(999, -1)
            }
            else{
                result = this.tryToFlee(target)
            }
            return `attackFail ${result}`
        }
    }
    chooseWhatAttack(target){
        return this.whatAttackFunction(target)
    }
    move(howMuch, where){
        // where - 1 if to player, -1 if from player
        let maxDistance = 3 * this.hp.walking / 100
        if (howMuch > maxDistance){
            howMuch = maxDistance
        }
        playerDistance -= howMuch * where
        if (where == 1){
            return "moveTo"
        }
        else if (where == -1){
            return "moveOut"
        }
    }
    tryToFlee(target){
        let targetModifier = target.hp.walking / 200
        let chanceOfEscape = (playerDistance - 5) * this.hp.walking / 100 * targetModifier * 20
        if (chanceOfEscape < 0){
            chanceOfEscape = 0
        }
        else if (chanceOfEscape > 100){
            chanceOfEscape = 100
        } 
        let randomNum = Math.floor(Math.random() * 100)
        if (randomNum < chanceOfEscape){
            return "flee"
        }
        else {
            return "failFlee"
        }
    }
    bot(targetDamageReduction){
        // Decides, what this creature should do in fight with player
        return this.botFunction(targetDamageReduction)
    }
}