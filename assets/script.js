/*
1) First, player reads some intro text that leads to the choice of the fighting char

2) four pictures are displayed on screen for player to choose from, player chooses one
text displayed and then char must click button at bottom to confirm

3) when player chooses a character, More text explaining the situation that character must fight other characters

4) that character's pic is displayed and remaining characters are shown
so player can pick an opponent

5) when player chooses an opponent, player portrait is shown along with opponent,
options given for battle, after defeat, some text shown, then go to 4), 
if no more opponents, go to 6)

6) winning ending text, option to play again, go to 2 or 3
7) losing text, asked to play again, go to 2 or 3

*/

//initial page load can have intro text and button to begin

//function to select character

//function to reset everything

//play function will start at step 3

/*battle function takes (attacker, defender, action), (cpu, player, action) or (player, cpu, action)

function attack(){
 roll20();
  compare roll against defender.ac
  if hit, attacker.successfulAttackText
  defender.name takes blah points of dmg
  if miss, 
}    
*/

/*
var charObject = {
    name: blahblah,
    hp: 10
    strength: 10
    AC: 10
    playerImgSrc: facing right
    opponentImgSrc: facing left
    actions: {
        autoAttack: attack();
    }
    
}
*/
function printC (str) {
    str = str + '<br>';
    $('#combatText').append(str);
    // let element = $('#combatText');
    // element.scrollTop = element.scrollHeight;
}

//roll dice!
function roll(sided) {
    var x = Math.floor(Math.random() * sided + 1);
    return x;
}

function mod(score) {
    let x = Math.floor((score - 10) / 2);
    return x;
}

var charList = {
    char1: {
        name: 'Knight',
        HP: 40,
        AC: 15,
        MP: 0,
        SP: 4,
        strength: 17,
        dexterity: 11,
        constitution: 15,
        intelligence: 10, 
        wisdom: 15,
        charisma: 10,
        actions: {
            Attack: attackIt,
            Double_Slash: doubleAttack,
            Berserk: haste,
        },
        imgSrcLeft:'./assets/images/char6left.png',
        imgSrcRight:'./assets/images/char6right.png',
    },

    char2: {
        name: 'Sorcerer',
        HP: 25,
        AC: 8,
        MP: 2,
        SP: 4,
        strength: 9,
        dexterity: 11,
        constitution: 13,
        intelligence: 15, 
        wisdom: 15,
        charisma: 10,
        actions: {
            Attack: attackIt,
            Fireball: fireball,
        },
        imgSrcLeft:'./assets/images/char2left.png',
        imgSrcRight:'./assets/images/char2right.png',
    },
    char3: {
        name: 'Rogue',
        HP: 30,
        AC: 11,
        MP: 0,
        SP: 0,
        strength: 12,
        dexterity: 18,
        constitution: 11,
        intelligence: 14, 
        wisdom: 8,
        charisma: 10,
        actions: {
            Stab: attackIt,
        },
        imgSrcLeft:'./assets/images/char3left.png',
        imgSrcRight:'./assets/images/char3right.png',
    },

    char4: {
        name: 'Monk',
        HP: 35,
        AC: 11,
        MP: 0,
        SP: 7,
        strength: 13,
        dexterity: 14,
        constitution: 17,
        intelligence: 10, 
        wisdom: 15,
        charisma: 7,
        actions: {
            Punch: attackIt,
            Quick_Fist: doubleAttack,
            Inner_Chi: haste,
        },
        imgSrcLeft:'./assets/images/char4left.png',
        imgSrcRight:'./assets/images/char4right.png',
    }
}

function copy(oldObject) {
    var newObject = jQuery.extend(true, {}, oldObject);
    return newObject;
}

function debuff(char) {
    switch (char.debuff){
        case 'poison':
        char.HP-= 5;
        printC(char.name + " takes 5 pts of poison dmg!");
        char.poisonCounter--;
        if(char.poisonCounter < 0) {
            delete char.poisonCounter;
            delete char.debuff;
            printC(char.name + " is no longer poisoned");
        }
        break;
    }
}

//assign this to a button click, pass button id or value into str
function turn(char, opponent, act) {
    //what did player choose to do?
    //can player do that?
    let x = Object.keys(char.actions);
    if(x.indexOf(act) > -1) {        
        let y = char.actions[act];
        y(char, opponent);
    } else {
        printC('no such action!');
    }

    if(char.buff == 'haste') {
        char.hasteCounter--;
        if(char.hasteCounter < 0) {
            delete char.buff;
            delete char.hasteCounter;
        }
        return;
    }
    debuff(char);

    cpuTurn(opponent, char);
    printC(char.name + ' has ' + char.HP + 'HP left');
    printC(opponent.name + ' has ' + opponent.HP + 'HP left');
    printC('{-------------------------------}');
    
    
}

