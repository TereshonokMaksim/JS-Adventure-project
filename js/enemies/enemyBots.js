function aliveBot(self, targetDamageReduction){
    console.log(self.hp, "wha")
    if (self.hp.alive){
        if (self.hp.overallPain > 60){
            if (playerDistance < 8){
                return self.move(999, -1)
            }
            else{
                return self.tryToFlee(player)
            }
        }
        return self.attack(player, playerDistance, self.chooseWhatAttack(player), targetDamageReduction)
    }
    else{
        return "dead"
    }

}

function turretBot(self, targetDamageReduction){
    if (self.hp.alive){
        return self.attack(player, playerDistance, self.chooseWhatAttack(player), targetDamageReduction)
    }
    else{
        return "dead"
    }
}

function chooseAttackAnimal(self, target){
    if (self.hp.overallPain > 70){
        return 3
    }
    return 1
}

function chooseAttackHuman(self, target){
    if (self.hp.overallPain > 60){
        return 3
    }
    if (target.weapon instanceof MeleeWeapon){
        if (target.hp.hands < 5){
            if (target.hp.legs < 5){
                return 1
            }
            return 3
        }
        return 2
    }
    if (target.hp.overallPain > 60){
        return 1
    }
    if (target.hp.walking < 30){
        if (target.hp.legs < 5){
            return 1
        }
        return 3
    }
    return 0
}

let previousDistance = 0

function chooseAttackTurret(self, target){
    if (previousDistance > playerDistance){
        return 1
    }
    else if (previousDistance < playerDistance){
        return 3
    }
    if (target.weapon instanceof MeleeWeapon){
        if (target.hp.hands == 0){
            if (target.hp.legs == 0){
                return 1
            }
            return 3
        }
        return 2
    }
    if (target.hp.overallPain > 60){
        return 1
    }
    if (target.hp.walking < 30){
        if (target.hp.legs == 0){
            return 1
        }
        return 3
    }
    return 0
}