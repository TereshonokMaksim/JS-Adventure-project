const standartFight = document.querySelector("#standartFightOptions")
const multiRanged = document.querySelector("#multiShotRangedOptions")
const singleRanged = document.querySelector("#oneShotRangedOptions")
const fist = document.querySelector("#fistAttackOptions")
const melee = document.querySelector("#meleeAttackOptions")
const bodyParts = document.querySelector("#bodyPartOptions")
const move = document.querySelector("#moveOptions")
const additional = document.querySelector("#additionalOptions")
const items = document.querySelector("#itemOptions")
const weapons = document.querySelector("#weaponsInventory")
const consumables = document.querySelector("#consumablesInventory")
const win = document.querySelector("#playerWin")
const lose = document.querySelector("#enemyWin")
const text = document.querySelector(".textInfo")
const tip = document.querySelector(".textTip")

const fightMenus = [standartFight, multiRanged, singleRanged, melee, bodyParts, move, additional, items, weapons, consumables, win, lose]
menus.push(...fightMenus)

const YOUR_FISTS = new Fists()
let fightInfoLabels = {"flee": "Your enemy escaped the battle!", 
                       "failedFlee": "Your enemy failed to escape the battle! \nTry to finish him as fast as you can!", 
                       "moveTo": "Your enemy comes to you.", 
                       "moveOut": "Your enemy goes from you.", 
                       "attackRanged": `Enemy shot you!`, 
                       "attackMelee": `Enemy hit you!`,
                       "attackFail moveTo": "Your enemy tried to hit you, but, it seems, that he has no weapon!\nHe starts running as he realizes it!",
                       "attackFail failedFlee": "Your enemy tried to hit you, but, it seems, that he has no weapon!\nHe starts fleeing as he realizes it!",
                       "attackFail flee": "Your enemy tried to attack you, but, instead he used it as distraction and fled!",
                       "dead": "You won by killing your enemy!"}
let playerDistance = 0
let burstSize = 0
let damageReduction = 0
// in percents
let attackFunction = 0
let current = standartFight
let previous = []

function updateYourData(){
    document.querySelector("#yourHeadHP").innerHTML = `Head - ${Math.round(player.hp.head)}/${player.hp.MAX_HEAD}`
    document.querySelector("#yourBodyHP").innerHTML = `Body - ${Math.round(player.hp.body)}/${player.hp.MAX_BODY}`
    document.querySelector("#yourHandsHP").innerHTML = `Hands - ${Math.round(player.hp.hands)}/${player.hp.MAX_HANDS}`
    document.querySelector("#yourLegsHP").innerHTML = `Legs - ${Math.round(player.hp.legs)}/${player.hp.MAX_LEGS}`
    document.querySelector("#yourConsciousness").innerHTML = `Consciousness - ${Math.round(player.hp.consciousness)}%`
    document.querySelector("#yourPain").innerHTML = `Pain - ${Math.round(player.hp.overallPain)}%`
    document.querySelector("#yourWalking").innerHTML = `Walking - ${Math.round(player.hp.walking)}%`
    document.querySelector("#yourWorking").innerHTML = `Working - ${Math.round(player.hp.working)}%`
}

function updateFightData(){
    if (player.currentEncounter != 0){
        document.querySelector(".fightData").style.display = "flex"
        let weaponName = "none"
        let armorName = "none"
        let bulletsName = "bullets"
        let bulletsCount = "0"
        if (player.weapon != 0){
            weaponName = player.weapon.name
        }
        if (player.armor.name != "none"){
            armorName = player.armor.name
        }
        if (player.currentAmmo instanceof Ammo){
            bulletsName = player.currentAmmo.name
            bulletsCount = player.inventory[player.currentAmmo.name]
        }
        document.querySelector("#currentWeapon").innerHTML = `Your weapon - ${weaponName}`
        document.querySelector("#currentArmor").innerHTML = `Your armor - ${armorName}`
        document.querySelector("#currentAmmo").innerHTML = `Ammunition left - ${bulletsCount} ${bulletsName}`
        document.querySelector("#distanceToEnemy").innerHTML = `Distance to the enemy - ${Math.round(playerDistance * 10)}m`
        let enemyWeapon = "none"
        let enemyArmor = "none"
        if (player.currentEncounter.weapon != 0){
            enemyWeapon = player.currentEncounter.weapon.name
        }
        if (player.currentEncounter.armor.name != "none"){
            enemyArmor = player.currentEncounter.armor.name
        }
        document.querySelector("#enemyWeapon").innerHTML = `Yours enemy weapon - ${enemyWeapon}`
        document.querySelector("#enemyArmor").innerHTML = `Yours enemy armor - ${enemyArmor}`
    }
    else{
        document.querySelector(".fightData").style.display = "none"
    }
}

