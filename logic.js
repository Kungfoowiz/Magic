

var game = (function () 
{
    var version = 1.002;

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

    $(function() 
    {
        $(".whatever").fadeOut();

        $(".start-game").on("click", function() 
        {
            $(".splash").fadeOut();

            $(".gameboard").fadeIn();

            document.getElementsByClassName("audio-pageturn")[0].play();
            
            document.getElementsByClassName("audio-control")[0].play();

            $(".whatever").fadeIn();
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

    var you = (function() 
    {
        var title = "Knight (Level 1)";

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





    var enemy = (function() 
    {
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



    var isGameOver = function ()
    {
        var gameOver = false;

        if (you.health <= 0) 
        {
            document.getElementsByClassName("audio-lost")[0].play();

            you.health = 0;

            $(you.healthProgress).attr("value", you.health);
            $(you.healthText).text(you.health + "/" + you.healthMax);

            gameOver = true;
        }

        if (enemy.health <= 0) 
        {
            document.getElementsByClassName("audio-cheer")[0].play();

            enemy.health = 0;

            $(enemy.healthProgress).attr("value", enemy.health);
            $(enemy.healthText).text(enemy.health + "/" + enemy.healthMax);

            gameOver = true;
        }

        return gameOver;
    }



    var progressGame = function(allowEnemyMove = true)
    {
        if(isGameOver() === false)
        {
            if(allowEnemyMove === true)
            {
                enemyMove();
            }
        }

        if(isGameOver() === true)
        {
            if(you.health <= 0)
            {
                addGameLog("You died!");
            }

            if(enemy.health <= 0)
            {
                addGameLog(enemy.title + " died!");   
            }
        }
        else
        {
            enableActions();
        }
    }



    // Add game log entry.
    var addGameLog = function( text )
    {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(text));
        var ul = document.getElementsByClassName("gamelog")[0];
        
        ul.insertBefore(li, ul.childNodes[0]);
    }



    var resetGameLog = function()
    {
        var ul = document.getElementsByClassName("gamelog")[0];
        var li = ul.lastElementChild;

        while(li)
        {
            ul.removeChild(li);

            li = ul.lastElementChild;
        }
    }



    var disableActions = function () 
    {
        $(".action").fadeTo(100, 0.2);
        $(".action").attr("disabled", "disabled");
    }

    

    var enableActions = function () 
    {
        $(".action").fadeTo(50, 1.0);
        $(".action").removeAttr("disabled");
    }




    var restartGame = function()
    {
        document.getElementsByClassName("audio-chain")[0].play();

        resetCreature(you, youHealthMax, youDamage, youRestoreAmount, youEnergyMax, youEnergyRestore, 
            ".you-health-progress", ".you-health-text", ".you-energy-text", ".you--title", 
            ".you--avatar img", "https://www.dropbox.com/s/88u536v6zrx54tr/Sparring-knight.png?dl=1");

        resetCreature(enemy, enemyHealthMax, enemyDamage, enemyRestoreAmount, enemyEnergyMax, enemyEnergyRestore, 
            ".enemy-health-progress", ".enemy-health-text", ".enemy-energy-text", ".enemy--title", 
            ".enemy--avatar img", "https://www.dropbox.com/s/9c5x17coag5vnay/GoblinSilo.png?dl=1");
        enemy.usedFireBladeSpell = false;

        $(".gameboard").fadeOut();

        $(".splash").fadeIn();

        $(".whatever").fadeOut();

        resetGameLog();

        enableActions();
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

    



    var performAttack = function (attacker, target) 
    {    
        document.getElementsByClassName("audio-attack")[0].play();
        
        addGameLog(attacker.title + " attack dealing " + attacker.damage + " damage.");

        target.health -= attacker.damage;

        if (target.health <= 0) {
            target.health = 0;
        }

        $(target.healthProgress).attr("value", target.health);
        $(target.healthText).text(target.health + "/" + target.healthMax);
    }



    var performCounter = function (counterer, target) 
    {
        document.getElementsByClassName("audio-riposte")[0].play();
        
        var damage = counterer.damage * 2;

        addGameLog(counterer.title + " countered dealing " + damage + " damage.");

        target.health -= damage;

        if (target.health <= 0) 
        {
            target.health = 0;
        }

        $(target.healthProgress).attr("value", target.health);
        $(target.healthText).text(target.health + "/" + target.healthMax);
    }



    var performRestore = function (target) 
    {
        document.getElementsByClassName("audio-restore")[0].play();

        addGameLog(target.title + " restored " + target.restoreAmount + " health and " + target.energyRestore + " energy.");

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



    var castSwordSpell = function (
        target, spellNoteSuccess, spellNoteFail, energyCost, energyChance, energyMultiplier, energyAdder, 
        healthCostDivider, healthCostSubtractor) 
    {
        if(target.energy < energyCost)
        {
            addGameLog("Not enough energy to cast this sword spell... Need " + energyCost + " energy!");

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

            addGameLog(spellNoteSuccess);

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

            addGameLog(spellNoteFail);

            return false;
        }
    }










    // Player actions.

    function youAttack()
    {
        disableActions();

        performAttack(you, enemy);

        enemy.counterAllowed = true;
        you.counterAllowed = false;

        progressGame();
    }



    function youRestore() 
    {
        disableActions();

        performRestore(you);
            
        enemy.counterAllowed = false;
            
        progressGame();
    }



    function youCounter() 
    {
        disableActions();

        if(isGameOver() === false)
        {
            enemyMove();
        }

        if (you.counterAllowed)
        {
            performCounter(you, enemy);
        }
        else 
        {
            addGameLog("You failed to counter");
        }

        you.counterAllowed = false;
        enemy.counterAllowed = false;

        progressGame(false);
    }



    function youCastHolyBladeSpell() 
    {
        disableActions();
        
        castSwordSpell(
            you,
            you.title + " cast Holy Blade spell imbuing your sword with blistering holy energy. Your sword is now three times more powerful!",
            you.title + " failed to cast Holy Blade spell! You are left weakened and half your health points have been drained...",
            100, 2, 3, -1, 2, -1
        );

        enemy.counterAllowed = false;

        progressGame();
    }










    // Enemy actions.

    function enemyMove() 
    {
        var random = Math.floor(Math.random() * 3);

        switch (random) 
        {       
            case 0: 
            {

                if(enemy.usedFireBladeSpell === false && enemy.energy >= 25 && enemy.health > 10 )
                {
                    var randomSpellCast = Math.floor(Math.random() * 4);
                    if( randomSpellCast === 3 )
                    {
                        enemyCastFireBladeSpell();
                    }
                    
                    else 
                    {
                        enemyAttack();
                    }
                }

                else 
                {
                    enemyAttack();
                }

                break;
            }

            case 1: 
            {
                enemyRestore();
                break;
            }

            case 2: 
            {
                enemyCounter();
                break;
            }
        }
    }



    function enemyAttack() 
    {
        performAttack(enemy, you);

        you.counterAllowed = true;
        enemy.counterAllowed = false;
    }



    function enemyRestore() 
    {
        performRestore(enemy);

        you.counterAllowed = false;
        enemy.counterAllowed = false;
    }



    function enemyCounter() 
    {
        if (enemy.counterAllowed) 
        {
            performCounter(enemy, you);
        }
        else 
        {
            addGameLog("Enemy failed his counter");
        }

        you.counterAllowed = false;
        enemy.counterAllowed = false;
    }



    function enemyCastFireBladeSpell() 
    {
        var result = castSwordSpell(
            enemy,
            enemy.title + " cast Fire Blade spell imbuing it with +4 flame damage!",
            enemy.title + " failed to cast Fire Blade spell and is drained by 10 health points...",
            25, 4, -1, 4, -1, 10
        );

        if( result === true )
        {
            enemy.usedFireBladeSpell = true;
        }

        you.counterAllowed = true;
        enemy.counterAllowed = false;
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