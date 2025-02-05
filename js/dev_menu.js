document.querySelector(".cheat-menu").style.display = "flex"
document.querySelector(".heal").addEventListener("click", () => {heal(10, true, player.hp.overallHp)})
// document.querySelector(".harm").addEventListener("click", () => {harm(10, true, player.hp.overallHp); console.log("Oh no")})
document.querySelector(".harm").addEventListener("click", () => {startFight(new Soldier())})

// let creature = new LiveObject("Bob")
// let devWeapon = new AutoRifle()  
// creature.weapon = new Pistol()
// creature.drop = {"Rifle rounds": 10, "Pistol rounds": 50, "Money": 25}
// let devAmmo = new RifleRounds()
// let devMelee = new NeutroKnife()
// function reportAboutCreature(){
//     console.clear()
//     activatePulse([255, 255, 200], 0.1, 5)
//     console.log(`About creature: \nMain Stats:\n    Current state: ${creature.hp.state}\n    Overall HP: ${creature.hp.overallHp}/${creature.hp.MAX_OVERALL_HP}\nHP Stats:\n    Head: ${creature.hp.head}/${creature.hp.MAX_HEAD}\n    Body: ${creature.hp.body}/${creature.hp.MAX_BODY}\n    Hands: ${creature.hp.hands}/${creature.hp.MAX_HANDS}\n    Legs: ${creature.hp.legs}/${creature.hp.MAX_LEGS}\nCapability stats:\n    Working: ${creature.hp.working}%/100%\n    Walking: ${creature.hp.walking}%/100%\n    Pain: ${creature.hp.overallPain}%/100%\n    Consciousness: ${creature.hp.consciousness}%/100%`)
//     console.log(`About you: \nMain Stats:\n    Current state: ${player.hp.state}\n    Overall HP: ${player.hp.overallHp}/${player.hp.MAX_OVERALL_HP}\nHP Stats:\n    Head: ${player.hp.head}/${player.hp.MAX_HEAD}\n    Body: ${player.hp.body}/${player.hp.MAX_BODY}\n    Hands: ${player.hp.hands}/${player.hp.MAX_HANDS}\n    Legs: ${player.hp.legs}/${player.hp.MAX_LEGS}\nCapability stats:\n    Working: ${player.hp.working}%/100%\n    Walking: ${player.hp.walking}%/100%\n    Pain: ${player.hp.overallPain}%/100%\n    Consciousness: ${player.hp.consciousness}%/100%`)
// }

// player.inventory["Neutral Knife"] = devMelee
// player.currentEncounter = creature
// player.currentAmmo = devAmmo
// player.inventory[devWeapon.name] = 1
// player.inventory["Pistol"] = 1
// player.inventory["Pistol rounds"] = 20
// player.inventory["Rocket Launcher"] = 1
// player.inventory["Rockets"] = 5
// player.inventory[devAmmo.name] = 5
// player.inventory["Bread"] = 5
// player.inventory["Apple"] = 5
// player.inventory["Borsch"] = 5
player.inventory["Bandage"] = 5
// player.inventory["Medical Kit"] = 5
// player.inventory["Advanced Medical Kit"] = 5
// player.inventory["Rocket Launcher"] = 1
// player.inventory["Rockets"] = 10
// player.inventory["Minigun"] = 1
// player.inventory["Rifle rounds"] = 500

// document.querySelector(".attack").addEventListener("click", () => {creature.attack(player, 5, Math.floor(Math.random() * 4)); reportAboutCreature()})
// document.querySelector(".shoot").addEventListener("click", () => {devWeapon.shoot(40, devAmmo, creature, 5, reportAboutCreature); reportAboutCreature()})
// document.querySelector(".info").addEventListener("click", () => {reportAboutCreature()})
// document.querySelector(".info").addEventListener("click", reportAboutCreature)
// document.querySelector(".revive").addEventListener("click", () => {
//     creature.hp.ressurect()
//     reportAboutCreature()
// })
// document.querySelector(".giveAmmo").addEventListener("click", () => {player.inventory[player.currentAmmo.name] += 20})