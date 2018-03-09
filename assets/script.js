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
var lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veritatis nihil magnam. Repellat eligendi, ipsa facere quas laudantium repudiandae nostrum harum deleniti amet officiis, laboriosam aperiam doloremque, officia ex iure. Quisquam sapiente iure libero quae obcaecati, at nobis temporibus sunt possimus distinctio assumenda a. Natus officiis molestias incidunt deserunt quam reprehenderit repudiandae pariatur vero corporis dolores rem, harum esse modi. Ullam, veritatis velit nulla vitae repellat eaque sint officiis delectus. Pariatur commodi, in ratione, modi sapiente quidem delectus cupiditate ullam vero ducimus exercitationem excepturi aut distinctio error perspiciatis nostrum voluptatibus! Dicta, est! Neque labore facilis harum nisi inventore, atque exercitationem porro non, earum ea, in distinctio? Totam, voluptate fuga! Quia ipsam corrupti accusantium alias unde eius quaerat! Distinctio, nobis labore! Culpa dolore voluptates excepturi, incidunt iure ad mollitia voluptatum animi similique impedit nisi voluptas quod doloribus error vero sapiente ab eveniet. Doloribus veritatis quod dicta optio ab sunt excepturi sapiente. Autem facere eaque sed. Possimus cum tempore quasi provident necessitatibus in culpa non odit magnam fugit unde animi totam quam esse accusantium, perferendis qui quos illum iure dolores vel molestiae. Nam adipisci eum architecto, placeat voluptate obcaecati ipsum odio labore sint nemo earum impedit asperiores et, pariatur cumque natus. Similique praesentium tenetur inventore itaque asperiores temporibus voluptates nemo odio vel. Architecto dolore suscipit, eos et atque id enim corrupti numquam tempora, molestias animi ab quasi, in veniam tempore impedit saepe eligendi doloribus. Aliquam totam voluptatum dolor eos, ea placeat quisquam. Est, et necessitatibus unde soluta suscipit accusamus, placeat cum maiores modi quasi alias? Modi aliquid natus dignissimos praesentium, dolorum beatae amet sequi a fugiat explicabo totam ratione velit minima sapiente? Ipsam delectus rem mollitia accusamus sapiente dolorum reprehenderit itaque minus quasi ipsum nulla rerum, a numquam consequuntur maiores quos odio, maxime cum odit nisi veniam architecto sunt! Adipisci, velit dolore!";

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
//stat modifier
function mod(score) {
    let x = Math.floor((score - 10) / 2);
    return x;
}

