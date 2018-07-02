

$(function () {

    var collapsible = function (targetElement, collapseWidth, expandedWidth) {

        var target = $(targetElement);
        var widthCollapsed = collapseWidth;
        var widthExpanded = expandedWidth;

        var collapseMenu = function () {
            target.animate({ width: widthCollapsed }, { queue: false, duration: 500 });
        }

        var expandMenu = function () {
            target.animate({ width: widthExpanded }, { queue: false, duration: 500 });
        }

        collapseMenu();

        target.on("mouseover", function () {
            expandMenu();
        });

        target.on("mouseout", function () {
            collapseMenu();
        });

    }

    var audioCollapsible = new collapsible(".audio-control", "20px", "300px");





    var disableActions = function () {
        $(".action").attr("disabled", "disabled");
    }



    var performAttack = function (damage, title, targetHealth, targetHealthMax, targetProgressHealth, targetProgressText) {
        alert(title + " attack dealing " + damage + " damage.");

        targetHealth -= damage;

        if (targetHealth <= 0) {
            targetHealth = 0;
        }

        $(targetProgressHealth).attr("value", targetHealth);
        $(targetProgressText).text(targetHealth + "/" + targetHealthMax);
    }

    var performRestore = function (restore, title, targetHealth, targetHealthMax, targetProgressHealth, targetProgressText) {
        alert(title + " restored " + restore + " health.");

        targetHealth += restore;

        if (targetHealth >= targetHealthMax) {
            targetHealth = targetHealthMax;
        }

        $(targetProgressHealth).attr("value", targetHealth);
        $(targetProgressText).text(targetHealth + "/" + targetHealthMax);
    }


});



var youLife = true;

var youHealth = 100;
var youHealthMax = 100;
var youDamage = 10;
var youRestore = 5;

var youCounter = false;
var youEnergy = 100;
var youEnergyRestore = 20;



var enemyHealth = 100;
var enemyHealthMax = 100;
var enemyDamage = 12;
var enemyRestore = 5;

var enemyCounter = false;




$(function () {

    $(".you-health-progress").attr("value", youHealth);
    $(".you-health-progress").attr("max", youHealthMax);
    $(".you-health-text").text(youHealth + "/" + youHealthMax);
    $(".you-energy-text").text(youHealth);

    $(".enemy-health-progress").attr("value", enemyHealth);
    $(".enemy-health-progress").attr("max", enemyHealthMax);
    $(".enemy-health-text").text(enemyHealth + "/" + enemyHealthMax);

});







function youAttack(){

    if (youLife) {

        disableActions();

        setTimeout(function () {

            performAttack(youDamage, "You", enemyHealth, enemyHealthMax, ".enemy-health-progress", ".enemy-health-text");
    
            enemyCounter = true;
            youCounter = false;
    
            winnerCheck();
    
            if(enemyHealth > 0){
                enemyMove();
            }

        }, 1100);

    }

}



function youRestore(){

    if (youLife) {

        disableActions();

        setTimeout(function () {

            performRestore(youRestore, "You", youHealth, youHealthMax, ".enemy-health-progress", ".enemy-health-text");
    
            youEnergy();
    
            enemyCounter = false;
    
            winnerCheck();
    
            if(enemyHealth > 0){
                enemyMove();
            }
        }, 1100);

    }

}



function youEnergy() {

    winnerCheck();

    if (youLife) {
        youEnergy += youEnergyRestore;
        $(".you-energy-text").text(youEnergy);

        alert("You restored " + youEnergyRestore + " energy.");
    }

}


function youCounter() {

    if(enemyHealth > 0){
        enemyMove();

        disableActions();
    }


    setTimeout(function(){

        disableActions();


        if (youLife) {

            winnerCheck();

            if (youCounter) {


                setTimeout(function () {

                    secondHealth -= (secondDamage * 2);
                    $("#secondProgress").attr("value", secondHealth);
                    $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);
                    alert("You countered dealing " + (secondDamage * 2) + " damage.");
                    $("button").removeAttr("disabled");
                    winnerCheck();

                }, 1100);

            }


            else {

                setTimeout(function () {

                    alert("You failed your counter");
                    $("button").removeAttr("disabled");
                    winnerCheck();

                }, 1100);

            }

            youCounter = false;
            enemyCounter = false;

        }

    }, 1100);


}


//////////////////////////////////


function enemyMove(){

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

        performAttack(enemyDamage, "Enemy", youHealth, youHealthMax, ".you-health-progress", ".you-health-text");

        firstCounter = true;
        secondCounter = false;

        $("button").removeAttr("disabled");
        winnerCheck();

    }, 1100);

}



function enemyRestore() {

    setTimeout(function () {

        secondHealth += secondRestore;

        if(secondHealth >= secondmaxHealth){
            secondHealth = secondmaxHealth;
        }

        $("#secondProgress").attr("value", secondHealth);
        $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);
        alert("The enemy restored " + secondRestore + " health.")
    
        if(firstBlindingWhiskers > 0){
            firstBlindingWhiskers--;
        }
    
        firstCounter = false;
        secondCounter = false;
        $("button").removeAttr("disabled");

        winnerCheck();

    }, 1100);

}



function enemyCounter(){

    if (secondCounter) {

        winnerCheck();

        setTimeout(function(){
            firstHealth -= (firstDamage * 2);
            $("#firstProgress").attr("value", firstHealth);
            $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);
        
            alert("Enemy countered dealing " + (firstDamage * 2) + " damage.");

            if (firstFurStack > 0) {

                firstFurStack = 0;

                alert("Your Fur Stack resets");
            }

            $("button").removeAttr("disabled");
            winnerCheck();
        }, 1100);        

    }

    else {

        setTimeout(function () {

            alert("Enemy failed his counter");
            $("button").removeAttr("disabled");

            winnerCheck();

        }, 1100);

    }

    secondCounter = false;
    firstCounter = false;
    
    winnerCheck();
}




////////////////////





function winnerCheck() {


    if(youHealth <= 0){

        youHealth = 0;
        firstLife = false;

        disableActions();

        $("#firstProgress").attr("value", firstHealth);
        $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);

        alert("Enemy win");

    }


    if(secondHealth <= 0){

        secondHealth = 0;

        disableActions();

        $("#secondProgress").attr("value", secondHealth);
        $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);

        alert("You win");

    }


}