function cpuTurn(cpu, target) {
    let x = Object.keys(cpu.actions);
    let y = Math.floor(Math.random() * x.length);
    let z = x[y];
    let a = cpu.actions[z];
    a(cpu, target);

    //haste conditional
    if(cpu.buff == 'haste') {
        cpu.hasteCounter--;
        if(cpu.hasteCounter < 0) {
            delete cpu.buff;
            delete cpu.hasteCounter;
            return;
        } 
        cpuTurn(cpu, target);
    }
    debuff(cpu);

}

//debugging fx
function autoTurn(player, cpu) {
    cpuTurn(player, cpu);
    cpuTurn(cpu, player);
    printC(player.name + ' has ' + player.HP + 'HP left');
    printC(cpu.name + ' has ' + cpu.HP + 'HP left');
}

//basic attack fx
function attackIt(attacker, defender) {
    let diceRoll = roll(20);
    printC(attacker.name + " rolled: " + diceRoll);    
    if(diceRoll >= defender.AC) {
        let dmg = roll(6) + mod(attacker.strength);
        defender.HP-=dmg;
        printC(attacker.name + " attacks " + defender.name +"!");
        printC(defender.name + " takes " + dmg + " points of damage!");
    } else {
        printC(attacker.name + " attacks " + defender.name + " but misses!");
    }
}

//lazy implementation, change later
function doubleAttack(attacker, defender) {
    attackIt(attacker, defender);
    attackIt(attacker, defender);
    attacker.SP--;
    if(attacker.SP <= 0) {
        //get list of actions' function names
        let x = Object.values(attacker.actions);
        //find index of this function
        let y = x.indexOf(doubleAttack);
        //get list of actions' keys
        let z = Object.keys(attacker.actions)
        //delete this obj's action['thisFxName']
        delete attacker.actions[z[y]];        
    }
}

function fireball(attacker, defender) {
    let diceRoll = roll(20);
    printC(attacker.name + " rolled: " + diceRoll);    
    //all this junk gets the name of the key this function is stored to in char's object
    let x = Object.values(attacker.actions);
    let y = x.indexOf(fireball);
    let z = Object.keys(attacker.actions);

    if(diceRoll >= defender.dexterity) {
        let dmg = roll(attacker.intelligence);
        defender.HP-=dmg;
        printC(attacker.name + " casts " + z[y] + " at " + defender.name +"!");
        printC(defender.name + " takes " + dmg + " points of damage!");
    } else {
        printC(attacker.name + " casts " + z[y] + " at "  + defender.name + ", but " + defender.name + " dodges the blast!");
    }
    attacker.MP--;
    if(attacker.MP <= 0) {
        //get list of actions' function names
        let x = Object.values(attacker.actions);
        //find index of this function
        let y = x.indexOf(fireball);
        //get list of actions' keys
        let z = Object.keys(attacker.actions)
        //delete this obj's action['thisFxName']
        delete attacker.actions[z[y]];        
    }   
}

function haste(char) {
    char.buff = 'haste';
    char.hasteCounter = Math.floor(char.dexterity / 5);
    //all this junk gets the name of the key this function is stored to in char's object
    let x = Object.values(char.actions);
    let y = x.indexOf(haste);
    let z = Object.keys(char.actions);
    printC(char.name + " casts " + z[y] + "!");
    char.MP-=2;
    if(char.MP <= 0) {
        //get list of actions' function names
        let x = Object.values(char.actions);
        //find index of this function
        let y = x.indexOf(haste);
        //get list of actions' keys
        let z = Object.keys(char.actions)
        //delete this obj's action['thisFxName']
        delete char.actions[z[y]];        
    }   
}

function poison(attacker, defender) {
    let diceRoll = roll(20);
    printC("poison roll: " + diceRoll);
    let adjRoll = diceRoll + mod(defender.constitution)
    printC("poison roll + const mod: " + adjRoll);
    
    if (diceRoll + mod(defender.constitution) < 13) {
        defender.debuff = 'poison';
        defender.poisonCounter = 5 - mod(defender.constitution);
        printC(defender.name + " is poisoned!");
    }
}

//game shiz

