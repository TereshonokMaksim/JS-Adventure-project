class Item{
    constructor(name, description = "No description", price = -1, obtainable = true){
        this.name = name
        this.description = description
        this.price = price
        this.obtainable = obtainable
    }
}

class Armor extends Item{
    constructor(name, description = "No description", maxDamageNeglected = 0, sharpChanceNeglected = 0, bluntChanceNeglected = 0, price = -1){
        super(name, description, price)
        this.maxDamageNeglected = maxDamageNeglected
        this.sharpChanceNeglected = sharpChanceNeglected
        this.bluntChanceNeglected = bluntChanceNeglected
    }
    reduceSharpHit(strength, hitAccuracy = 100) {
        let neglectChance = this.sharpChanceNeglected - hitAccuracy / 2
        let random = Math.floor(Math.random() * 100)
        let result = strength
        if (random < neglectChance * 2) {
            result = strength - maxDamageNeglected
        }
        else if (random < neglectChance * 4) {
            result = strength - maxDamageNeglected / 2
        }
        if (result < 0){
            result = 0
        }
        return result
    }
    reduceBluntHit(strength, hitAccuracy = 100) {
        let neglectChance = this.bluntChanceNeglected - hitAccuracy / 2
        let random = Math.floor(Math.random() * 100)
        let result = strength
        if (random < neglectChance * 2) {
            result = strength - maxDamageNeglected
        }
        else if (random < neglectChance * 4) {
            result = strength - maxDamageNeglected / 2
        }
        if (result < 0){
            result = 0
        }
        return result
    }
}

class MeleeWeapon extends Item{
    constructor(name, description = "No description", damage = 10, typeOfDamage = 0, basicAccuracy = 14, price = -1){
        if (price == -1){
            price = damage * basicAccuracy / 50
        }
        super(name, description, price)
        this.damage = damage
        this.typeOfDamage = typeOfDamage
        this.basicAccuracy = basicAccuracy
    }

    weakHit(additionalAccuracy = 0, additionalDamage = 0, target, bodyPartNum){
        target.hurt(this.damage * 0.8 + additionalDamage, this.typeOfDamage, this.basicAccuracy + additionalAccuracy, bodyPartNum)
    }

    strongHit(additionalAccuracy = 0, additionalDamage = 0, target, bodyPartNum){
        target.hurt(this.damage * 1.2 + additionalDamage, this.typeOfDamage, this.basicAccuracy + additionalAccuracy, bodyPartNum)
    }

    massHit(additionalAccuracy = 0, additionalDamage = 0, target, bodyPartNum){
        let hittedParts = [bodyPartNum]
        let randomNum = Math.floor(Math.random() * 100)
        if (bodyPartNum == 0){
            hittedParts.push(1)
            if (random < 50){
                hittedParts.push(2)
            }
        }
        else if (bodyPartNum == 1){
            if (randomNum < 40){
                hittedParts.push(0)
            }
            if (randomNum < 80){
                hittedParts.push(2)
            }
            else{
                hittedParts.push(3)
            }
        }
        else if (bodyPartNum == 2){
            hittedParts.push(1)
            if (randomNum < 30){
                hittedParts.push(0)
            }
        }
        else if (bodyPartNum == 3){
            hittedParts.push(1)
            if (randomNum < 16){
                hittedParts.push(2)
            }
        }
        for (let hittedPart of hittedParts){
            target.hurt(this.damage * 0.55 + additionalDamage, this.typeOfDamage, this.basicAccuracy + additionalAccuracy, hittedPart)
        }
    }

    
}


class Ammo extends Item{
    constructor(name, description = "No description", damageBonus = 1, price = -1){
        if (price == -1){
            price = damageBonus * 3
        }
        super(name, description, price)
        this.damageBonus = damageBonus
    }
}


