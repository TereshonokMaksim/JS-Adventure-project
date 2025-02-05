// Даже учитывая что это меню не должно относится к бою,
// этот файл все равно использует достаточно много инфы
// из fightMenu.js

const awake = document.querySelector("#awakening")
const walking = document.querySelector("#walking")
const encounter = document.querySelector("#encounterMenu")
const foundEnemy = document.querySelector("#foundEnemyMenu")
const outFightInventory = document.querySelector("#checkInventoryWalking")
const detailedInventory = document.querySelector("#checkInventoryDetailed")
const campStandart = document.querySelector("#campingStandart")
const campCookingStandart = document.querySelector("#campingCookingStandart")
const campCookingDrinks = document.querySelector("#campingCookingDrinks")
const campCookingFoods = document.querySelector("#campingCookingFoods")

menus.push(awake, walking, encounter, foundEnemy, outFightInventory, detailedInventory,
           campStandart, campCookingStandart, campCookingDrinks, campCookingFoods)
current = awake

let possibleEnemy = 0
player.hp.head /= 2

// const text = document.querySelector(".textInfo")
// const tip = document.querySelector(".textTip") 

function updateOutFightData(){
    if (player.currentEncounter == 0){
        document.querySelector(".outFightData").style.display = "flex"
        let weaponName = "none"
        let ammoName = "bullets"
        let ammoNum = 0
        let armorName = "none"
        let balance = 0
        if (player.weapon != 0){
            weaponName = player.weapon.name
        }
        if (player.currentAmmo != 0){
            ammoName = player.currentAmmo.name
            ammoNum = player.inventory[player.currentAmmo.name]
        }
        if (player.armor != 0){
            armorName = player.armor.name
        }
        if (Object.keys(player.inventory).includes("Money")){
            balance = player.inventory["Money"]
        }
        document.querySelector("#currentWeaponOut").innerHTML = `Your weapon - ${weaponName}`
        document.querySelector("#currentAmmoOut").innerHTML = `Ammunition left - ${ammoNum} ${ammoName}`
        document.querySelector("#currentArmorOut").innerHTML = `Your armor - ${armorName}`
        document.querySelector("#currentMoneyOut").innerHTML = `Your balance: ${balance} hrn`
        document.querySelector("#currentThirstOut").innerHTML = `Your thirst: ${Math.round(player.thirst * 100)}%`
        document.querySelector("#currentHungerOut").innerHTML = `Your hunger: ${Math.round(player.hunger * 100)}%`
    }
    else{
        document.querySelector(".outFightData").style.display = "none"
    }
}

// setInterval(updateOutFightData, 100)

function createOption(name, id, description = " "){
    let button = document.createElement("button")
    button.classList.add("buttonOption", "buttonDescription")
    button.value = description
    button.id = id
    button.innerHTML = name
    return button
}

function addRelaxHereAwake(){
    let button = createOption("Relax", "relaxHereAwake", "Are you gonna just lie here??? Really?")
    awake.appendChild(button)
    addDescriptions()
    button.addEventListener("click", () => {
        text.innerHTML = "You stayed here for even more. What a great feeling: lying on a grass, circled by beatiful white flowers...<br>Also, you found an apple"
        tip.innerHTML = "No way, you found an apple. We wont die from hunger :D"
        button.remove()
        player.hp.heal(1000, -1)
        player.addItem("Apple", 1)
    }
    )
}   

let ready = 0
function addStayHereAwake(){
    let button = createOption("Stay here", "stayHereAwake", "Stay here for a little longer.")
    awake.appendChild(button)
    addDescriptions()
    button.addEventListener("click", () => {
        let random = Math.random() * 100
        if (random < 60){
            text.innerHTML = "You stayed here for a little longer. Your head now feeling better, but you need to find some food."
            tip.innerHTML = "Maybe, its too early to panic. Anyways, lets go."
            button.remove()
            player.hp.head += 10
        }
        else{
            text.innerHTML = "You stayed here for a little longer. You was really worried about your current position - unsafe and in the middle of the forest.<br>You hurt your head while you were actively trying to think."
            tip.innerHTML = "The lesser you know, the more you sleep! Lets get outta here!"
            button.remove()
            player.hp.head -= 10
        }
        passTime(3600)
    })
}

