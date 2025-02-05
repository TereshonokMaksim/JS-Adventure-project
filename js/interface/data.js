  
class FoundFood{
    constructor(food, chance = 50, batchSize = 3, description = ""){
        this.food = food
        this.chance = chance
        this.batchSize = batchSize
        this.description = description
    }
}
class FoundEnemy{
    constructor(enemy, chance = 50, chapterIndexes = [1], description = ""){
        this.enemy = enemy
        this.chance = chance
        this.chapterIndexes = chapterIndexes
        this.description = description
    }
}

function chooseEnemy(){
    while (true){
        for (enemy of fieldEnemies){
            if (enemy.chapterIndexes.includes(player.currentChapter)){
                let randomNum = Math.random() * 100
                if (randomNum < enemy.chance){
                    return enemy
                }
            }
        }
    }
}

const fieldEnemies = [new FoundEnemy(Wolf, 40, [1, 2], "a wolf, that lost its group. Looks like he was alone for awhile."),
                      new FoundEnemy(Bear, 20, [1, 2, 3], "a brown bear! It scares you even on big distance."),
                      new FoundEnemy(Soldier, 25, [2, 3, 4], "soldier in his not strong armor. His rifle looks quite valueable."), 
                      new FoundEnemy(VeteranSoldier, 10, [2, 3], "soldier with many scars on his skin. He is looking serious."),
                      new FoundEnemy(SpecialSoldier, 20, [3, 4, 5], "man in black with some sci-fi rifle. He has good reaction and armor.")]

const fieldFood = [new FoundFood(DirtyWater, 70, 5, "small river with water. You decided to collect some."), 
                   new FoundFood(Blueberries, 30, 5, "bush with blueberries on it."), 
                   new FoundFood(Apple, 25, 3, "apple tree with some apples on it. There were also some apples on the ground."), 
                   new FoundFood(Tomato, 19, 4, "wild bushes with tomatoes. You decided to risk and collected them"), 
                   new FoundFood(Corn, 10, 10, "old corn field with some corn still left on it."), 
                   new FoundFood(RawMeat, 5, 5, "old animal that was killed by a bear. You swiftly collected meat and run away."),
                   new FoundFood(Potato, 35, 5, "interesting plant and you found out that it was actually a potato plant!")]


const menus = []
const armorList = {"Usual clothes": UsualClothes, "Reinforced clothes": ReinforcedClothes, "Soldier armor": SoldierArmor, 
                   "Quality soldier armor": QualitySoldierArmor, "Special forces armor (SFA)": SpecialForcesArmor, "Animal skin": AnimalSkin, 
                   "Thick animal skin": ThickAnimalSkin}

const weaponsList = {"Pistol": Pistol, "Advanced Pistol": AdvancedPistol, "Semi Automatic Rifle": SemiRifle, "Automatic Rifle": AutoRifle, 
                     "Sniper Rifle": SniperRifle, "Advanced Rifle": AdvancedRifle, "Rocket Launcher": RocketLauncher, "Acid synthesizer": AcidSynthesizer, "Minigun": Minigun, 
                     "Fists": Fists, "Knife": Knife, "Shovel": Shovel, "Mace": Mace, "Sword": Sword}

const foodList = {"Blueberry compote": BlueberryCompote, "Apple compote": AppleCompote, "Dirty water": DirtyWater, "Water": Water, "Clean water": CleanWater, 
                  "Blueberries": Blueberries, "Raw meat": RawMeat, "Cooked meat": CookedMeat, "Tomato": Tomato, "Potato": Potato, "Cooked potato": CookedPotato, 
                  "Corn": Corn, "Cooked corn": CookedCorn, "Apple": Apple, "Bread": Bread, "Borsch": Borsch}

const consumablesList = {"Bandage": Bandage, "Medical Kit": MedKit, "Advanced Medical Kit": AdvMedKit, "NeutroHeal": NeutroHeal, ...foodList}
const buttonWithDescriptions = []
const preFightTexts = []