var charList = {
    char1: {
        name: 'Knight',
        HP: 32,
        AC: 11,
        MP: 0,
        SP: 4,
        damage: 6,
        dmgBns: 4,
        strength: 16,
        dexterity: 9,
        constitution: 15,
        intelligence: 13, 
        wisdom: 11,
        charisma: 14,
        speed: 40,
        actions: {
            Attack: function(attacker, defender) {
                attackIt(attacker, defender);
            },
            Rest: skillRecover,
            Double_Slash: function(attacker, defender) {
                printA(attacker, 'Double Slash', 'SP');
                if(attacker.SP >= 1) {
                    multiAttack(attacker, defender, 2);
                    attacker.SP--;
                }
            },
            Sword_Stance: function(attacker) {
                if(attacker.stance != 'offensive') {
                    attacker.stance = 'offensive';
                    printC(attacker.name + ' assumes an offensive stance!');                   
                    attacker.AC-=6;
                    attacker.damage+=mod(attacker.strength);
                    attacker.dmgBns+=mod(attacker.strength);
                    attacker.dexterity+=mod(attacker.strength);
                }
                if(attacker.stance == 'defensive') {
                    attacker.stance = 'offensive';
                    printC(attacker.name + ' assumes an offensive stance!');                    
                    attacker.AC-=12;
                    attacker.damage+=mod(attacker.strength) * 2;
                    attacker.dmgBns+=mod(attacker.strength) * 2;
                }
            },
            Guard_Stance: function(attacker) {
                if(attacker.stance != 'defensive') {
                    attacker.stance = 'defensive';
                    printC(attacker.name + ' assumes a defensive stance!');
                    attacker.AC+=6;
                    attacker.damage-=mod(attacker.strength);
                    attacker.dmgBns-=mod(attacker.strength);
                }
                if(attacker.stance == 'offensive') {
                    attacker.stance = 'defensive';
                    printC(attacker.name + ' assumes a defensive stance!');
                    attacker.AC+=12;
                    attacker.damage-=mod(attacker.strength) * 2;
                    attacker.dmgBns-=mod(attacker.strength) * 2;
                    attacker.dexterity-=mod(attacker.strength);
                }
            },
        },
        imgSrcLeft:'./assets/images/char6left.png',
        imgSrcRight:'./assets/images/char6right.png',
    },

    char2: {
        name: 'Sorcerer',
        HP: 27,
        AC: 9,
        MP: 10,
        SP: 1,
        damage: 3, //+3. but 1d10 flat with fireball
        dmgBns: 2,
        strength: 10,
        dexterity: 16,
        constitution: 12,
        intelligence: 16, 
        wisdom: 13,
        charisma: 8,
        speed: 30,
        channelCounter: 0,
        actions: {
            Gather_Mana: manaRecover,
            Arcane_Bolt: function(attacker, defender) {
                printA(attacker, "Fireball", 'MP');
                fireball(attacker, defender);
            },
            Channel: channel,
            Arcane_Volley: function (attacker, defender) {
                printA(attacker, "Arcane Volley", 'MP');
                magicMissles(attacker, defender);
            },
            Dispel_Toxin: curePoison,
            Arcane_Protection: function(attacker, defender) {
                printA(attacker, "Arcane Protection", 'MP');
                barrier(attacker, defender);
            },
        },
        imgSrcLeft:'./assets/images/char2left.png',
        imgSrcRight:'./assets/images/char2right.png',
    },
    char3: {
        name: 'Rogue',
        HP: 25,
        AC: 14,
        MP: 0,
        SP: 5,
        damage: 4, //+3? 
        dmgBns: 4,
        strength: 8,
        dexterity: 16,
        constitution: 10,
        intelligence: 13, 
        wisdom: 12,
        charisma: 16,
        speed: 35,
        actions: {
            Stab: attackIt,
            Poison_Strike: poisonAttack,
            Groin_Kick: function(attacker, defender) {
                printA(attacker, "Groin Kick", 'SP');
                kick(attacker, defender);
            },
        },
        imgSrcLeft:'./assets/images/char3left.png',
        imgSrcRight:'./assets/images/char3right.png',
    },

    char4: {
        name: 'Monk',
        HP: 40,
        AC: 12,
        MP: 0,
        SP: 0,
        damage: 4,
        dmgBns: 1,
        strength: 8,
        dexterity: 17,
        constitution: 14,
        intelligence: 10, 
        wisdom: 14,
        charisma: 12,
        speed: 35,
        channelCounter: 0,
        actions: {
            Focus: channel,
            Double_Strike: function(attacker, defender) {
                multiAttack(attacker, defender, 2);
            },
            Punishing_Fists: function (attacker, defender) {
                printA(attacker, 'Punishing Fists!');
                multiAttack(attacker, defender, attacker.channelCounter + 2);
                attacker.channelCounter = 0;
            }, 
        },
        imgSrcLeft:'./assets/images/char4left.png',
        imgSrcRight:'./assets/images/char4right.png',
    }
}

//super important for deep copy! Thanks stack overflow!
function copy(oldObject) {
    var newObject = jQuery.extend(true, {}, oldObject);
    return newObject;
}