// setInterval(updateFightData, 100)
// setInterval(updateYourData, 100)

function update(){
    for (let menu of menus){
        if (menu.style.display == "flex"){
            if (menu != current){
                previous.push(current)
                current = menu
                return
            }
        }
    }
}

function emptyWeapon(){
    document.querySelectorAll(".rangedHit").forEach((button) => {
        if (!button.classList.contains("inactiveButton")){
            button.classList.add("inactiveButton")
            button.innerHTML = `${button.innerHTML} (no ammo)`}
    })
}

function notEmptyWeapon(){
    document.querySelectorAll(".rangedHit").forEach((button) => {
        button.classList.remove("inactiveButton")
        button.innerHTML = button.innerHTML.split("(")[0]
    })
}

function farEnemy(){
    document.querySelectorAll(".meleeHit").forEach((button) => {
        if (!button.classList.contains("inactiveButton")){
            button.classList.add("inactiveButton")
            button.innerHTML = `${button.innerHTML} (target is too far)`
        }
    })
}
function closeEnemy(){
    document.querySelectorAll(".meleeHit").forEach((button) => {
        button.classList.remove("inactiveButton")
        button.innerHTML = button.innerHTML.split("(")[0]
    })
}

function updateWeaponInfo(){
    if (!Object.keys(player.inventory).includes(player.currentAmmo.name)){
        emptyWeapon()
    }
    else{
        notEmptyWeapon()
    }
    if (playerDistance > 2){
        farEnemy()
    }
    else{
        closeEnemy()
    }
}

function winFight(){
    let dropText = ``
    for (let dropItem of Object.keys(player.currentEncounter.drop)){
        let randomNum = Math.random() * 100
        if (randomNum < player.currentEncounter.drop[dropItem][0]){
            let amount = Math.round(Math.random() * (player.currentEncounter.drop[dropItem][2] - player.currentEncounter.drop[dropItem][1]) + player.currentEncounter.drop[dropItem][1])
            dropText += `${dropItem}: ${amount}<br>`
            player.addItem(dropItem, amount)
            player.currentEncounter.drop[dropItem] = 0
        }
    }
    tip.innerHTML = `You got:<br>${dropText}`
    current.style.display = "none"
    win.style.display = "flex"
    stopFight(true, "You won by killing your enemy!", dropText)

}
document.querySelector("#getBackWin").addEventListener("click", () => {
    for (let menu of previous){
        if (fightMenus.includes(current)){
            back()
            console.log("Backing up from", menu.id)
        }
    }
    document.querySelector("#playerWin").style.display = "none"
    text.innerHTML = preFightTexts[0]
    tip.innerHTML = preFightTexts[1]
    preFightTexts.splice(0, 2)
})

function enemyTurn(){
    let enemyAction = player.currentEncounter.bot(damageReduction)
    text.innerHTML = fightInfoLabels[enemyAction]
    console.log(enemyAction)
    if (enemyAction == "dead"){
        winFight()
    }
    let reason = checkAlive()
    if (reason != true){
        dieInFight(reason)
    }
}

document.querySelector("#attackOption").addEventListener("click", () => {
    standartFight.style.display = "none"
    updateWeaponInfo()
    // console.log(player.weapon instanceof RangedWeapon)
    if (player.weapon instanceof RangedWeapon){
        // console.log(player.weapon.shotsInRow)
        if (player.weapon.shotsInRow > 1){
            multiRanged.style.display = "flex"
        }
        else{
            singleRanged.style.display = "flex"
        }
    }
    else if (player.weapon instanceof MeleeWeapon){
        melee.style.display = "flex"
    }
    else {
        fist.style.display = "flex"
    }
    update()
})

