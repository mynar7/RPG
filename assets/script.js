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
//roll dice!
function roll(sided) {
    var x = Math.floor(Math.random() * sided + 1);
    return x;
}

function mod(score) {
    let x = (score - 10) / 2;
    return x;
}

var charList = {
    char1: {
        name: 'Ryu',
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
        }
    },

    char2: {
        name: 'M.Bison',
        HP: 35,
        AC: 10,
        MP: 2,
        SP: 4,
        strength: 15,
        dexterity: 11,
        constitution: 10,
        intelligence: 10, 
        wisdom: 15,
        charisma: 10,
        actions: {
            attack: attackIt,
            Fist_of_Shadaloo: fireball,
            suckerPunch: doubleAttack,
            Speed_Of_Shadabooboo: haste,
        }
    },
    char3: {
        name: 'E.Honda',
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
            handslap: fireball
        }
    },

    char4: {
        name: 'Chun-li',
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
        }
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
        console.log('no such action!');
    }

    if(char.status == 'haste') {
        char.hasteCounter--;
        if(char.hasteCounter < 0) {
            delete char.status;
            delete char.hasteCounter;
        }
        return;
    }
    cpuTurn(opponent, char);
    console.log(char.name + ' has ' + char.HP + 'HP left');
    console.log(opponent.name + ' has ' + opponent.HP + 'HP left');
    
    
}

function cpuTurn(cpu, target) {
    let x = Object.keys(cpu.actions);
    let y = Math.floor(Math.random() * x.length);
    let z = x[y];
    let a = cpu.actions[z];
    a(cpu, target);

    //haste conditional
    if(cpu.status == 'haste') {
        cpu.hasteCounter--;
        if(cpu.hasteCounter < 0) {
            delete cpu.status;
            delete cpu.hasteCounter;
            return;
        } 
        cpuTurn(cpu, target);
    }

}

function autoTurn() {
    attackIt(charList.char1, charList.char2);
    attackIt(charList.char2, charList.char1);
    console.log(charList.char1.name + ' has ' + charList.char1.HP + 'HP left');
    console.log(charList.char2.name + ' has ' + charList.char2.HP + 'HP left');
}

function attackIt(attacker, defender) {
    let diceRoll = roll(20);
    console.log(attacker.name + " rolled: ", diceRoll);    
    if(diceRoll >= defender.AC) {
        let dmg = roll(attacker.strength);
        defender.HP-=dmg;
        console.log(attacker.name + " attacks " + defender.name +"!");
        console.log(defender.name + " takes " + dmg + " points of damage!");
    } else {
        console.log(attacker.name + " attacks " + defender.name + " but misses!");
    }
}

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
    console.log(attacker.name + " rolled: ", diceRoll);    
    //all this junk gets the name of the key this function is stored to in char's object
    let x = Object.values(attacker.actions);
    let y = x.indexOf(fireball);
    let z = Object.keys(attacker.actions);

    if(diceRoll >= defender.dexterity) {
        let dmg = roll(attacker.intelligence);
        defender.HP-=dmg;
        console.log(attacker.name + " casts " + z[y] + " at " + defender.name +"!");
        console.log(defender.name + " takes " + dmg + " points of damage!");
    } else {
        console.log(attacker.name + " casts " + z[y] + " at "  + defender.name + ", but " + defender.name + " dodges the blast!");
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
    char.status = 'haste';
    char.hasteCounter = Math.floor(char.dexterity / 5);
    //all this junk gets the name of the key this function is stored to in char's object
    let x = Object.values(char.actions);
    let y = x.indexOf(haste);
    let z = Object.keys(char.actions);
    console.log(char.name + " casts " + z[y] + "!");
}

function poison(attacker, defender) {
    let diceRoll = roll(20);
    if (diceRoll + mod(defender.constitution < 15)) {
        char.status = 'poison';
    }
}