$(document).ready(function () {
    var game = {
        //after intro text, this fx allows player to choose a character to play as
        characterSelect: function() {
            //clear body
            $('body').empty();
            //copy list of chars
            game.chars = copy(charList);
            //ask to pick char
            let intro = $('<h1>');
            intro.attr("id", "instr")
                .attr("class", "instr")
                .text("Choose your Character");
            $('body').append(intro);
            //get img for each char
            let charSelDiv = $('<div>');
            charSelDiv.addClass("charSelDiv");
            let x = Object.keys(game.chars);
            for (let i = 0; i < x.length; i++) {
                let y = $('<img>');
                let z = game.chars[x[i]];
                y.attr("src", z.imgSrcRight)
                    .attr("id", x[i]);
                //attach click fx for char to allowuser to choose
                y.on("click", function() {
                    game.playerChoose(this);
                });
                console.log(y);
                charSelDiv.append(y);
            }
            $('body').append(charSelDiv);
        },
        //after choosing a char, this fx sets up text to explain that char has to fight others
        playerChoose: function (x) {
            let y = $(x).attr("id");
            //make property for player obj
            game.player = copy(game.chars[y]);
            game.playerProto = copy(game.chars[y]);
            //remove player from list of chars
            delete game.chars[y];

            //create a counter for the remaining enemies
            let a = Object.keys(game.chars);
            game.foeCounter = a.length;
            console.log(game.foeCounter);
            game.storyPage(game.enemyChoose, "story shiz goes here, about like, how there's like, an arena and shit and you gotta fight some guys.");

        },//end playerChoose

        //this fx shows char pic and allows char to choose enemy
        enemyChoose: function () {
            $('body').empty();
            $('body').append(
                $('<div>').attr("id", "charPics").attr("class", "charPics")
            );//end append
            $('#charPics').append($('<img>')
                            .attr("src", game.player.imgSrcRight)
                            .attr("id", "player")
            );//end append
            $('body').append($('<h1>')
                        .attr("class", "instr")
                        .attr("id", "instr")
                        .text("Choose Your Opponent")
            );//end append
            //create opponent images
            let a = $('<div>').attr("id", "enemies").attr("class", "enemies");
            let x = Object.keys(game.chars);
            for(let i = 0; i < x.length; i++){
                let y = $('<img>');
                let z = game.chars[x[i]];
                y.attr("src", z.imgSrcRight)
                .attr("id", x[i])
                .on("click", function() {
                    game.enterBattle(this);
                });
                a.append(y);
            }

            $('body').append(a);
        },
        enterBattle: function(x) {
            //x is the pic, use the id
            let enemy = $(x).attr("id");
            game.currentOpponent = copy(game.chars[enemy]);
    
            //add pic of enemy to right of player
            let y = $('<img>')
                    .attr("src", game.currentOpponent.imgSrcLeft)
                    .attr("class", "currentOpponent")
                    .attr("id", enemy);
            $('#charPics').append(y);
            //remove enemy pics
            $('#enemies').remove();
            $('#instr').remove();
            //add div for combat text
            let textBox = $('<div>').attr("id", "combatText").attr("class", "combatText");
            $('body').append(textBox);
            //add div for btns
            let actionBtns = $('<div>').attr("id", "actionBtns").attr("class", "actionBtns");
            $('body').append(actionBtns);
            game.gameLogic();
        },//end enterBattle

        drawButtons: function() {
            $('#actionBtns').empty();
            //populate action buttons with a fx for char's actions
            let act = Object.keys(game.player.actions);
            for(i = 0; i < act.length; i++){
                let btn = $('<button>').attr("class", "actionBtn").text(act[i]);
                $(btn).on("click", function(){
                    //do combat with selected action!
                    turn(game.player, game.currentOpponent, $(this).text());
                    //check if you're dead, then do it again!
                    game.gameLogic();
                    });
                $('#actionBtns').append(btn);
            }//end for lp
            
        },//end drawButtons

        gameLogic: function() {
            if(game.player.HP > 0) {
                game.drawButtons();
            }
            //if you die, this
            if(game.player.HP <= 0){
                game.storyPage(game.characterSelect, "You lost");
            //if you win a battle, this
            } else if(game.currentOpponent.HP <= 0) {
                //delete this char from opponents
                let defeated = $('.currentOpponent').attr("id");
                delete game.chars[defeated];
                //decrement opponents
                game.foeCounter--;
                console.log(game.foeCounter);
                //refresh player stats
                game.player = copy(game.playerProto);
                //pick next dewd
                if(game.foeCounter > 0) {
                    game.enemyChoose();
                }
                //if no more dudes, this
                if (game.foeCounter == 0) {
                    game.storyPage(game.characterSelect, "You Won dewd");
                }
            }
        },

        storyPage: function (fx, str) {
            //this chunk draws player in left corner with text
            $('body').empty();
            let a = $('<div>');
            a.attr("id", "charPics").attr("class", "charPics");
            $('body').append(a);
            $('#charPics').append($('<img>')
                            .attr("src", game.player.imgSrcRight)
                            .attr("id", "player")
                        );//end append
            $('#charPics').append($('<p>')
                        .text(str));
            $('#charPics').append($('<button>')
                        .attr("id", "Continue")
                        .text("Continue")
                        .on("click", function(){
                            fx();
                        })
                    );//end append
        }

    }//end game obj

    $('#initial').on("click", "#start", function() {
        game.characterSelect();
    });
    
});