document.querySelector("#moveOption").addEventListener("click", openMoveOptions)

document.querySelector("#itemOption").addEventListener("click", () => {
    items.style.display = "flex"
    standartFight.style.display = "none"
    update()
})

document.querySelector("#additionalOption").addEventListener("click", () => {
    additional.style.display = "flex"
    standartFight.style.display = "none"
    update()
})

function openMoveOptions(){
    standartFight.style.display = "none"
    move.style.display = "flex"
    update()
    let enemyModifier = 2 - player.currentEncounter.hp.walking * 0.015
    let chanceOfEscape = (playerDistance - 5) * player.hp.walking / 100 * enemyModifier * 20
    if (chanceOfEscape < 0){
        chanceOfEscape = 0
    }
    else if (chanceOfEscape > 100){
        chanceOfEscape = 100
    }
    let parryChance = player.hp.walking - player.currentEncounter.hp.walking / 2
    if (parryChance > 100){
        parryChance = 100
    }
    else if (parryChance < 0){
        parryChance = 0
    }
    document.querySelector("#fleeChance").innerHTML = Math.round(chanceOfEscape)
    document.querySelectorAll("#walkingDistance").forEach((span) => {span.innerHTML = 30 * player.hp.walking / 100})
    document.querySelector("#parryChance").innerHTML = parryChance
}
function choosedmoveOption(){
    enemyTurn()
    back()
}


// yo fight part quite big

function openBodyParts(enemy = true){
    let headHP = 0
    let bodyHP = 0
    let handsHP = 0
    let legsHP = 0
    if (enemy){
        headHP = `(${player.currentEncounter.hp.head}/${player.currentEncounter.hp.MAX_HEAD})`
        bodyHP = `(${player.currentEncounter.hp.body}/${player.currentEncounter.hp.MAX_BODY})`
        handsHP = `(${player.currentEncounter.hp.hands}/${player.currentEncounter.hp.MAX_HANDS})`
        legsHP = `(${player.currentEncounter.hp.legs}/${player.currentEncounter.hp.MAX_LEGS})`

        if (player.weapon instanceof RangedWeapon){
            headHP += " chance to miss: 50%"
            handsHP += " chance to miss: 15%"
            legsHP += " chance to miss: 15%"
        }
    }
    else{
        headHP = `(${player.hp.head}/${player.hp.MAX_HEAD})`
        bodyHP = `(${player.hp.body}/${player.hp.MAX_BODY})`
        handsHP = `(${player.hp.hands}/${player.hp.MAX_HANDS})`
        legsHP = `(${player.hp.legs}/${player.hp.MAX_LEGS})`

    }
    document.querySelector("#headBodyPart").innerHTML = `Head ${headHP}`
    document.querySelector("#bodyBodyPart").innerHTML = `Body ${bodyHP}`
    document.querySelector("#handsBodyPart").innerHTML = `Hands ${handsHP}`
    document.querySelector("#legsBodyPart").innerHTML = `Legs ${legsHP}`
    bodyParts.style.display = "flex"
    update()
}

function checkAlive(){
    // Checks if player still alive and can fight
    // If player cant fight, then it will return reason of lost
    if (player.hp.overallPain > 85){
        return "you fell in pain shock"
    }
    if (player.hp.alive == false){
        return "you died"
    }
    if (player.hp.walking == 0){
        return "you can't move"
    }
    return true
}

function dieInFight(reasonOfDeath){
    document.querySelector(".infoBoard").style.display = "none"
    document.querySelector(".actionBoard").style.borderRadius = "40px 40px 40px 40px"
    document.querySelector(".actionBoard").style.border = "5px solid black"
    stopFight(false, `Unfortunately, you have lost this battle to ${player.currentEncounter.name}.<br>Better luck next time!<br>You lost because ${reasonOfDeath}.`, "WHAT DO YOU MEAN WE LOST? WHAT. NOOO")
}

