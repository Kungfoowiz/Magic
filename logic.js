var story = true;

var firstLife = true;
var firstmaxHealth = 100;
var firstHealth = 100;
var firstDamage = 10;
var firstRestore = 5;
var firstCounter = false;
var firstEnergy = 100;
var firstEnergyRestore = 20;
var firstBlindingWhiskers = 0;
var firstPoisonPoop = 0;
var firstIronTail = 0;
var firstFurStack = 0;

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
    if(firstLife){
    //youAttackAnim();
    $("button").attr("disabled", "disabled");
    setTimeout(function(){
    //if(firstIronTail <= 0){
        secondHealth -= firstDamage;
        alert("You attack dealing " + firstDamage + " damage.");
    //}
    //else{
    //    secondHealth -= (firstDamage * 2)
    //    firstIronTail--;
    //    alert("You attack dealing " + (firstDamage * 2) + " damage.");
    //}
    
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
    if(firstLife){
    //youRestoreAnim();
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


function youCounter(){
    if(secondHealth > 0){
        enemyMove();
        $("button").attr("disabled", "disabled");
    }
    setTimeout(function(){
    $("button").attr("disabled", "disabled");
    if(firstLife){
    winnerCheck();
    if(firstCounter){
        //youCounterAnim();
        setTimeout(function(){
        secondHealth -= (secondDamage * 2);
        $("#secondProgress").attr("value", secondHealth);
        $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);
        alert("You countered dealing " + (secondDamage * 2) + " damage.");
        $("button").removeAttr("disabled");
        winnerCheck();
        }, 1100);
    }
    else{
        //youCounterFailAnim();
        setTimeout(function(){
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


function youEnergy(){
    winnerCheck();
    if(firstLife){
    firstEnergy += firstEnergyRestore;
    $("#fEnergyDisplay").text(firstEnergy);
    }
}


//////////////////////////////////


function enemyMove(){
    winnerCheck();
    var random = Math.floor(Math.random() * 3);
    
//youActivatePoisonPoop();
    switch(random){
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

function enemyAttack(){
    //if(firstBlindingWhiskers <= 0){
        //enemyAttackAnim();
        setTimeout(function(){
        firstHealth -= secondDamage;
        $("#firstProgress").attr("value", firstHealth);
        $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);
        
        alert("Enemy attack dealing " + secondDamage + " damage.");
        firstCounter = true;
        secondCounter = false;
        if(firstFurStack > 0){
            firstFurStack = 0;
            alert("Your Fur Stack resets");
        }
        $("button").removeAttr("disabled");
        winnerCheck();
    }, 1100);
    //}
    //else{
    //     enemyBlindAnim();
    //     setTimeout(function(){
    //     firstBlindingWhiskers--;
    //     alert("Enemy blinded. Attack missed.")
    //     $("button").removeAttr("disabled");
    //     winnerCheck();
    //}, 1100);
    //}
}

function enemyRestore(){
    //enemyRestoreAnim();
    setTimeout(function(){
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
    if(firstBlindingWhiskers <= 0){
    if(secondCounter){
        winnerCheck();
        //enemyCounterAnim();
        setTimeout(function(){
        firstHealth -= (firstDamage * 2);
        $("#firstProgress").attr("value", firstHealth);
        $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);
        
        alert("Enemy countered dealing " + (firstDamage * 2) + " damage.");
        if(firstFurStack > 0){
            firstFurStack = 0;
            alert("Your Fur Stack resets");
        }
        $("button").removeAttr("disabled");
        winnerCheck();
        }, 1100);        
    }
    else{
        //enemyCounterFailAnim();
        setTimeout(function(){
        alert("Enemy failed his counter");
        $("button").removeAttr("disabled");
        winnerCheck();
        }, 1100);
    }
    }
    else{
        //enemyBlindAnim();
        setTimeout(function(){
        alert("Enemy blinded. Counter missed.");
        firstBlindingWhiskers--;
        $("button").removeAttr("disabled");
        }, 1100);
    }
    secondCounter = false;
    firstCounter = false;
    
    winnerCheck();
}


/////////////

function winnerCheck(){
    if(firstHealth <= 0){
        firstHealth = 0;
        firstLife = false;
        $("button").attr("disabled", "disabled");
        $("#firstProgress").attr("value", firstHealth);
        $("#fHealthDisplay").text(firstHealth + "/" + firstmaxHealth);
        alert("Enemy win")
;
    }
    if(secondHealth <= 0){
        secondHealth = 0;
        $("button").attr("disabled", "disabled");
        $("#secondProgress").attr("value", secondHealth);
        $("#sHealthDisplay").text(secondHealth + "/" + secondmaxHealth);
        alert("You win")
;
    }
}




//Animation


function youAttackAnim(){
    $("#fImage").animate({top: "-80px", left: "120px"}, 400);
    $("#fImage").animate({top: "-70px", left: "140px"}, 200, enemyFall);
    $("#fImage").animate({top: "-70px", left: "140px"}, 0, attackSound);
    $("#fImage").animate({top: "0", left: "0"}, 300);
}

function youCounterAnim(){
    $("#fImage").animate({top: "80px", left: "130px"}, 400, counterSound);
    $("#fImage").animate({top: "-30px", left: "160px"}, 100, enemyFall);
    $("#fImage").animate({top: "0", left: "0"}, 400);
}

function youCounterFailAnim(){
    $("#fImage").animate({top: "80px", left: "130px"}, 400);
    $("#fImage").animate({top: "0", left: "0"}, 500);
}


function youRestoreAnim(){
    $("#fImage").animate({top: "-20px"}, 200, restoreSound);
    $("#fImage").animate({top: "0px"}, 100);
    $("#fImage").animate({top: "-20px"}, 200);
    $("#fImage").animate({top: "0px"}, 100);
    $("#fImage").animate({top: "-20px"}, 200);
    $("#fImage").animate({top: "0px"}, 200);
}

function youNoEnergyAnim(){
    $("#fImage").animate({left: "-20px"}, 200);
    $("#fImage").animate({left: "0px"}, 100);
    $("#fImage").animate({left: "-20px"}, 200);
    $("#fImage").animate({left: "0px"}, 100);
    $("#fImage").animate({left: "-20px"}, 200);
    $("#fImage").animate({left: "0px"}, 200);
}


//function youIronTailAnim(){
//    setTimeout(function(){
//        $("#iron").css("transform", "skew(20deg)");
//    }, 250);
//    setTimeout(function(){
//        $("#iron").css("display", "none");
//    }, 500);
//    setTimeout(function(){
//        $("#iron").css("display", "none");
//    }, 750);
//    setTimeout(function(){
//        $("#iron").css("display", "none");
//    }, 1000);
//}

/////////


//function enemyAttackAnim(){
//    $("#sImage").animate({top: "80px", left: "-130px"}, 400);
//    $("#sImage").animate({top: "90px", left: "-140px"}, 200, youFall);
//    $("#sImage").animate({top: "90px", left: "-140px"}, 0, attackSound);
//    $("#sImage").animate({top: "0", left: "0"}, 300);
//}

//function enemyBlindAnim(){
//    $("#sImage").animate({top: "10px", left: "-110px"}, 400);
//    $("#sImage").animate({top: "-30px", left: "-140px"}, 200);
//    $("#sImage").animate({top: "0", left: "0"}, 300);
//}

//function enemyCounterAnim(){
//    $("#sImage").animate({top: "-40px", left: "-100px"}, 400, counterSound);
//    $("#sImage").animate({top: "30px", left: "-160px"}, 100, youFall);
//    $("#sImage").animate({top: "0", left: "0"}, 400);
//}

//function enemyCounterFailAnim(){
//    $("#sImage").animate({top: "-40px", left: "-100px"}, 400);
//    $("#sImage").animate({top: "0", left: "0"}, 500);
//}

//function enemyRestoreAnim(){
//    $("#sImage").animate({top: "-20px"}, 200, restoreSound);
//    $("#sImage").animate({top: "0px"}, 100);
//    $("#sImage").animate({top: "-20px"}, 200);
//    $("#sImage").animate({top: "0px"}, 100);
//    $("#sImage").animate({top: "-20px"}, 200);
//    $("#sImage").animate({top: "0px"}, 100);
//}



/////

//function enemyFall(){
//    $("#sImage").animate({top: "10px", left: "15px"}, 100);
//    $("#sImage").animate({top: "0", left: "0"}, 400);
//}

//function youFall(){
//    $("#fImage").animate({top: "10px", left: "-15px"}, 100);
//    $("#fImage").animate({top: "0", left: "0"}, 400);
//}


//////Sounds

//function attackSound(){
//    document.getElementById("attackSound").play()
//}

//function restoreSound(){
//    document.getElementById("restoreSound").play()
//}

//function counterSound(){
//    document.getElementById("counterSound").play()
//}