class RangedWeapon extends Item{
    constructor(name, description = "No description", baseDamage = 5, baseAccuracy = 10, allowedAmmo = [Ammo], meleeDamage = 3, longRanged = false, limitedRange = -1, shotsInRow = 1, price = -1, chanceToMiss = 0){
        // accuracy of ranged weapon falls with distance if longRanged = false, otherwise accuracy will slightly drop with decreasing distance
        // if limitedRange != -1, then this weapon can't shoot if target farther than this maount of cells
        // shotsInRow defines burst fire - how much shots should happen in 1 attack

        if (price == -1){
            price = baseDamage * baseAccuracy 
        }
        super(name, description, price)
        this.damage = baseDamage
        this.typeOfDamage = 0
        this.basicAccuracy = baseAccuracy
        this.allowedAmmo = allowedAmmo
        this.meleeWeapon = new MeleeWeapon("Butt of a firearm", "Not effective, but better than air", meleeDamage, 1, 36, 0)
        this.longRanged = longRanged
        this.limitedRange = limitedRange
        this.shotsInRow = shotsInRow
        this.chanceToMiss = chanceToMiss
    }
    shoot(additionalAccuracy = 0, ammo, target, distanceToTarget, functionBetweenShots = 0, bodyPartNum = 1, burstShotChange = 0, damageChange = 0, chanceToMiss = 0){
        // Shoots this weapon in a specified target
        // functionBetweenShots defines function, that will execute each shot
        // console.log(this.allowedAmmo, typeof ammo)
        let allowed = false
        for (let classToCheck of this.allowedAmmo) {
            if (ammo instanceof classToCheck){
                allowed = true
            }
        }
        if (allowed){
            let accuracy = self.hitAccuracy + additionalAccuracy
            if (this.longRanged){
                if (distanceToTarget < 5){
                    accuracy *= distanceToTarget / 5
                }
                else{
                    accuracy *= 1 + (distanceToTarget - 5) / 10
                }
            }
            else{
                if (distanceToTarget < 5){
                    accuracy *= 1 + (5 - distanceToTarget) / 5
                }
                else{
                    accuracy *= 1 - distanceToTarget / 15
                }
            }
            // for (let shotNumber = 0; shotNumber < this.shotsInRow; shotNumber++){
            let shotsInRow = this.shotsInRow
            if (burstShotChange != 0){
                shotsInRow = burstShotChange
            } 
            this.makeAShot(target, this.damage + ammo.damageBonus + damageChange, accuracy, bodyPartNum, shotsInRow - 1, functionBetweenShots, chanceToMiss)
                // await new Promise(resolve => setTimeout(resolve, ms))
            // }
            return 1
        }
        else{
            return 0
        }
    }
    makeAShot(target, damage, accuracy, bodyPartNum, shotsLeft, functionBetweenShots = 0, chanceToMiss = 0){
        let randomNum = Math.floor(Math.random() * 100)
        console.log(`Chance to hit ${randomNum}/${100 - chanceToMiss}`)
        if (randomNum <= 100 - chanceToMiss - this.chanceToMiss){
            target.hurt(damage, this.typeOfDamage, accuracy, bodyPartNum)
        }
        if (functionBetweenShots != 0){
            functionBetweenShots()
        }
        if (shotsLeft > 0){
            // console.log(`I need to shoot only ${shotsLeft} times more`)
            setTimeout(() => {this.makeAShot(target, damage, accuracy, bodyPartNum, shotsLeft - 1, functionBetweenShots, chanceToMiss)}, 100)
        }

    }
}

class Money extends Item{
    constructor(){
        super("Money", "Usual money. Their value was increased since the event.", 1)
    }
}

class Consumable extends Item{
    constructor(name, description = "No description", healAmount = 50, healsEverything = false, price = 0){
        super(name, description, price)
        this.healAmount = healAmount
        this.healsEverything = healsEverything
    }
    consume(target, bodyPartNum = -1, useFromInventory = false){
        // Anybody can heal themselves with Consumable
        let bodyPart = bodyPartNum
        if (this.healsEverything){
            bodyPart = -1
        }
        target.hp.heal(this.healAmount, bodyPart)
        if (useFromInventory){
            if (target instanceof Player){
                target.takeItem(this.name, 1)
            }
            else{
                target.drop[this.name]--
                if (target.drop[this.name] <= 0){
                    delete target.drop[this.name]
                }
            }
        }
    }
}

class Food extends Consumable{
    constructor(name, description = "No description", healAmount = 10, thirstQuench = 20, hungerQuench = 20, price = 50, ingridients = {}){
        // ingridients should be like in player' inventory (like {"Apple": 1})
        super(name, description, healAmount, true, price)
        this.thirstQuench = thirstQuench
        this.hungerQuench = hungerQuench
        this.ingridients = ingridients
    }
    eat(){
        // Only player can eat food
        player.hunger -= this.hungerQuench / 100
        player.thirst -= this.thirstQuench / 100
        passTime(this.hungerQuench + this.thirstQuench / 4)
        if (player.hunger < 0){
            player.hp.heal((0 - player.hunger) * 20, -1)
            player.hunger = 0
        }
        if (player.thirst < 0){
            player.thirst = 0
        }
    }
    checkRecipe(){
        // Checks if this food can be cooked using items in player' inventory
        for (let ingridient of this.ingridients){
            if (!(player.inventory[ingridient] >= this.ingridients[ingridient])){
                return false
            }
        }
        if (Object.keys(this.ingridients).length == 0){
            return false
        }
        return true
    }
    cook(){
        // let player cook 🔥🔥🔥
    }
}