function findSomething(chanceToFood = 40, chanceToEnemy = 70){
    let randomNum = Math.random() * 100
    passTime(Math.round(Math.random() * 4800) + 2400)
    if (randomNum < chanceToFood){
        for (let possibleFood of fieldFood){
            let randomFoodChance = Math.random() * 100
            if (randomFoodChance < possibleFood.chance){
                let amount = possibleFood.batchSize + Math.round(Math.random() * 2 - 1)
                let name = new possibleFood.food()
                name = name.name
                player.addItem(name, amount)
                text.innerHTML = `You found ${possibleFood.description}<br>You got ${amount} ${name}.`
                return
            }
        }
    }
    else if (randomNum < chanceToEnemy){
        possibleEnemy = chooseEnemy().enemy
        possibleEnemy = new possibleEnemy()
        playerDistance = Math.round(Math.random() * 60) / 10 + 5
        if (randomNum < chanceToEnemy - 5 + (playerDistance - 7) * 10){
            text.innerHTML = `You found ${possibleEnemy.name}.`
            tip.innerHTML = "If you win, you may get some valuable things, if you lose, well, game over."
            walking.style.display = "none"
            awake.style.display = "none"
            foundEnemy.style.display = "flex"
            update()
        }
        else {
            text.innerHTML = `You found ${possibleEnemy.name}. He found you too.`
            tip.innerHTML = "How did he see us!? We just were without any obstacles too see us... Oh."
            walking.style.display = "none"
            awake.style.display = "none"
            encounter.style.display = "flex"
            update()
        }
    }
    else if (randomNum < chanceToEnemy + 5){
        text.innerHTML = "You found caravan of people with horses. Unforunately, they were faster than you and left"
        tip.innerHTML = "I think they were traders! Anyways, we failed to talk with them."
    }
    else {
        text.innerHTML = "You found nothing."
        tip.innerHTML = ":sad:"
    }}

function addLookForSupplies(){
    document.querySelector("#goFurther").addEventListener("click", () => {
        findSomething(45, 75)
    })
}

function addCheckInventory(){
    text.innerHTML = "Click which category of items you want to see."
    tip.innerHTML = "They are below this text."
    let button = document.querySelector("#itemOptionWalking")
    button.addEventListener("click", () => {
        outFightInventory.style.display = "flex"
        current.style.display = "none"
        update()
    })
}

function addGoToForestAwake(){
    let goInForest = createOption("Go into forest", "goToForestAwake", "Not sure if its a good idea, but we dont have much of a choice.")
    awake.appendChild(goInForest)
    goInForest.addEventListener("click", () => {
        player.currentChapter = 1
        try{
            document.querySelector("#stayHereAwake").remove()
        }
        catch{

        }
        goInForest.remove()
        text.innerHTML = "You are now in the forest. You see some squirells on the trees and racoons on the ground."
        tip.innerHTML = "No wolfs and bears. Good start."
        addLookForSupplies()
        addCheckInventory()
        awake.style.display = "none"
        walking.style.display = "flex"
        update()
    })
}

function startAdventure(){
    if (ready == 2){
        tip.innerHTML = "Maybe, you need to inspect your surroundings further"
        addStayHereAwake()
        addGoToForestAwake()
        addDescriptions()
    }
    else {
        ready++
    }
}

function addInspectLocationAwake(){
    let button = createOption("Check your surrounding", "inspectLocationAwake", "Are you sure everything is okay?")
    awake.appendChild(button)
    addDescriptions()
    button.addEventListener("click", () => {
        passTime(900)
        text.innerHTML = "You found some animals, so this forest is full of wildlife.\nYou need to find something before you go."
        tip.innerHTML = "Well, let's hope that animals randomly hurt you, and nothing bigger..."
        button.remove()
        startAdventure()
    })
}
function addFixWoundsAwake(){
    let button = createOption("Try to fix wounds", "fixWoundsAwake", "Use items around you to stop bleeding from your head.")
    awake.appendChild(button)
    addDescriptions()
    button.addEventListener("click", () => {
        passTime(900)
        player.hp.head += player.hp.MAX_HEAD / 4 + 5
        text.innerHTML = "You stopped your bleedings, so you feel little better now"
        tip.innerHTML = "Who cut you?..."
        button.remove()
        startAdventure()
    })
}
function addLookForItemsAwake(){
    let button = createOption("Check for items around you", "lookForItemsAwake", "Maybe, you could find something useful in surroundings?")
    awake.appendChild(button)
    addDescriptions()
    button.addEventListener("click", () => {
        passTime(2100)
        let randomNum = Math.random() * 100
        if (randomNum < 40){
            text.innerHTML = "You checked your location. You found pristine knife hidden in a small bush.<br>This is worrying."
            tip.innerHTML = "You should equip it, for sure."
        }
        else{
            text.innerHTML = "You checked your location. You found some apples laying around and a pristine knife hidden in a small bush...<br>You ate one apple because you were worried of the knife."
            tip.innerHTML = "Equip the knife as soon as you can, so you wont be hurted by any other apple tree (?)"
            player.thirst = 0
            player.hunger = 0
            player.addItem("Apple", 3)
        }
        player.addItem("Knife", 1)
        button.remove()
        startAdventure()
    })

}

