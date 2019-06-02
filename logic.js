

var game = (function () {

    var version = 1.001;


    
    const youHealth = 100;
    const youHealthMax = 100;
    const youDamage = 10;
    const youRestoreAmount = 15;
    const youEnergy = 100;
    const youEnergyMax = 100;
    const youEnergyRestore = 20;

    const enemyHealth = 80;
    const enemyHealthMax = 80;
    const enemyDamage = 11;
    const enemyRestoreAmount = 12;
    const enemyEnergy = 30;
    const enemyEnergyMax = 30;
    const enemyEnergyRestore = 10;


    // Initialisation.

    $(function () {

        $(".whatever").fadeOut();

        $(".start-game").on("click", function () {

            $(".splash").fadeOut();

            $(".gameboard").fadeIn();

            document.getElementsByClassName("audio-pageturn")[0].play();
            
            document.getElementsByClassName("audio-control")[0].play();

        });


        resetCreature(you, youHealthMax, youDamage, youRestoreAmount, youEnergyMax, youEnergyRestore, 
            ".you-health-progress", ".you-health-text", ".you-energy-text", ".you--title", 
            ".you--avatar img", "https://www.dropbox.com/s/88u536v6zrx54tr/Sparring-knight.png?dl=1");

        resetCreature(enemy, enemyHealthMax, enemyDamage, enemyRestoreAmount, enemyEnergyMax, enemyEnergyRestore, 
            ".enemy-health-progress", ".enemy-health-text", ".enemy-energy-text", ".enemy--title", 
            ".enemy--avatar img", "https://www.dropbox.com/s/9c5x17coag5vnay/GoblinSilo.png?dl=1");

        enemy.usedFireBladeSpell = false;

    });







    // Game objects.

    var you = (function () {
        var title = "Knight (Level 1)";

        var life = true;

        var health = youHealth;
        var healthMax = youHealthMax;
        var damage = youDamage;
        var restoreAmount = youRestoreAmount;

        var counterAllowed = false;

        var healthProgress = ".you-health-progress";
        var healthText = ".you-health-text";

        var energy = youEnergy;
        var energyMax = youEnergyMax;
        var energyRestore = youEnergyRestore;
        var energyText = ".you-energy-text";

        return {
            title: title,

            life: life,

            health: health,
            healthMax: healthMax,
            damage: damage,
            restoreAmount: restoreAmount,

            counterAllowed: counterAllowed,

            healthProgress: healthProgress,
            healthText: healthText,

            energy: energy,
            energyMax: energyMax,
            energyRestore: energyRestore,
            energyText: energyText
        };

    })();





    var enemy = (function () {
        var title = "Goblin (Effortless)";

        var health = enemyHealth;
        var healthMax = enemyHealthMax;
        var damage = enemyDamage;
        var restoreAmount = enemyRestoreAmount;

        var counterAllowed = false;

        var healthProgress = ".enemy-health-progress";
        var healthText = ".enemy-health-text";

        var energy = enemyEnergy;
        var energyMax = enemyEnergyMax;
        var energyRestore = enemyEnergyRestore;
        var energyText = ".enemy-energy-text";

        var usedFireBladeSpell = false;

        return {
            title: title,

            health: health,
            healthMax: healthMax,
            damage: damage,
            restoreAmount: restoreAmount,

            counterAllowed: counterAllowed,

            healthProgress: healthProgress,
            healthText: healthText,

            energy: energy,
            energyMax: energyMax,
            energyRestore: energyRestore,
            energyText: energyText, 

            usedFireBladeSpell: usedFireBladeSpell
        };

    })();










    // Game logic.

    var disableActions = function () {
        $(".action").attr("disabled", "disabled");
    }

    var enableActions = function () {
        $(".action").removeAttr("disabled");
    }




    var restartGame = function(){

        document.getElementsByClassName("audio-chain")[0].play();

        enableActions();

        resetCreature(you, youHealthMax, youDamage, youRestoreAmount, youEnergyMax, youEnergyRestore, 
            ".you-health-progress", ".you-health-text", ".you-energy-text", ".you--title", 
            ".you--avatar img", "https://www.dropbox.com/s/88u536v6zrx54tr/Sparring-knight.png?dl=1");

        resetCreature(enemy, enemyHealthMax, enemyDamage, enemyRestoreAmount, enemyEnergyMax, enemyEnergyRestore, 
            ".enemy-health-progress", ".enemy-health-text", ".enemy-energy-text", ".enemy--title", 
            ".enemy--avatar img", "https://www.dropbox.com/s/9c5x17coag5vnay/GoblinSilo.png?dl=1");
        enemy.usedFireBladeSpell = false;

        $(".gameboard").fadeOut();

        $(".splash").fadeIn();

    }



    var resetCreature = function (creature, healthMax, damage, restoreAmount, energyMax, energyRestore, 
        healthProgressTag, healthTextTag, energyTextTag, creatureTitleTag, creatureImageTag, creatureImage) {
        
        creature.health = healthMax;
        creature.healthMax = healthMax;
        creature.damage = damage;
        creature.restoreAmount = restoreAmount;
        creature.counterAllowed = false;
        creature.energy = energyMax;
        creature.energyMax = energyMax;
        creature.energyRestore = energyRestore;
        $(healthProgressTag).attr("value", creature.health);
        $(healthProgressTag).attr("max", creature.healthMax);
        $(healthTextTag).text(creature.health + "/" + creature.healthMax);
        $(energyTextTag).text(creature.energy);
        $(creatureTitleTag).text(creature.title);
        $(creatureImageTag).attr("src",creatureImage);
    }

    



    var performAttack = function (attacker, target) {
        
        document.getElementsByClassName("audio-attack")[0].play();
        
        alert(attacker.title + " attack dealing " + attacker.damage + " damage.");

        target.health -= attacker.damage;

        if (target.health <= 0) {
            target.health = 0;
        }

        $(target.healthProgress).attr("value", target.health);
        $(target.healthText).text(target.health + "/" + target.healthMax);

    }



    var performCounter = function (counterer, target) {

        document.getElementsByClassName("audio-riposte")[0].play();
        
        var damage = counterer.damage * 2;

        alert(counterer.title + " countered dealing " + damage + " damage.");

        target.health -= damage;

        if (target.health <= 0) {
            target.health = 0;
        }

        $(target.healthProgress).attr("value", target.health);
        $(target.healthText).text(target.health + "/" + target.healthMax);

    }



    var performRestore = function (target) {
        document.getElementsByClassName("audio-restore")[0].play();

        alert(target.title + " restored " + target.restoreAmount + " health and " + target.energyRestore + " energy.");

        target.health += target.restoreAmount;

        target.energy += target.energyRestore;

        if (target.health >= target.healthMax) {
            target.health = target.healthMax;
        }

        if (target.energy >= target.energyMax) {
            target.energy = target.energyMax;
        }

        $(target.healthProgress).attr("value", target.health);
        $(target.healthText).text(target.health + "/" + target.healthMax);

        $(target.energyText).text(target.energy);
    }




    var winnerCheck = function () {


        if (you.health <= 0) {

            document.getElementsByClassName("audio-lost")[0].play();

            you.health = 0;

            disableActions();

            $(you.healthProgress).attr("value", you.health);
            $(you.healthText).text(you.health + "/" + you.healthMax);

            alert("You have been defeated!");

        }


        if (enemy.health <= 0) {

            document.getElementsByClassName("audio-cheer")[0].play();

            enemy.health = 0;

            disableActions();

            $(enemy.healthProgress).attr("value", enemy.health);
            $(enemy.healthText).text(enemy.health + "/" + enemy.healthMax);

            alert("You defeated the enemy!");

        }


    }




    var castSwordSpell = function (target, spellNoteSuccess, spellNoteFail, energyCost, energyChance, energyMultiplier, energyAdder, 
        healthCostDivider, healthCostSubtractor) 
    {

        if(target.energy < energyCost)
        {
            alert("Not enough energy to cast this sword spell... Need " + energyCost + " energy!");

            return false;
        }

        document.getElementsByClassName("audio-bladespell")[0].play();

        target.energy -= energyCost;
        $(target.energyText).text(target.energy);

        var random = Math.floor(Math.random() * energyChance);

        

        if (random == 0) 
        {

            if(energyMultiplier !== -1)
            {
                target.damage *= energyMultiplier;
            }

            else if(energyAdder !== -1)
            {
                target.damage += energyAdder;
            }

            alert(spellNoteSuccess);

            return true;

        }
        
        else 
        {
            
            if(healthCostDivider !== -1){
                target.health /= healthCostDivider;
                target.health = Math.round(target.health);
            }

            else if( healthCostSubtractor !== -1){
                target.health -= healthCostSubtractor;
            }


            if (target.health <= 0) {
                target.health = 0;
            }

            $(target.healthProgress).attr("value", target.health);
            $(target.healthText).text(target.health + "/" + target.healthMax);

            alert(spellNoteFail);

            return false;

        }
    }










    // Player actions.

    function youAttack() {

        disableActions();

        setTimeout(function () {

            performAttack(you, enemy);

            enemy.counterAllowed = true;
            you.counterAllowed = false;

            winnerCheck();

            if (enemy.health > 0) {
                enemyMove();
            }

        }, 1100);

    }



    function youRestore() {

        disableActions();

        setTimeout(function () {

            performRestore(you);

            enemy.counterAllowed = false;

            winnerCheck();

            if (enemy.health > 0) {
                enemyMove();
            }
        }, 1100);

    }






    function youCounter() {

        if (enemy.health > 0) {
            enemyMove();

            disableActions();
        }


        setTimeout(function () {

            disableActions();

            winnerCheck();

            if (you.counterAllowed) {
                
                setTimeout(function () {

                    performCounter(you, enemy);

                    enableActions();

                    winnerCheck();

                }, 1100);

            }


            else {

                setTimeout(function () {

                    alert("You failed your counter");

                    enableActions();

                    winnerCheck();

                }, 1100);

            }

                
            you.counterAllowed = false;
            enemy.counterAllowed = false;

        }, 1100);


    }




    function youCastHolyBladeSpell() {

        disableActions();

        setTimeout(function () {

            castSwordSpell(
                you,
                you.title + " cast Holy Blade spell imbuing your sword with blistering holy energy. Your sword is now three times more powerful!",
                you.title + " failed to cast Holy Blade spell! You are left weakened and half your health points have been drained...",
                100, 2, 3, -1, 2, -1
            );

            enemy.counterAllowed = false;

            winnerCheck();

            if (enemy.health > 0) {
                enemyMove();
            }
            
        }, 1100);

    }










    // Enemy actions.

    function enemyMove() {

        winnerCheck();

        var random = Math.floor(Math.random() * 3);

        switch (random) {
                
            case 0: {

                if(enemy.usedFireBladeSpell === false && enemy.energy >= 25 && enemy.health > 10 ){
                        
                    var randomSpellCast = Math.floor(Math.random() * 4);
                    if( randomSpellCast === 3 ){
                        enemyCastFireBladeSpell();
                    }
                    else {
                        enemyAttack();
                    }
                }
                else {
                    enemyAttack();
                }

                break;
            }

            case 1: {
                enemyRestore();
                break;
            }

            case 2: {
                enemyCounter();
                break;
            }

        }

    }



    function enemyAttack() {

        setTimeout(function () {

            performAttack(enemy, you);

            you.counterAllowed = true;
            enemy.counterAllowed = false;

            enableActions();

            winnerCheck();

        }, 1100);

    }



    function enemyRestore() {

        setTimeout(function () {

            performRestore(enemy);

            you.counterAllowed = false;
            enemy.counterAllowed = false;

            enableActions();

            winnerCheck();

        }, 1100);

    }



    function enemyCounter() {

        if (enemy.counterAllowed) {

            winnerCheck();

            setTimeout(function () {

                performCounter(enemy, you);

                enableActions();

                winnerCheck();

            }, 1100);

        }

        else {

            setTimeout(function () {

                alert("Enemy failed his counter");

                enableActions();

                winnerCheck();

            }, 1100);

        }

        you.counterAllowed = false;
        enemy.counterAllowed = false;


        winnerCheck();

    }




    function enemyCastFireBladeSpell() {

        setTimeout(function () {

            var result = castSwordSpell(
                enemy,
                enemy.title + " cast Fire Blade spell imbuing it with +4 flame damage!",
                enemy.title + " failed to cast Fire Blade spell and is drained by 10 health points...",
                25, 4, -1, 4, -1, 10
            );

            if( result === true ){
                enemy.usedFireBladeSpell = true;
            }

            you.counterAllowed = true;
            enemy.counterAllowed = false;

            enableActions();

            winnerCheck();

        }, 1100);



    }





    








    // Public functions.
    return {

        youAttack: youAttack,
        youCounter: youCounter,
        youRestore: youRestore,
        youCastHolyBladeSpell: youCastHolyBladeSpell,
        restartGame : restartGame

    };








})();