document.querySelector("#strongMeleeHit").addEventListener("click", () => {
    if (!document.querySelector("#strongMeleeHit").classList.contains("inactiveButton")){
        attackFunction = (bodyPartNum) => {player.weapon.strongHit(player.combatSkills * 1.5, player.combatSkills * 0.5 * player.hp.working / 100, player.currentEncounter, bodyPartNum)}
        melee.style.display = "none"
        burstSize = -1
        openBodyParts()
    }
})
document.querySelector("#massMeleeHit").addEventListener("click", () => {
    if (!document.querySelector("#massMeleeHit").classList.contains("inactiveButton")){
        attackFunction = (bodyPartNum) => {player.weapon.massHit((player.combatSkills - 5) * 2, (player.combatSkills - 5) * 0.5 * player.hp.working / 100, player.currentEncounter, bodyPartNum)}
        melee.style.display = "none"
        burstSize = -1
        openBodyParts()
    }
})
document.querySelector("#fistHit").addEventListener("click", () => {
    if (!document.querySelector("#fistMeleeHit").classList.contains("inactiveButton")){
        attackFunction = (bodyPartNum) => {YOUR_FISTS.strongHit((player.combatSkills - 5) * 2, (player.combatSkills - 5) * 0.5 * player.hp.working / 100, player.currentEncounter, bodyPartNum)}
        fist.style.display = "none"
        burstSize = -1
        openBodyParts()
    }
})
document.querySelector("#meleeRangedHit").addEventListener("click", () => {
    if (!document.querySelector("#meleeRangedHit").classList.contains("inactiveButton")){
        attackFunction = (bodyPartNum) => {player.weapon.meleeWeapon.strongHit((player.combatSkills - 5) * 2, (player.combatSkills - 5) * 0.5 * player.hp.working / 100, player.currentEncounter, bodyPartNum)}
        multiRanged.style.display = "none"
        singleRanged.style.display = "none"
        burstSize = -1
        openBodyParts()
    }
})
document.querySelector("#rapidFireHit").addEventListener("click", () => {
    if (!document.querySelector("#rapidFireHit").classList.contains("inactiveButton")){
        burstSize = Math.floor(player.weapon.shotsInRow * 1.5)
        if (burstSize > player.inventory[player.currentAmmo.name]){
            burstSize = player.inventory[player.currentAmmo.name]
        }
        attackFunction = (bodyPartNum, chanceToMiss = 0) => {player.weapon.shoot((player.combatSkills - 10) * 2 - 10, player.currentAmmo, player.currentEncounter, playerDistance, () => {activatePulse([255, 255, 200], 0.1, 5)}, bodyPartNum, burstSize, 0, chanceToMiss + 10)}
        multiRanged.style.display = "none"
        openBodyParts()
    }
})
document.querySelector("#burstFireHit").addEventListener("click", () => {
    if (!document.querySelector("#burstFireHit").classList.contains("inactiveButton")){
        burstSize = player.weapon.shotsInRow
        if (burstSize > player.inventory[player.currentAmmo.name]){
            burstSize = player.inventory[player.currentAmmo.name]
        }
        attackFunction = (bodyPartNum, chanceToMiss = 0) => {player.weapon.shoot((player.combatSkills - 10) * 2, player.currentAmmo, player.currentEncounter, playerDistance, () => {activatePulse([255, 255, 200], 0.1, 5)}, bodyPartNum, burstSize, 0, chanceToMiss)}
        multiRanged.style.display = "none"
        openBodyParts()
    }
})
document.querySelectorAll("#preciseFireHit").forEach((button) => {button.addEventListener("click", () => {
    if (!button.classList.contains("inactiveButton")){
        attackFunction = (bodyPartNum, chanceToMiss = 0) => {player.weapon.shoot((player.combatSkills - 10) * 2 + 20, player.currentAmmo, player.currentEncounter, playerDistance, () => {activatePulse([255, 255, 200], 0.1, 5)}, bodyPartNum, 1, player.currentAmmo.damageBonus, chanceToMiss / 2)}
        multiRanged.style.display = "none"
        singleRanged.style.display = "none"
        burstSize = 1
        openBodyParts()
    }
})
})
document.querySelector("#distractionFireHit").addEventListener("click", () => {
    if (!document.querySelector("#distractionFireHit").classList.contains("inactiveButton")){
        attackFunction = (bodyPartNum, chanceToMiss = 0) => {player.weapon.shoot((player.combatSkills - 10) * 2 - 10, player.currentAmmo, player.currentEncounter, playerDistance, () => {activatePulse([255, 255, 200], 0.1, 5)}, bodyPartNum, 0, +player.currentAmmo.damageBonus * 2, chanceToMiss)}
        singleRanged.style.display = "none"
        burstSize = 1
        openBodyParts()
    }
})
document.querySelector("#doubleFireHit").addEventListener("click", () => {
    if (!document.querySelector("#doubleFireHit").classList.contains("inactiveButton")){
        burstSize = 2
        if (burstSize > player.inventory[player.currentAmmo.name]){
            burstSize = player.inventory[player.currentAmmo.name]
        }
        attackFunction = (bodyPartNum, chanceToMiss = 0) => {player.weapon.shoot((player.combatSkills - 10) * 2 - 20, player.currentAmmo, player.currentEncounter, playerDistance, () => {activatePulse([255, 255, 200], 0.1, 5)}, bodyPartNum, burstSize, -player.currentAmmo.damageBonus, chanceToMiss * 1.1)}
        singleRanged.style.display = "none"
        openBodyParts()
    }
})
document.querySelector("#protectYourself").addEventListener("click", () => {
    damageReduction = 50
    choosedmoveOption()
    damageReduction = 0
})
document.querySelector("#tryToParry").addEventListener("click", () => {
    let chance = player.hp.walking - player.currentEncounter.hp.walking / 2
    let randomNum = Math.floor(Math.random() * 100)
    if (randomNum < chance){
        damageReduction = 100
    }
    enemyTurn()
    back()
    damageReduction = 0
})
document.querySelector("#runToTarget").addEventListener("click", () => {
    choosedmoveOption()
    let distance = 3 * player.hp.walking / 100
    playerDistance -= distance
    if (playerDistance < 0){
        playerDistance = 0
    }
})
document.querySelector("#runFromTarget").addEventListener("click", () => {
    let distance = 3 * player.hp.walking / 100
    playerDistance += distance
    choosedmoveOption()
})
    let distance = 3 * player.hp.walking / 100
    playerDistance += distance

