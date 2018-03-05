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
    let element = $('#combatText');
    element.scrollTop = element.scrollHeight;
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
        AC: 11,
        MP: 3,
        SP: 2,
        strength: 15,
        dexterity: 11,
        constitution: 10,
        intelligence: 10, 
        wisdom: 15,
        charisma: 10,
        actions: {
            attack: attackIt,
            hadouken: fireball,
            twoFist: doubleAttack,
            innerChi: haste
        },
        imgSrcLeft:'./assets/images/char6left.png',
        imgSrcRight:'./assets/images/char6right.png',
    },

    char2: {
        name: 'Sorcerer',
        HP: 35,
        AC: 10,
        MP: 2,
        SP: 4,
        strength: 15,
        dexterity: 11,
        constitution: 15,
        intelligence: 10, 
        wisdom: 15,
        charisma: 10,
        actions: {
            attack: attackIt,
            Fist_of_Shadaloo: fireball,
            suckerPunch: doubleAttack,
            Speed_Of_Shadabooboo: haste,
        },
        imgSrcLeft:'./assets/images/char2left.png',
        imgSrcRight:'./assets/images/char2right.png',
    },
    char3: {
        name: 'Rogue',
        HP: 40,
        AC: 11,
        MP: 3,
        SP: 0,
        strength: 15,
        dexterity: 11,
        constitution: 10,
        intelligence: 10, 
        wisdom: 15,
        charisma: 10,
        actions: {
            attack: attackIt,
            handslap: fireball,
        },
        imgSrcLeft:'./assets/images/char3left.png',
        imgSrcRight:'./assets/images/char3right.png',
    },

    char4: {
        name: 'Monk',
        HP: 35,
        AC: 10,
        MP: 0,
        SP: 4,
        strength: 15,
        dexterity: 11,
        constitution: 10,
        intelligence: 10, 
        wisdom: 15,
        charisma: 10,
        actions: {
            attack: attackIt,
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
            console.log(game.chars);
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
            console.log($(x).attr("id"));
            let y = $(x).attr("id");
            //make property for player obj
            game.player = copy(game.chars[y]);
            game.playerProto = copy(game.chars[y]);
            //remove player from list of chars
            delete game.chars[y];
            console.log("You chose " + game.player.name);
            console.log(game.chars);
            $('body').empty();
            let a = $('<div>');
            a.attr("id", "charPics").attr("class", "charPics");
            $('body').append(a);
            $('#charPics').append($('<img>')
                            .attr("src", game.player.imgSrcRight)
                            .attr("id", "playerIntro")
                        );//end append
            $('#charPics').append($('<p>')
                        .text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan feugiat dui ac tincidunt. Mauris pretium nisi non lectus consectetur tempor. Integer odio sapien, mattis ut blandit vel, tempor non purus. Vestibulum non magna sem. Integer blandit sapien quis laoreet tristique. Nulla tempor dui hendrerit accumsan tempor. Vivamus consequat diam libero, ut fermentum nulla auctor non. Nam vulputate quis nisi quis varius. Vestibulum laoreet nisi eu diam porta ultrices. Ut non ultrices felis. Mauris lectus enim, fermentum id dolor nec, dapibus semper purus. Vestibulum vehicula augue molestie, ornare magna in, tempor erat. Mauris ultricies ante ipsum, et sollicitudin magna consectetur eu. Aenean malesuada sem nec diam laoreet, quis egestas velit placerat. Fusce odio velit, dictum in luctus vel, maximus ac justo. Phasellus sit amet eros quis tortor cursus ultricies. Etiam quis vulputate est. Aliquam faucibus elit eget lobortis interdum. Praesent dictum tempus consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet diam massa, in feugiat ante suscipit at. Donec mattis lacus id ante rhoncus, rhoncus ultricies sapien luctus. Sed condimentum porttitor eros, eget hendrerit diam consectetur rhoncus. Maecenas facilisis vestibulum diam. Pellentesque rutrum eleifend eros, ut elementum nunc. Phasellus non justo a ex sagittis efficitur. Donec pharetra ultricies bibendum. In non arcu sit amet velit commodo posuere et in odio. Integer semper dictum est vel viverra. Aliquam erat volutpat. Sed ac turpis metus. Duis ultricies mollis tempor. Mauris at magna nibh. Duis ultrices pretium est sed molestie. Sed vitae ante semper, sodales ante vitae, vehicula turpis. In et justo orci. Nullam lobortis purus urna, eu semper arcu rhoncus non. Phasellus viverra finibus est et tempor. Mauris faucibus at velit eu semper. Sed condimentum tempus libero, sit amet maximus dolor tristique quis. Fusce auctor nulla consectetur quam varius auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus arcu sed leo pretium ultrices. Phasellus tristique lorem nec ligula consectetur, nec venenatis tortor tempus. Sed vel elit tincidunt, eleifend sem ornare, imperdiet risus. Donec tempus ex nec volutpat viverra. Sed nec fringilla ipsum, a lobortis dolor.")
                        );//end append
            $('#charPics').append($('<button>')
                        .attr("id", "start")
                        .text("Continue")
                        .on("click", function(){
                            game.enemyChoose();
                        })
                    );//end append

        },
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
            console.log(x);
            for(let i = 0; i < x.length; i++){
                let y = $('<img>');
                let z = game.chars[x[i]];
                console.log(z);
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
            
            console.log(enemy);
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
            game.drawButtons();
        },//end enterBattle

        drawButtons: function() {
            $('#actionBtns').empty();
            //populate action buttons with a fx for char's actions
            let act = Object.keys(game.player.actions);
            console.log(act);
            for(i = 0; i < act.length; i++){
                let btn = $('<button>').attr("class", "actionBtn").text(act[i]);
                $(btn).on("click", function(){
                    turn(game.player, game.currentOpponent, $(this).text());
                    if(game.player.HP <= 0){
                        game.characterSelect();
                    } else if(game.currentOpponent.HP <= 0) {
                        //delete this char from opponents
                        let defeated = $('.currentOpponent').attr("id");
                        delete game.chars[defeated];
                        //refresh player stats
                        game.player = copy(game.playerProto);
                        game.enemyChoose();                        
                    }
                    game.drawButtons();
                });
                $('#actionBtns').append(btn);
            }//end for lp
            
        },

    }//end game obj

    $('#initial').on("click", "#start", function() {
        game.characterSelect();
    });
    
});