document.querySelector("#lookAroundAwake").addEventListener("click", () => {
    text.innerHTML = "It looks like you are in beatiful forest, circled by white flowers.\nYou have a strange feeling."
    tip.innerHTML = "It can't be that peaceful, right?"
    passTime(60)
    document.querySelector("#lookAroundAwake").remove()
    addInspectLocationAwake()
})

document.querySelector("#checkYourselfAwake").addEventListener("click", () => {
    text.innerHTML = "It seems, that your head is pretty well damaged.<br>Try to find some consumables."
    tip.innerHTML = "Who damaged your head? What happened?"
    passTime(90)
    document.querySelector("#checkYourselfAwake").remove()
    setInterval(updateYourData, 100)
    addFixWoundsAwake()
})

document.querySelector("#checkInventoryAwake").addEventListener("click", () => {
    text.innerHTML = "You check your pockets. They are empty.\nHomever, you found some money in your shirt."
    tip.innerHTML = "Some good old hryvnia"
    passTime(120)
    player.addItem("Money", 12)
    document.querySelector("#checkInventoryAwake").remove()
    setInterval(updateOutFightData, 100)
    setInterval(updateFightData, 100)
    addLookForItemsAwake()
})

document.querySelectorAll("#startBattle").forEach((button) => {
    button.addEventListener("click", () => {
        back()
        text.innerHTML = "You continued your way."
        startFight(possibleEnemy)
    })
})

document.querySelector("#backOffBattle").addEventListener("click", () => {
    text.innerHTML = "You continued your way."
    back()
})

document.querySelector("#tryToFleeBattle").addEventListener("click", () => {
    let randomNum = Math.random() * 100
    let chanceToFlee = player.hp.walking / 100 + (playerDistance - 7) * 10
    if (randomNum < chanceToFlee){
        text.innerHTML = "You succesfully escaped from battle!"
        tip.innerHTML = "Random god blessed us?"
        back()
    }
    else {
        back()
        text.innerHTML = "You continued your way."
        startFight(possibleEnemy)
        enemyTurn()
    }
})

function cleanDetailedInventory(){
    document.querySelectorAll(".armorOptionInventory").forEach((button) => {button.remove()})
    document.querySelectorAll(".weaponOptionInventory").forEach((button) => {button.remove()})
    document.querySelectorAll(".foodOptionInventory").forEach((button) => {button.remove()})
    document.querySelectorAll(".healOptionInventory").forEach((button) => {button.remove()})
}

function addArmorFunctions(){
    let buttons = document.querySelectorAll(".armorOptionInventory")
    buttons.forEach((button) => {button.addEventListener("click", () => {
        back()
        player.armor = new armorList[button.innerHTML]()
        text.innerHTML = `You equipped ${button.innerHTML}.`
        tip.innerHTML = "You looking good in this :)"
    })})
}
function addWeaponFunctions(){
    let buttons = document.querySelectorAll(".weaponOptionInventory")
    buttons.forEach((button) => {button.addEventListener("click", () => {
        back()
        player.weapon = new weaponsList[button.innerHTML]()
        text.innerHTML = `You equipped ${button.innerHTML}.`
        tip.innerHTML = "Fancy weapon."
    })})
}
function addFoodFunctions(){
    let buttons = document.querySelectorAll(".foodOptionInventory")
    buttons.forEach((button) => {button.addEventListener("click", () => {
        back()
        let name = button.innerHTML.split(":")[0]
        let food = new foodList[name]()
        text.innerHTML = `You ate ${name}.`
        tip.innerHTML = "This was tasty."
        food.eat()
        player.takeItem(name, 1)
    })})
}
function addHealFunctions(){
    let buttons = document.querySelectorAll(".healOptionInventory")
    buttons.forEach((button) => {button.addEventListener("click", () => {
        let name = button.innerHTML.split(":")[0]
        let item = new consumablesList[name]()
        if (item.healsEverything){
            item.consume(player, -1, true)
            text.innerHTML = `You used ${name}.`
            tip.innerHTML = "Muuuuch better now!"
        }
        else {
            attackFunction = (bodyPartNum, kwargs = 0) => {
                item.consume(player, bodyPartNum, true)
            }
            detailedInventory.style.display = "none"
            openBodyParts(false)
        }
    })})
}