document.querySelectorAll(".bodyPart").forEach((button) => {button.addEventListener("click", () => {
    attackFunction(Number(button.name), [50, 0, 15, 15][Number(button.name)])
    
    // updateWeaponInfo()
    // console.log(burstSize, player.inventory[player.currentAmmo.name], player.inventory)
    back()
    back()
    if (player.currentEncounter != 0){
        if (burstSize != -1){
            player.takeItem(player.currentAmmo.name, burstSize)
        }
        enemyTurn()
    }
})})

function back(){
    if (previous.length != 0){
        current.style.display = "none"
        previous[previous.length - 1].style.display = "flex"
        current = previous[previous.length - 1]
        previous.splice(previous.length - 1, 1)
    }
}

document.querySelectorAll(".exitMenu").forEach((button) => {button.addEventListener("click", back)})
function addDescriptions(){
    document.querySelectorAll(".buttonDescription").forEach((button) => {
        if (!buttonWithDescriptions.includes(button.id)){
            button.addEventListener("mouseover", () => {tip.innerHTML = button.value})
            if (player.currentEncounter != 0){
                button.addEventListener("mouseout", () => {tip.innerHTML = "Hover over a button to get more info"})
            }
            else {
                button.addEventListener("mouseOut", () => {tip.innerHTML = "ㅤ"})
            }
            buttonWithDescriptions.push(button.id)
    }
    })}


function changeWeapon(itemName){
    player.weapon = new weaponsList[itemName]()
    if (player.weapon instanceof RangedWeapon){
        player.currentAmmo = new player.weapon.allowedAmmo[0]()
    }
    back()
    back()
}
function addWeapons(){
    document.querySelectorAll(".chooseWeapon").forEach((button) => {
        button.addEventListener("click", () => {
            changeWeapon(button.innerHTML.split(":")[0])
            // enemyTurn()
        })
    })
}

document.querySelector("#openWeapons").addEventListener("click", () => {
    weapons.style.display = "flex"
    items.style.display = "none"
    update()
    document.querySelectorAll(".chooseWeapon").forEach((weaponButton) => {weaponButton.remove()})
    for (let item of Object.keys(player.inventory)){
        // console.log(item)
        if (Object.keys(weaponsList).includes(item)){
            let weapon = new weaponsList[item]()
            let button = document.createElement("button")
            button.classList.add("buttonOption")
            button.classList.add("buttonDescription")
            button.classList.add("chooseWeapon")
            button.value = weapon.description
            button.innerHTML = item
            weapons.appendChild(button)
        }
    }
    addWeapons()
    addDescriptions()
})