function printA (attacker, actName, points) {
    switch (points) {
        case 'SP':
        if (attacker.SP > 0) {
            printC(attacker.name + ' uses ' + actName + '!');
        } else {
            printC(attacker.name + ' is out of ' + points + '!');
        }
        break;
        case 'MP':
        if (attacker.MP > 0) {
            printC(attacker.name + ' uses ' + actName + '!');
        } else {
            printC(attacker.name + ' is out of ' + points + '!');
        }
        break;
        default: 
            printC(attacker.name + ' uses ' + actName + '!');
        break;
    }
}

function levelUp(char) {
    char.HP += roll(4);
    if(char.MP > 0) {
        char.MP++;
    }
    if(char.SP > 0) {
        char.SP++;
    }
    char.damage++;
    char.strength += roll(4) + mod(char.strength);
    char.dexterity += roll(4) + mod(char.dexterity);
    char.constitution += roll(4) + mod(char.constitution);
    char.intelligence += roll(4) + mod(char.intelligence);
    char.wisdom += roll(4) + mod(char.wisdom);
    char.charisma += roll(4) + mod(char.charisma);
}

function beforeTurn(char) {
    //store barrier hp
    switch (char.buff) {
        case 'barrier':
                //store char's current HP
                char.memoryHP = char.HP;
        break;
    }

}
function afterTurn(char) {
    switch (char.debuff){
        case 'poison':
		let psnDmg = roll(6) - mod(char.constitution);
        	if(psnDmg > 0) {
		   		char.HP-= psnDmg;
        		printC(char.name + " takes " + psnDmg + "pts of poison dmg!");
			} else {
				printC(char.name + " resists poison damage!");
			}
        	char.poisonCounter--;
        	if(char.poisonCounter < 0) {
            	delete char.poisonCounter;
            	delete char.debuff;
            	printC(char.name + " is no longer poisoned");
        	}
        break;//end poison case
        }
    switch(char.buff) {
        case 'barrier':
            //if char was healed, do nothing
            if(char.memoryHP > char.HP) {
                //calculate how much HP was lost
                let barDmg = char.memoryHP - char.HP;
                //if barrier has more HP than HP lost to dmg
                if(char.barrierHP > barDmg) {
                    char.HP += barDmg;
                    char.barrierHP -= barDmg;
                    printC(char.name + "'s barrier absorbs " + barDmg + ' points of damage!');
                    
                //dmg > barHP
                } else {
                    char.HP += char.barrierHP;
                    printC(char.name + "'s barrier absorbs " + char.barrierHP + ' points of damage!');
                    char.barrierHP = 0;
                }
            }
            printC(char.name + "'s barrier has " + char.barrierHP + ' HP left');
            
            if (char.barrierHP <= 0) {
                delete char.barrierHP
                char.buff = '';
                printC(char.name + "'s barrier is dispelled");                
            }
        break;
    }
}

//assign this to a button click, pass button id or value into str
function turn(char, opponent, act) {
    //what did player choose to do?
    //can player do that?
    beforeTurn(opponent);
    beforeTurn(char);
    
    //stunned
    if(char.stunCounter <= 0) {
        delete char.stunCounter;
    }
    if(char.stunCounter > 0) {
        char.stunCounter--;
        printC(char.name + " is stunned and cannot move!");
        cpuTurn(opponent, char);
    }
    //technically, this is unnecessary, but I'm checking anyway
    let x = Object.keys(char.actions);
    if(x.indexOf(act) > -1) {        
        let y = char.actions[act];
        y(char, opponent);
    } else {
        printC('no such action!');
    }

    afterTurn(char);
    afterTurn(opponent);
    printC('{---------------------------------------------------}');
    
    
}

function cpuTurn(cpu, target) {
    beforeTurn(target);
    beforeTurn(cpu);
    //stunned
    if(cpu.stunCounter <= 0) {
        delete cpu.stunCounter;
		printC(cpu.name + " is no longer stunned!");
    }
    if(cpu.stunCounter > 0) {
        cpu.stunCounter--;
        printC(cpu.name + " is stunned and cannot move!");
        return;
    }
    
    //do a random action
    let x = Object.keys(cpu.actions);
    let y = Math.floor(Math.random() * x.length);
    let z = x[y];
    let a = cpu.actions[z];
    a(cpu, target);
    afterTurn(cpu);
    afterTurn(target);
    printC('{---------------------------------------------------}');
    
}

