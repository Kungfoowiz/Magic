

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


});



var firstLife = true;
var firstmaxHealth = 100;
var firstHealth = 100;

var firstDamage = 10;
var firstRestore = 5;

var firstCounter = false;
var firstEnergy = 100;
var firstEnergyRestore = 20;

var secondmaxHealth = 100;
var secondHealth = 100;

var secondDamage = 12;
var secondRestore = 5;

var secondCounter = false;


$(function(){
    $("#firstProgress").attr("max", firstmaxHealth);
    $("#firstProgress").attr("value", firstHealth);
    $("#secondProgress").attr("max", secondmaxHealth);
    $("#secondProgress").attr("value", secondHealth);
    $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);
    $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);
    $("#fEnergyDisplay").text(firstEnergy);
});



function youAttack(){

    if (firstLife) {

        $("button").attr("disabled", "disabled");

        setTimeout(function(){

            secondHealth -= firstDamage;

            alert("You attack dealing " + firstDamage + " damage.");
    
            $("#secondProgress").attr("value", secondHealth);
            $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);
    

            secondCounter = true;
            firstCounter = false;
    
            winnerCheck();
    
            if(secondHealth > 0){
                enemyMove();
            }

        }, 1100);

    }

}



function youRestore(){

    if (firstLife) {

        $("button").attr("disabled", "disabled");
        setTimeout(function(){
        firstHealth += firstRestore;
            if(firstHealth >= firstmaxHealth){
                firstHealth = firstmaxHealth;
            }
            $("#firstProgress").attr("value", firstHealth);
            $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);
    
            youEnergy();
    
            alert("You restored " + firstRestore + " health and " + firstEnergyRestore + " energy.")
    
            secondCounter = false;
    
            winnerCheck();
    
            if(secondHealth > 0){
                enemyMove();
            }
        }, 1100);

    }

}


function youCounter() {

    if(secondHealth > 0){
        enemyMove();
        $("button").attr("disabled", "disabled");
    }

    setTimeout(function(){

        $("button").attr("disabled", "disabled");

        if (firstLife) {
            winnerCheck();
            if (firstCounter) {

                setTimeout(function(){
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

            firstCounter = false;
            secondCounter = false;

        }

    }, 1100);

}


function youEnergy() {

    winnerCheck();

    if (firstLife) {
        firstEnergy += firstEnergyRestore;
        $("#fEnergyDisplay").text(firstEnergy);
    }

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

        firstHealth -= secondDamage;
        $("#firstProgress").attr("value", firstHealth);
        $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);
        
        alert("Enemy attack dealing " + secondDamage + " damage.");
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

    if(firstHealth <= 0){
        firstHealth = 0;
        firstLife = false;

        $("button").attr("disabled", "disabled");
        $("#firstProgress").attr("value", firstHealth);
        $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);

        alert("Enemy win");
    }

    if(secondHealth <= 0){
        secondHealth = 0;

        $("button").attr("disabled", "disabled");
        $("#secondProgress").attr("value", secondHealth);
        $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);

        alert("You win");
    }

}