function consume(itemName, bodyPartNum, kwarg = null){
    let item = new consumablesList[itemName]()
    if (Object.keys(foodList).includes(item)){
        item.eat()
    }
    else{
        item.consume(player, bodyPartNum)
    }
    player.takeItem(itemName, 1)
    if (item.healsEverything){
        player.hp.heal(item.healAmount, -1)
    }
    else{
        player.hp.heal(item.healAmount, bodyPartNum)
    }
    back()
    back()
}
function addConsumes(){
    document.querySelectorAll(".chooseConsumable").forEach((button) => {
        button.addEventListener("click", () => {
            console.log(button.innerHTML.split(":")[0])
            let itemClass = consumablesList[button.innerHTML.split(":")[0]]
            console.log(itemClass)
            let item = new itemClass()
            if (item.healsEverything){
                consume(button.innerHTML.split(":")[0], -1)
                enemyTurn()
            }
            else{
                attackFunction = (bodyPartNum, kwarg = 0) => {consume(button.innerHTML.split(":")[0], bodyPartNum, kwarg)}
                consumables.style.display = "none"
                openBodyParts(false)
            }
        })
    })
}

document.querySelector("#openConsumables").addEventListener("click", () => {
    consumables.style.display = "flex"
    items.style.display = "none"
    update()
    document.querySelectorAll(".chooseConsumable").forEach((weaponButton) => {weaponButton.remove()})
    for (let item of Object.keys(player.inventory)){
        console.log(item)
        if (Object.keys(consumablesList).includes(item)){
            let consumable = new consumablesList[item]()
            let button = document.createElement("button")
            button.classList.add("buttonOption")
            button.classList.add("buttonDescription")
            button.classList.add("chooseConsumable")
            button.value = consumable.description
            button.innerHTML = `${item}: ${player.inventory[item]}`
            consumables.appendChild(button)
        }
    }
    addConsumes()
    addDescriptions()
})

document.querySelector("#tryToFlee").addEventListener("click", () => {
    let enemyModifier = 2 - player.currentEncounter.hp.walking * 0.015
    let chanceToFlee = (playerDistance - 5) * player.hp.walking / 100 * enemyModifier * 20
    let random = Math.random() * 100
    if (random < chanceToFlee){
        stopFight(true, "You succesfully escaped from the battle!", "...it worked?..")
    }
    else {
        enemyTurn()
        if (player.hp.alive){
            text.innerHTML = "You failed to escape!"
        }
    }
})

function startFight(enemy, additionalText = "oh no"){
    if (player.currentEncounter == 0){
        preFightTexts.push(text.innerHTML, tip.innerHTML)
        previousMenu = current
        current = standartFight
        current.style.display = "flex"
        previous.push(previousMenu)
        previousMenu.style.display = "none"
        document.querySelector(".outFightData").style.display = "none"
        document.querySelector(".fightData").style.display = "flex"
    }
    player.currentEncounter = enemy
    text.innerHTML = `You was attacked by ${enemy.name}!`
    tip.innerHTML = additionalText
}

function stopFight(playerAlive = true, mainText = "You won!", additionalText = "uhhh, maybe?...."){
    if (playerAlive){
        player.currentEncounter = 0
        win.style.display = "flex"
        current.style.display = "none"
    }
    else {
        console.log("um")
        lose.style.display = "flex"
        current.style.display = "none"
    }
    console.log(mainText)
    text.innerHTML = mainText
    tip.innerHTML = additionalText
}

document.querySelector("#inspectEnemy").addEventListener("click", () => {
    text.innerHTML = `${player.currentEncounter.name}: ${player.currentEncounter.hp.overallHp}/${player.currentEncounter.hp.MAX_OVERALL_HP}HP<br>Current enemy state: ${player.currentEncounter.hp.state}<br>Enemy description: ${player.currentEncounter.description}`
    tip.innerHTML = "Time to fight! or go?"
    back()
})