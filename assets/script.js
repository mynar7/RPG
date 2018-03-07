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
        actions: {
            Attack: attackIt,
            Double_Slash: doubleAttack,
        },
        imgSrcLeft:'./assets/images/char6left.png',
        imgSrcRight:'./assets/images/char6right.png',
    },

    char2: {
        name: 'Sorcerer',
        HP: 27,
        AC: 13,
        MP: 4,
        SP: 0,
        damage: 3, //+3. but 1d10 flat with fireball
        dmgBns: 2,
        strength: 10,
        dexterity: 16,
        constitution: 12,
        intelligence: 16, 
        wisdom: 13,
        charisma: 8,
        actions: {
            Attack: attackIt,
            Fireball: fireball,
			/*
			function () {
				charges(player, counterName, charges);
			}
			for instance, for channel, then amount of magic missiles to shoot
			*/
        },
        imgSrcLeft:'./assets/images/char2left.png',
        imgSrcRight:'./assets/images/char2right.png',
    },
    char3: {
        name: 'Rogue',
        HP: 25,
        AC: 15,
        MP: 0,
        SP: 5,
        damage: 7, //+3? 
        dmgBns: 3,
        strength: 8,
        dexterity: 16,
        constitution: 10,
        intelligence: 13, 
        wisdom: 12,
        charisma: 16,
        actions: {
            Stab: attackIt,
            Poison_Strike: poisonAttack,
            Groin_Kick: kick,
        },
        imgSrcLeft:'./assets/images/char3left.png',
        imgSrcRight:'./assets/images/char3right.png',
    },

    char4: {
        name: 'Monk',
        HP: 40,
        AC: 10,
        MP: 0,
        SP: 5,
        damage: 2,
        dmgBns: 2,
        strength: 8,
        dexterity: 17,
        constitution: 14,
        intelligence: 10, 
        wisdom: 14,
        charisma: 12,
        actions: {
            Punch: attackIt,
            Quick_Fist: doubleAttack,
            Inner_Chi: haste,
		/* function () {
			haste(char, rounds);
		}
		   function () {
				charges(player, counterName, charges);
			}
			use for focus, then pass that counter into a multistrike attack
		*/
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

function debuff(char) {
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
}

//assign this to a button click, pass button id or value into str
function turn(char, opponent, act) {
    //what did player choose to do?
    //can player do that?

    //stunned
    if(char.stunCounter <= 0) {
        delete char.stunCounter;
    }
    if(char.stunCounter > 0) {
        char.stunCounter--;
        printC(char.name + " is stunned and cannot move!");
        return;
    }
    //technically, this is unnecessary, but I'm checking anyway
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

function doubleAttack(attacker, defender) {

    //get list of actions' function names
    let x = Object.values(attacker.actions);
    //find index of this function
    let y = x.indexOf(doubleAttack);
    //get list of actions' keys
    let z = Object.keys(attacker.actions);
    //z[y] is attack name!
    printC(attacker.name + ' uses ' + z[y] + '!');

    multiAttack(attacker, defender, 2);
    attacker.SP--;
    if(attacker.SP <= 0) {
        //get list of actions' function names
        let x = Object.values(attacker.actions);
        //find index of this function
        let y = x.indexOf(doubleAttack);
        //get list of actions' keys
        let z = Object.keys(attacker.actions);
        //delete this obj's action['thisFxName']
        delete attacker.actions[z[y]];        
    }   
}

//lazy implementation, change later
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

function fireball(attacker, defender) {
    let diceRoll = roll(20);
    printC(attacker.name + " rolled: " + diceRoll);    
    //all this junk gets the name of the key this function is stored to in char's object
    let x = Object.values(attacker.actions);
    let y = x.indexOf(fireball);
    let z = Object.keys(attacker.actions);

    if(diceRoll + mod(attacker.intelligence) >= defender.AC) {
        let dmg = roll(10) + mod(attacker.intelligence) + attacker.dmgBns;
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
        let z = Object.keys(attacker.actions);
        //delete this obj's action['thisFxName']
        delete attacker.actions[z[y]];        
    }   
}

function haste(char) {
    char.buff = 'haste';
    char.hasteCounter = mod(char.dexterity);
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
        let z = Object.keys(char.actions);
        //delete this obj's action['thisFxName']
        delete char.actions[z[y]];        
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
    //get list of actions' function names
    let x = Object.values(attacker.actions);
    //find index of this function
    let y = x.indexOf(kick);
    //get list of actions' keys
    let z = Object.keys(attacker.actions);
    //z[y] is attack name!
    printC(attacker.name + ' uses ' + z[y] + '!');

    attackIt(attacker, defender, stun);

    //cost of this skill
    attacker.SP-=1;
    if(attacker.SP <= 0) {
        delete attacker.actions[z[y]];        
    }   
}

function stun(attacker, defender) {
    defender.stunCounter = roll(4) - mod(defender.constitution) + mod(attacker.strength);
	if(defender.stunCounter > 0) {
    		printC(defender.name + " is stunned!");
	} else {
		printC(defender.name + " resists stun!");
		delete defender.stunCounter;
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
            game.playerProto = copy(game.chars[y]);
            //get data for player stat bars
            game.playerProto.maxHP = game.playerProto.HP;
            game.playerProto.maxMP = game.playerProto.MP;
            game.playerProto.maxSP = game.playerProto.SP;
            
            
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
            $('<h2>').attr("id", "playerHP").attr("class", "playerHP").text('HP').appendTo('#playerDiv');
            if(game.player.MP > 0) {
                $('<h2>').attr("id", "playerMP").attr("class", "playerMP").text('MP').appendTo('#playerDiv');
            }
            if(game.player.SP > 0) {
                $('<h2>').attr("id", "playerSP").attr("class", "playerSP").text('SP').appendTo('#playerDiv');
            }
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
            $('<h2>').attr("id", "enemyHP").attr("class", "enemyHP").text('HP').appendTo('#enemyDiv');
            if(game.currentOpponent.MP > 0) {
                $('<h2>').attr("id", "enemyMP").attr("class", "enemyMP").text('MP').appendTo('#enemyDiv');
            }
            if(game.currentOpponent.SP > 0) {
                $('<h2>').attr("id", "enemySP").attr("class", "enemySP").text('SP').appendTo('#enemyDiv');
            }
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
                    game.updateStatBars();
                    //check if you're dead, then do it again!
                    game.gameLogic();
                    });
                $('#actionBtns').append(btn);
            }//end for lp
            
        },//end drawButtons

        //make awesome stat bars!
        updateStatBars: function() {
            //update player bars
            //if HP is negative, don't make a neg bar!
        
            if(game.player.HP <= 0){
                $('#playerHP').animate({"width": 0});                
            } else {
                $('#playerHP').animate({"width": game.player.HP / game.player.maxHP * 100 + '%'});
            }
            //if no MP, don't bother
            if(game.player.maxMP > 0){
                
                if(game.player.MP > 0){
                    $('#playerMP').animate({"width": game.player.MP / game.player.maxMP * 100 + '%'});
                } else {
                    $('#playerMP').animate({"width": 0});          
                }
            }//end drawing MP
            //if no SP, don't bother            
            if(game.player.maxSP > 0){
                
                if(game.player.SP > 0){
                    $('#playerSP').animate({"width": game.player.SP / game.player.maxSP * 100 + '%'});
                } else {
                    $('#playerSP').animate({"width": 0});          
                }
            }//end drawing SP


            //update enemy bars!
           
            //if HP is negative, don't make a neg bar!
            if(game.currentOpponent.HP <= 0){
                $('#enemyHP').text('').animate({"width": 0});                
            } else {
                $('#enemyHP').animate({"width": game.currentOpponent.HP / game.currentOpponent.maxHP * 100 + '%'});
            }
            //if no MP, don't bother
            if(game.currentOpponent.maxMP > 0){
               
                if(game.currentOpponent.MP > 0){
                    $('#enemyMP').animate({"width": game.currentOpponent.MP / game.currentOpponent.maxMP * 100 + '%'});
                } else {
                    $('#enemyMP').text('').animate({"width": 0});          
                }
            }//end drawing MP
            //if no SP, don't bother            
            if(game.currentOpponent.maxSP > 0){
                
                if(game.currentOpponent.SP > 0){
                    $('#enemySP').animate({"width": game.currentOpponent.SP / game.currentOpponent.maxSP * 100 + '%'});
                } else {
                    $('#enemySP').text('').animate({"width": 0});          
                }
            }//end drawing SP
        }, //end update bars!

        //handle win/loss
        gameLogic: function() {
            if(game.player.HP > 0) {
                game.drawButtons();
            }
            //if you die, this
            if(game.player.HP <= 0){
                game.battleWon(game.characterSelect, "You lost", 'player');
            //if you win a battle, this
            } else if(game.currentOpponent.HP <= 0) {
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