//basic attack fx
function attackIt(attacker, defender, fx, num) { 
    if(roll(20) + mod(attacker.dexterity) >= defender.AC) {
        let dmg = roll(attacker.damage) + attacker.dmgBns;
        defender.HP-=dmg;
        printC(attacker.name + " attacks " + defender.name +"!");
        printC(defender.name + " takes " + dmg + " points of damage!");
		switch(arguments.length) {
			case 3:
				fx(attacker, defender);
			break;
			case 4:
				fx(attacker, defender, num);
			break; 
								}
    } else {
        printC(attacker.name + " attacks " + defender.name + " but misses!");
    }
}

function multiAttack(attacker, defender, rounds) {
    let hits = 0;
    let dmg = 0;
    if(rounds > 2) {
        printC(attacker.name + " unleashes a flurry of attacks!")
    } else {
        printC(attacker.name + " attacks twice!")
    }
    for (let i = 0; i < rounds; i++) {
        if(roll(20) + mod(attacker.dexterity) > defender.AC) {
            dmg+= roll(attacker.damage) + attacker.dmgBns;
            hits++;
        }
    }//end for
    switch (hits) {
        case 2:
        printC(attacker.name + " connects with both attacks!");
        break;

        case 1:
        printC(attacker.name + " only connects with one of the attacks!");
        break;

        case 0:
        printC(defender.name + ' manages to avoid the attacks!');
        break;

        default:
        printC(attacker.name + ' lands ' + hits + ' of the attacks!');
        break;
    }
    if(hits > 0) {
        printC(defender.name + ' takes ' + dmg + ' points of damage!');
    }
    defender.HP-=dmg;
}

function skillRecover (attacker) {
    if(attacker.SP < attacker.maxSP) {
        printC(attacker.name + ' takes a brief rest to determine their next move!');
        //determine SP recovered
        let plusSP = roll(mod(attacker.dexterity) + mod(attacker.strength) + mod(attacker.constitution));
        //if more than Max, set to maxSP
        if(attacker.maxSP < attacker.SP + plusSP) {
            attacker.SP = attacker.maxSP;
            //else add it
        } else {
            attacker.SP += plusSP;
        }
    }
}

function curePoison(char) {
    if (char.MP >= 2) {
        delete char.poisonCounter;
        delete char.debuff;
        char.MP-=2;
    }
}

function fireball(attacker, defender) {
    if(attacker.MP > 0) {

        if(roll(20) + mod(attacker.intelligence) >= defender.AC) {
            let dmg = roll(attacker.damage) + mod(attacker.intelligence) + attacker.dmgBns;
            defender.HP-=dmg;
            printC(defender.name + " takes " + dmg + " points of damage!");
        } else {
            printC(defender.name + " dodges the blast!");
        }
        attacker.MP--;
    }
}

function barrier(attacker) {
    if(attacker.MP >= 3) {
        if(roll(20) + mod(attacker.intelligence) > 10) {
            attacker.barrierHP = roll(mod(attacker.maxHP)) + roll(attacker.damage) + mod(attacker.intelligence) + mod(attacker.constitution);
            printC(attacker.name + ' is surrounded by a magical barrier with' + attacker.barrierHP + 'HP!');
            attacker.buff = 'barrier';
            attacker.memoryHP = attacker.HP;
        } else {
            printC('But the spell fizzles!');
        }
        attacker.MP-=3;           
    }
}

function manaRecover (attacker, defender) {
    if(attacker.MP < attacker.maxMP) {
        printC(attacker.name + ' draws in arcane energy from their surroundings!');
        //determine MP recovered
        let plusMP = roll(mod(attacker.intelligence)) + mod(attacker.intelligence);
        //if more than Max, set to maxMP
        if(attacker.maxMP < attacker.MP + plusMP) {
            attacker.MP = attacker.maxMP;
            //else add it
        } else {
            attacker.MP += plusMP;
        }
    }
}

