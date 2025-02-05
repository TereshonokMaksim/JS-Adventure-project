class Health {
    constructor(overallHp = 100, head = 50, body = 70, legs = 60, hands = 60) {
        // Overall HP if lexxer than sum of all parts by two because it has no sense other way
        this.working = 100
        this.walking = 100
        this.consciousness = 100
        this.overallPain = 0
        // 3, 4, 5, 6 lines are in percents
        this.ignorePain = 0
        this.alive = 1
        this.state = "Normal"
        // Primarly descriptive
        if (overallHp != 0) {
            this.overallHp = overallHp
            this.head = overallHp * 0.5
            this.body = overallHp * 0.7
            this.hands = overallHp * 0.6
            this.legs = overallHp * 0.6
        }
        else{
            this.overallHp = (head + body + legs + hands) / 2
            this.head = head
            this.body = body
            this.hands = hands
            this.legs = legs
        }
        this.MAX_OVERALL_HP = this.overallHp
        this.MAX_HEAD = this.head
        this.MAX_BODY = this.body
        this.MAX_HANDS = this.hands
        this.MAX_LEGS = this.legs
    }
    stateAnalysis() {
        if (this.alive){
            if (this.overallPain < 15){
                this.state = "Normal"
            }
            else if (this.overallPain < 50) {
                this.state = "Feels pain"
            }
            else if (this.overallPain < 85) {
                this.state = "Feels strong pain"
            }
            if (this.walking == 0) {
                this.state = "Unable to walk"
            }
            if (this.working == 0) {
                this.state = "Unable to work"
            }
            if (this.consciousness == 0) {
                this.state = "Unconsciousness"
            }
            if (85 < this.overallPain) {
                this.state = "In pain shock"
            }
        }
        else {
            this.state = "Dead"
        }
    }
    analysis() {
        // Adjustes working, walking and overallPain variables corresponding to the damage of the parts
        this.overallHp = (this.head * 2 + this.body * 1.35 + this.hands * 0.8 + this.legs) / 3
        if (this.overallHp > this.MAX_OVERALL_HP){
            this.overallHp = this.MAX_OVERALL_HP
        }
        if (this.head <= 0 || this.body <= 0 || this.overallHp <= 0){
            this.alive = 0
        }
        if (this.alive){
            this.overallPain = Math.round((this.MAX_HEAD / this.head) * 1 + (this.MAX_BODY / this.body) * 1.25 + (this.MAX_HANDS / this.hands) * 0.35 + (this.MAX_LEGS / this.legs) * 0.8)
            if (!this.ignorePain){
                if (this.overallPain > 100) {
                    this.overallPain = 100
                }
                if (this.overallPain < 15) {
                    this.consciousness = 100 * this.head / this.MAX_HEAD
                }
                else if (this.overallPain < 50){
                    this.consciousness = 80 - (this.overallPain - 15) / 4 * this.head / this.MAX_HEAD
                }
                else if (this.overallPain < 85){
                    this.consciousness = 65 - (this.overallPain - 55) / 3.6 * this.head / this.MAX_HEAD
                }
                else {
                    this.consciousness = 0
                }
            }
            else{
                this.consciousness = 100 * this.head / this.MAX_HEAD
            }
            this.consciousness = Math.round(this.consciousness)
            this.working = Math.round(this.hands / this.MAX_HANDS * 100 * this.consciousness / 100)
            this.walking = Math.round(this.legs / this.MAX_LEGS * 100 * this.consciousness / 100)
        }
        else {
            this.consciousness = 0
            this.overallPain = 0
            this.overallHp = 0
            this.working = 0
            this.walking = 0
        }
        this.stateAnalysis()
    }
    kill(){
        this.alive = 0
        this.analysis()
    }
    ressurect(){
        // Ressurects this LiveObject and every part
        this.overallHp = this.MAX_OVERALL_HP
        this.head = this.MAX_HEAD
        this.body = this.MAX_BODY
        this.hands = this.MAX_HANDS
        this.legs = this.MAX_LEGS
        this.alive = 1
        this.analysis()
    }
    hit(strength, bodyPart = 1){
        this.overallHp -= Math.floor(strength / 2)
        if (bodyPart == 0){
            this.head -= Math.floor(strength)
            if (this.head <= 0){
                this.head = 0
            } 
        }
        else if (bodyPart == 1){
            this.body -= Math.floor(strength)
            if (this.body <= 0){
                this.body = 0
            } 
        }
        else if (bodyPart == 2){
            this.hands -= Math.floor(strength)
            if (this.hands < 0){
                this.hands = 0
            } 
        }
        else if (bodyPart == 3){
            this.legs -= Math.floor(strength)
            if (this.legs < 0){
                this.legs = 0
            } 
        }
        this.analysis()

    }
    bluntHit(strength, bodyPart = 1){
        /*
            Numbers of bodyparts
                0 - head
                1 - body
                2 - hands
                3 - legs
        */
        let random = Math.floor(Math.random() * 100)
        if (bodyPart == 0){
            // Chance of hitting body is 40%
            if (random < 40){
                this.hit(strength * (1.15 - random / 100), 0)
                this.hit(strength * random / 100 * 100, 1)
            }
            else{
                this.hit(strength * 0.95, 0)
            }
        } 
        else if (bodyPart == 1){
            // Chance of hitting head is 20%
            if (random < 20){
               this.hit(strength * random / 100 * 2, 0)
               this.hit(strength * (1 - random / 100), 1)
            }
            // Chance of hitting hands is 15%
            else if (random < 35){
                this.hit(strength * random / 100 * 2, 2)
                this.hit(strength * (1 - random / 100), 1)
            }
            // Chance of hitting legs is 10%
            else if (random < 45){
                this.hit(strength * random / 100 * 2, 3)
                this.hit(strength * (1 - random / 100), 1)
            }
            else{
                this.hit(strength * 0.95, 1)
            }
        }
        else if (bodyPart == 2){
            // Chance of hitting hands is 55%
            if (random < 55){
                this.hit(strength * random / 100 * 2, 1)
                this.hit(strength * (1 - random / 100), 2)
            }
            else{
                this.hit(strength * 0.95, 2)
            }
        } 
        else if (bodyPart == 3){
            // Chance of hitting body is 30%
            if (random < 30){
                this.hit(strength * random / 100 * 2, 1)
                this.hit(strength * (1 - random / 100), 3)
            }
            else{
                this.hit(strength * 0.95, 3)
            }
        } 
    }

    sharpHit(strength, bodyPart = 1){
        this.hit(strength, bodyPart)
    }

    hurtRandomPart(strength = 10) {
        // Hurts random part of this hp
        // dev only
        let randomNum = Math.floor(Math.random() * 4)
        this.sharpHit(strength, randomNum)
    }

    heal(healAmount = 10, bodyPartNum = -1){
        // Heals this health. If bodyPartNum it will heal all parts of health
        if (bodyPartNum == -1){
            let partsToHeal = Number(this.head != this.MAX_HEAD) + Number(this.body != this.MAX_BODY) + Number(this.hands != this.MAX_HANDS) + Number(this.legs != this.MAX_LEGS)
            if (partsToHeal == 0){
                this.overallHp -= healAmount / 2
            } 
            healAmount = healAmount / partsToHeal
            console.log(partsToHeal, healAmount)
            if (this.head != this.MAX_HEAD){
                this.head += healAmount
                if (this.head > this.MAX_HEAD){
                    partsToHeal--
                    healAmount -= (this.MAX_HEAD - this.head) / partsToHeal
                    this.head = this.MAX_HEAD
                }
            }
            if (this.body != this.MAX_BODY){
                this.body += healAmount
                if (this.body > this.MAX_BODY){
                    partsToHeal--
                    healAmount -= (this.MAX_BODY - this.body) / partsToHeal
                    this.body = this.MAX_BODY
                }
            }
            if (this.hands != this.MAX_HANDS){
                this.hands += healAmount
                if (this.hands > this.MAX_HANDS){
                    partsToHeal--
                    healAmount -= (this.MAX_HANDS - this.hands) / partsToHeal
                    this.hands = this.MAX_HANDS
                }
            }
            if (this.legs != this.MAX_LEGS){
                this.legs += healAmount
                if (this.legs > this.MAX_LEGS){
                    partsToHeal--
                    healAmount -= (this.MAX_LEGS - this.legs) / partsToHeal
                    this.legs = this.MAX_LEGS
                }
            }
        }
        else if (bodyPartNum == 0){
            this.head += healAmount
            if (this.head > this.MAX_HEAD){
                console.log("More head than allowed", this.MAX_HEAD)
                this.head = this.MAX_HEAD
                if (this.head > this.MAX_HEAD){
                    this.head = this.MAX_HEAD
                }
            }
        }
        else if (bodyPartNum == 1){
            this.body += healAmount
            if (this.body > this.MAX_BODY){
                this.body = this.MAX_BODY
                if (this.hands > this.MAX_BODY){
                    this.hands = this.MAX_BODY
                }
            }
        }
        else if (bodyPartNum == 2){
            this.hands += healAmount
            if (this.hands > this.MAX_HANDS){
                this.hands = this.MAX_HANDS
                if (this.hands > this.MAX_HANDS){
                    this.hands = this.MAX_HANDS
                }
            }
        }
        else if (bodyPartNum == 3){
            this.legs += healAmount
            if (this.legs > this.MAX_LEGS){
                this.legs = this.MAX_LEGS
                if (this.legs > this.MAX_LEGS){
                    this.legs = this.MAX_LEGS
                }
            }
        }
        this.analysis()
    }
}