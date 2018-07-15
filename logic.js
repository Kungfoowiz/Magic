

var game = (function () {
    





    // Initialisation.

    $(function () {



        $(you.healthProgress).attr("value", you.health);
        $(you.healthProgress).attr("max", you.healthMax);
        $(you.healthText).text(you.health + "/" + you.healthMax);
        $(you.energyText).text(you.health);


        $(enemy.healthProgress).attr("value", enemy.health);
        $(enemy.healthProgress).attr("max", enemy.healthMax);
        $(enemy.healthText).text(enemy.health + "/" + enemy.healthMax);


    });







    // Game objects.

    var you = (function () {
        var title = "You";

        var life = true;

        var health = 100;
        var healthMax = 100;
        var damage = 10;
        var restoreAmount = 5;

        var counterAllowed = false;
        var energy = 100;
        var energyRestore = 20;

        var healthProgress = ".you-health-progress";
        var healthText = ".you-health-text";
        var energyText = ".you-energy-text";

        return {
            title: title,

            life: life,

            health: health,
            healthMax: healthMax,
            damage: damage,
            restoreAmount: restoreAmount,

            counterAllowed: counterAllowed,
            energy: energy,
            energyRestore: energyRestore,

            healthProgress: healthProgress,
            healthText: healthText,
            energyText: energyText
        };

    })();





    var enemy = (function () {
        var title = "Enemy";

        var health = 100;
        var healthMax = 100;
        var damage = 12;
        var restoreAmount = 5;

        var counterAllowed = false;

        var healthProgress = ".enemy-health-progress";
        var healthText = ".enemy-health-text";

        return {
            title: title,

            health: health,
            healthMax: healthMax,
            damage: damage,
            restoreAmount: restoreAmount,

            counterAllowed: counterAllowed,

            healthProgress: healthProgress,
            healthText: healthText,
        };

    })();










    // Game logic.

    var disableActions = function () {
        $(".action").attr("disabled", "disabled");
    }

    var enableActions = function () {
        $(".action").removeAttr("disabled");
    }

    



    var performAttack = function (attacker, target) {
        alert(attacker.title + " attack dealing " + attacker.damage + " damage.");

        target.health -= attacker.damage;

        if (target.health <= 0) {
            target.health = 0;
        }

        $(target.healthProgress).attr("value", target.health);
        $(target.healthText).text(target.health + "/" + target.healthMax);
    }



    var performCounter = function (counterer, target) {
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
        alert(target.title + " restored " + target.restoreAmount + " health.");

        target.health += target.restoreAmount;

        if (target.health >= target.healthMax) {
            target.health = target.healthMax;
        }

        $(target.healthProgress).attr("value", target.health);
        $(target.healthText).text(target.health + "/" + target.healthMax);
    }




    var winnerCheck = function () {


        if (you.health <= 0) {

            you.health = 0;
            you.life = false;

            disableActions();

            $(you.healthProgress).attr("value", you.health);
            $(you.healthText).text(you.health + "/" + you.healthMax);

            alert("Enemy win");

        }


        if (enemy.health <= 0) {

            enemy.health = 0;

            disableActions();

            $(enemy.healthProgress).attr("value", enemy.health);
            $(enemy.healthText).text(enemy.health + "/" + enemy.healthMax);

            alert("You win");

        }


    }












    // Player actions.

    function youAttack() {

        if (you.life) {

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

    }



    function youRestore() {

        if (you.life) {

            disableActions();

            setTimeout(function () {

                performRestore(you);

                //youEnergy();

                enemy.counterAllowed = false;

                winnerCheck();

                if (enemy.health > 0) {
                    enemyMove();
                }
            }, 1100);

        }

    }



    function youEnergy() {

        winnerCheck();

        if (you.life) {
            you.energy += you.energyRestore;
            $(you.energyText).text(you.energy);

            alert(you.title + " restored " + you.energyRestore + " energy.");
        }

    }



    function youCounter() {

        if (enemy.health > 0) {
            enemyMove();

            disableActions();
        }


        setTimeout(function () {

            disableActions();


            if (you.life) {

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

            }

        }, 1100);


    }









    // Enemy actions.

    function enemyMove() {

        winnerCheck();

        var random = Math.floor(Math.random() * 3);


        switch (random) {
            case 0:
                enemyAttack();
                break;
            case 1:
                enemyRestore();
                break;
            case 2:
                enemyCounter();
                break;
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





    








    // Public functions.
    return {

        youAttack: youAttack,
        youCounter: youCounter,
        youRestore: youRestore

    };








})();