// Inventory management

document.querySelector("#armorInventoryWalking").addEventListener("click", () => {
    detailedInventory.style.display = "flex"
    current.style.display = "none"
    update()
    cleanDetailedInventory()
    for (let currentArmor of Object.keys(player.inventory)){
        if (Object.keys(armorList).includes(currentArmor)){
            let newOption = createOption(currentArmor, "", new armorList[currentArmor]().description)
            newOption.classList.add("armorOptionInventory")
            detailedInventory.appendChild(newOption)
        }
    }
    addArmorFunctions()
})

document.querySelector("#weaponsInventoryWalking").addEventListener("click", () => {
    detailedInventory.style.display = "flex"
    current.style.display = "none"
    update()
    cleanDetailedInventory()
    for (let currentWeapon of Object.keys(player.inventory)){
        if (Object.keys(weaponsList).includes(currentWeapon)){
            let newOption = createOption(currentWeapon, "", new weaponsList[currentWeapon]().description)
            newOption.classList.add("weaponOptionInventory")
            detailedInventory.appendChild(newOption)
        }
    }
    addWeaponFunctions()
})

document.querySelector("#foodsInventoryWalking").addEventListener("click", () => {
    detailedInventory.style.display = "flex"
    current.style.display = "none"
    update()
    cleanDetailedInventory()
    for (let currentFood of Object.keys(player.inventory)){
        if (Object.keys(foodList).includes(currentFood)){
            let newOption = createOption(`${currentFood}: ${player.inventory[currentFood]} pcs.`, "", new foodList[currentFood]().description)
            newOption.classList.add("foodOptionInventory")
            detailedInventory.appendChild(newOption)
        }
    }
    addFoodFunctions()
})

document.querySelector("#healItemsInventoryWalking").addEventListener("click", () => {
    detailedInventory.style.display = "flex"
    current.style.display = "none"
    update()
    cleanDetailedInventory()
    for (let currentHeal of Object.keys(player.inventory)){
        if (Object.keys(consumablesList).includes(currentHeal) && !Object.keys(foodList).includes(currentHeal)){
            let newOption = createOption(`${currentHeal}: ${player.inventory[currentHeal]}`, "", new consumablesList[currentHeal]().description)
            newOption.classList.add("healOptionInventory")
            detailedInventory.appendChild(newOption)
        }
    }
    addHealFunctions()
})

document.querySelector("#inspectLocation").addEventListener("click", () => {
    findSomething(30, 35)
})

// THE CAMP PART (it should be big)

document.querySelector("#startCamping").addEventListener("click", () => {
    current.style.display = "none"
    campStandart.style.display = "flex"
    update()
    passTime(3600)
    text.innerHTML = "You made a small campfire and place to sit near it."
    tip.innerHTML = "Animals are scared of campfire, but you cant bring it with you."
})

document.querySelector("#continueWayCamping").addEventListener("click", () => {
    current.style.display = "none"
    walking.style.display = "flex"
    update()
    passTime(600)
    text.innerHTML = "You extinguished your campfire and packed your things back."
    tip.innerHTML = "Back on track."
})

// --------------------
// START OF THE COOKING
// --------------------

for (let foodItem of Object.keys(foodList)){
    let food = new foodList[foodItem]()
    if (food.ingridients.length > 0){
        if (food.thirstQuench > food.hungerQuench){
            // Drink
            let newDrink = createOption(foodItem, "", `Ingridients:<br>${food.ingridients.join("<br>")}`)
            newDrink.classList.add("cookOption")
            campCookingDrinks.appendChild(newDrink)
        }
        else{
            // Food
            let newFood = createOption(foodItem, "", `Ingridients:<br>${food.ingridients.join("<br>")}`)
            newFood.classList.add("cookOption")
            campCookingFoods.appendChild(newFood)
        }
    }
}

document.querySelector("#cookCamping").addEventListener("click", () => {
    text.innerHTML = "Choose what do you want to cook!"
    tip.innerHTML = "Do we have all the ingridients?"
    campCookingStandart.style.display = "flex"
    current.style.display = "none"
    update()
})


document.querySelector("#drinksCooking").addEventListener("click", () => {

}) 