function channel(attacker) {
    printC(attacker.name + ' focuses their energy!');
    attacker.channelCounter+=2;
    printC(attacker.name + ' has ' + attacker.channelCounter + ' charges');
}

function magicMissles(attacker, defender) {
    if(attacker.MP >= 2) {
        let dmg = 0;
        let bolts = 0;
        for(i = 0; i < attacker.channelCounter; i++) {
            if (roll(20) + mod(attacker.intelligence) > defender.AC) {
                dmg += roll(attacker.damage) + mod(attacker.intelligence) + attacker.dmgBns;
                bolts++;
            }
        }
        if(dmg > 0) {
            defender.HP -= dmg;
            printC(defender.name + ' is hit by ' + bolts + ' out of '+ attacker.channelCounter +  ' bolts!');
            printC(defender.name + ' takes ' + dmg + ' points of damage!');
        } else {
            printC(defender.name + ' narrowly avoids all of arcane bolts!');
        }
        attacker.channelCounter = 0;
        attacker.MP-=2;
    }
}

function poisonAttack(attacker, defender) {
    printC(attacker.name + " coats their weapon with poison!");        
    attackIt(attacker, defender, poison);
}

function poison(attacker, defender) {
	//perform poison saving throw, if successfull, roll rounds of poison dmg
    if (roll(20) + mod(defender.constitution) <= 13 + mod(attacker.dexterity)) {
		//determine poisonCounter
        defender.debuff = 'poison';
        defender.poisonCounter = roll(6);
        printC(defender.name + " is poisoned!");
    } else {
        printC(defender.name + " resists the poison!");
    }
}//end function

function kick(attacker, defender) {
    //cost of this skill
    if(attacker.SP > 0) {
        attackIt(attacker, defender, stun);
        attacker.SP-=1;
    }
}

function stun(attacker, defender) {
	if(roll(20) + mod(defender.constitution) > 12 + mod(attacker.strength)) {
    defender.stunCounter = roll(4);
    printC(defender.name + " is stunned!");
	} else {
		printC(defender.name + " resists stun!");
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
                charSelDiv.append(y);
            }
            $('body').append(charSelDiv);
        },
        //after choosing a char, this fx sets up text to explain that char has to fight others
        playerChoose: function (x) {
            let y = $(x).attr("id");
           
		//make a copy of player object so player can be reset after battle
            game.player = copy(game.chars[y]);
            //get data for player stat bars
            game.player.maxHP = game.player.HP;
            game.player.maxMP = game.player.MP;
            game.player.maxSP = game.player.SP;
            
            game.playerProto = copy(game.player);
            
            //remove player from list of chars
            delete game.chars[y];

            //create a counter for the remaining enemies
            let a = Object.keys(game.chars);
            game.foeCounter = a.length;
            game.storyPage(game.enemyChoose, "story shiz goes here, about like, how there's like, an arena and shit and you gotta fight some guys.");

        },//end playerChoose

        //this fx shows char pic and allows char to choose enemy
        enemyChoose: function () {
            $('body').empty();
            $('body').append(
                $('<div>').attr("id", "charPics").attr("class", "charPics")
            );//end append
            //create player image and stats
            $('<div>').attr("id", "playerDiv").attr("class", "playerDiv").appendTo('#charPics');
            $('#playerDiv').append($('<img>')
                            .attr("src", game.player.imgSrcRight)
                            .attr("id", "player")
                            .attr('class', 'playerBattlePic')
            );//end append
            $('<h2>').attr("id", "playerHP").attr("class", "playerHP").appendTo('#playerDiv');
			$('<h3>').attr("id", "playerHPnum").attr("class", "playerHPnum").text('HP: ' + game.player.HP + '/' + game.player.maxHP).appendTo('#playerDiv');
            if(game.player.MP > 0) {
                $('<h2>').attr("id", "playerMP").attr("class", "playerMP").appendTo('#playerDiv');
				$('<h3>').attr("id", "playerMPnum").attr("class", "playerMPnum").text('MP: ' + game.player.MP + '/' + game.player.maxMP).appendTo('#playerDiv');
            }
            if(game.player.SP > 0) {
                $('<h2>').attr("id", "playerSP").attr("class", "playerSP").appendTo('#playerDiv');
				$('<h3>').attr("id", "playerSPnum").attr("class", "playerSPnum").text('SP: ' + game.player.SP + '/' + game.player.maxSP).appendTo('#playerDiv');
            }
            $('<h4>').attr("id", "playerTime").attr("class", "playerTime").appendTo('#playerDiv');
            $('<h3>').attr("id", "playerTimeNum").attr("class", "playerTimeNum").text('Time').appendTo('#playerDiv');                      
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
            //get data for enemy healthbars
            game.currentOpponent.maxHP = game.currentOpponent.HP;
            game.currentOpponent.maxMP = game.currentOpponent.MP;
            game.currentOpponent.maxSP = game.currentOpponent.SP;
            
            //make div for opponent
            $('<div>').attr("id", "enemyDiv").attr("class", "enemyDiv").appendTo('#charPics');
            //add pic of enemy to right of player
            $('<img>').attr("src", game.currentOpponent.imgSrcLeft)
                .attr("class", "enemyBattlePic")
                .attr("id", enemy)
                .appendTo('#enemyDiv');
            //add hp bars!
            $('<h2>').attr("id", "enemyHP").attr("class", "enemyHP").appendTo('#enemyDiv');
			$('<h3>').attr("id", "enemyHPnum").attr("class", "enemyHPnum").text('HP: ' + game.currentOpponent.HP + '/' +game.currentOpponent.maxHP).appendTo('#enemyDiv');
            if(game.currentOpponent.MP > 0) {
                $('<h2>').attr("id", "enemyMP").attr("class", "enemyMP").appendTo('#enemyDiv');
				$('<h3>').attr("id", "enemyMPnum").attr("class", "enemyMPnum").text('MP: ' + game.currentOpponent.MP + '/' + game.currentOpponent.maxMP).appendTo('#enemyDiv');
            }
            if(game.currentOpponent.SP > 0) {
                $('<h2>').attr("id", "enemySP").attr("class", "enemySP").appendTo('#enemyDiv');
				$('<h3>').attr("id", "enemySPnum").attr("class", "enemySPnum").text('SP: ' + game.currentOpponent.SP +  '/' +game.currentOpponent.maxSP).appendTo('#enemyDiv');
            }
            $('<h4>').attr("id", "enemyTime").attr("class", "enemyTime").appendTo('#enemyDiv');
            $('<h3>').attr("id", "enemyTimeNum").attr("class", "enemyTimeNum").text('Time').appendTo('#enemyDiv');
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
            game.battleStarted = false;
        },//end enterBattle

        drawButtons: function() {
            $('#actionBtns').empty();
            //populate action buttons with a fx for char's actions
            let act = Object.keys(game.player.actions);
            for(i = 0; i < act.length; i++){
                let btn = $('<button>').attr("class", "actionBtn").text(act[i]);
                $(btn).on("click", function(){
                    if(!game.waiting) {
                        game.gameLogic();                        
                        //do combat with selected action!
                        turn(game.player, game.currentOpponent, $(this).text());
                        
                        game.waiting = true;
                        $('#playerTime').css({width: "0"});
                        game.pTimeVar = setInterval(function (){
                            game.pTime();
                        }, game.player.speed);
                        setTimeout(function(){
                            game.waiting = false;
                            clearInterval(game.pTimeVar);
                        }, 1000 * game.player.speed / 10);
                        //start cpu here
                        if(!game.battleStarted) {
                            game.opponentTurn();
                            game.battleStarted = true;
                        } 
                        //check if you're dead, then do it again!
                        game.gameLogic();
                    }
                    });
                $('#actionBtns').append(btn);
            }//end for lp
            
        },//end drawButtons
        //update player time Bar
        
        pTime: function() {
            //bars are #enemyTime and #playerTime
            $('#playerTime').css({width: "+=1%"});

        },
        //make awesome stat bars!
        updateStatBars: function() {
            //update player bars
            //if HP is negative, don't make a neg bar!
            if(game.player.HP <= 0){
				$('#playerHPnum').text('HP: 0/' + game.player.maxHP);
                $('#playerHP').animate({"width": 0});
            } else {
				$('#playerHPnum').text('HP: ' + game.player.HP + '/' + game.player.maxHP);
                $('#playerHP').animate({"width": game.player.HP / game.player.maxHP * 100 + '%'});
            }
            //if no MP, don't bother
            if(game.player.maxMP > 0){
                if(game.player.MP > 0){
					$('#playerMPnum').text('MP: ' + game.player.MP + '/' + game.player.maxMP);
                    $('#playerMP').animate({"width": game.player.MP / game.player.maxMP * 100 + '%'});
                } else {
					$('#playerMPnum').text('MP: 0/' + game.player.maxMP);
                    $('#playerMP').animate({"width": 0});
                }
            }//end drawing MP
            //if no SP, don't bother            
            if(game.player.maxSP > 0){
                if(game.player.SP > 0){
					$('#playerSPnum').text('SP: ' + game.player.SP + '/' + game.player.maxSP);
                    $('#playerSP').animate({"width": game.player.SP / game.player.maxSP * 100 + '%'});
                } else {
					$('#playerSPnum').text('SP: 0/' + game.player.maxSP);
                    $('#playerSP').animate({"width": 0});
                }
            }//end drawing SP


            //update enemy bars!
           
            //if HP is negative, don't make a neg bar!
            if(game.currentOpponent.HP <= 0){
				$('#enemyHPnum').text('HP: 0/' + game.currentOpponent.maxHP);
                $('#enemyHP').animate({"width": 0});
            } else {
				$('#enemyHPnum').text('HP: ' + game.currentOpponent.HP + '/' + game.currentOpponent.maxHP)
                $('#enemyHP').animate({"width": game.currentOpponent.HP / game.currentOpponent.maxHP * 100 + '%'});
            }
            //if no MP, don't bother
            if(game.currentOpponent.maxMP > 0){
                if(game.currentOpponent.MP > 0){
					$('#enemyMPnum').text('MP: ' + game.currentOpponent.MP + '/' + game.currentOpponent.maxMP)
                    $('#enemyMP').animate({"width": game.currentOpponent.MP / game.currentOpponent.maxMP * 100 + '%'});
                } else {
					$('#enemyMPnum').text('MP: 0/' + game.currentOpponent.maxMP);
                    $('#enemyMP').animate({"width": 0});          
                }
            }//end drawing MP
            //if no SP, don't bother            
            if(game.currentOpponent.maxSP > 0){
                
                if(game.currentOpponent.SP > 0){
					$('#enemySPnum').text('SP: ' + game.currentOpponent.SP + '/' + game.currentOpponent.maxSP)
                    $('#enemySP').animate({"width": game.currentOpponent.SP / game.currentOpponent.maxSP * 100 + '%'});
                } else {
                    $('#enemySP').text('').animate({"width": 0});
					$('#enemySPnum').text('SP: 0/' + game.currentOpponent.maxSP);
                }
            }//end drawing SP
        }, //end update bars!

        opponentTurn: function() {
            clearInterval(game.cpu);

            //repeating starts here
            game.cpu = setInterval(function(){
                //clear enemy time var, stopping time bar
                clearInterval(game.eTimeVar);
                //check win/loss
                game.gameLogic();
                //actual turn
                cpuTurn(game.currentOpponent, game.player);
                //enemy is doing action, so set bar to 0%
                $('#enemyTime').css({width: '0'});
                //start time bar
                game.eTimeVar = setInterval(function (){
                    $('#enemyTime').css({width: '+=1%'});
                }, game.currentOpponent.speed);
                
                //check win/loss after turn, and stop everything
                game.gameLogic();
            }, 1000 * game.currentOpponent.speed / 10);

        },
        //handle win/loss
        gameLogic: function() {
            game.updateStatBars();
            //if you die, this
            if(game.player.HP <= 0){
                clearInterval(game.pTimeVar);                
                clearInterval(game.cpu);
                clearInterval(game.eTimeVar);                                
                game.battleWon(game.characterSelect, "You lost", 'player');
            //if you win a battle, this
            } else if(game.currentOpponent.HP <= 0) {
                clearInterval(game.pTimeVar);                
                clearInterval(game.cpu);
                clearInterval(game.eTimeVar);                
                //delete this char from opponents
                let defeated = $('.enemyBattlePic').attr("id");
                delete game.chars[defeated];
                //decrement opponents
                game.foeCounter--;
                //levelUp!
                levelUp(game.playerProto);
                //update data for stat bars
                game.playerProto.maxHP = game.playerProto.HP;
                game.playerProto.maxMP = game.playerProto.MP;
                game.playerProto.maxSP = game.playerProto.SP;
                //refresh/heal player
                game.player = copy(game.playerProto);
                //nice!
                printC(game.playerProto.name + " leveled up!");
                //refresh player stats
                game.player = copy(game.playerProto);
                //pick next dewd
                if(game.foeCounter > 0) {
                    game.battleWon(game.enemyChoose , lorem, 'foe');
                }
                //if no more dudes, this
                if (game.foeCounter == 0) {
                    game.battleWon(game.characterSelect, "You Won dewd", 'player');
                }
            }
        },

        //this allows battle to end, and shows text in combatText saying who won
        //also removes action buttons and attaches continue button linking to story page
        battleWon: function(fx, str, pic) {
            $('#actionBtns').empty();
            let a;
        
            if(pic == 'player') {
                a = game.storyPage;
            } else {
                a = game.storyPageFoe;
            }
            if(game.player.HP > 0) {
                printC(game.player.name + " defeated " + game.currentOpponent.name + '!');
            } else if (game.currentOpponent.HP > 0) {
                printC(game.currentOpponent.name + " defeated " + game.player.name + '!');
            } else {
                printC(game.player.name + " and " + game.currentOpponent.name + ' defeated each other!');                
            }
            let x = $('<button>').attr('id', 'Continue').text('Continue').on("click", function(){
                a(fx, str);
            });

            $('#actionBtns').append(x)

        },

        storyPage: function (fx, str) {
            //this chunk draws player in left corner with text
            $('body').empty();
            /*
            let a = $('<div>');
            a.attr("id", "charPics").attr("class", "charPics");
            $('body').append(a);
            */
            $('body').append($('<img>')
                            .attr("src", game.player.imgSrcRight)
                            .attr("id", "player")
                        );//end append
            $('body').append($('<p>')
                        .text(str));
            $('body').append($('<button>')
                        .attr("id", "Continue")
                        .text("Continue")
                        .on("click", function(){
                            fx();
                        })
                    );//end append
        }, //end storyPage

        storyPageFoe: function (fx, str) {
            $('body').empty();
            //this chunk draws player in left corner with text
            /*
            let a = $('<div>');
            a.attr("id", "charPics").attr("class", "charPics");
            $('body').append(a);
            */
            $('body').append($('<img>')
                            .attr("class", 'foeStoryPic')
                            .attr("src", game.currentOpponent.imgSrcLeft)                            
                        );//end append
            $('body').append($('<p>')
                        .text(str));
            $('body').append($('<button>')
                        .attr("id", "Continue")
                        .text("Continue")
                        .on("click", function(){
                            fx();
                        })
                    );//end append
        }, //end storyPage

    }//end game obj

    $('#initial').on("click", "#start", function() {
        game.characterSelect();
    });
    
});
