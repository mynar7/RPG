var preFight = "</p><p>The announcer calls out with a bellow, \"Let the games begin!. Contestants, choose your opponents wisely. Only one of you may ever leave this arena alive!";

function printC (str) {
    str = str + '<br>';
    $('#combatText').append(str);
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
        HP: 102,
        AC: 11,
        MP: 0,
        SP: 4,
        damage: 7,
        dmgBns: 4,
        strength: 16,
        dexterity: 14,
        constitution: 15,
        intelligence: 9, 
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
                if(attacker.stance !== 'offensive') {
                    attacker.stance = 'offensive';
                    printC(attacker.name + ' assumes an offensive stance!');                   
                    attacker.AC-=6;
                    attacker.damage+=mod(attacker.strength);
                    attacker.dmgBns+=mod(attacker.strength);
                    attacker.dexterity+=mod(attacker.strength) * 2;
                }
                if(attacker.stance === 'defensive') {
                    attacker.stance = 'offensive';
                    printC(attacker.name + ' assumes an offensive stance!');                    
                    attacker.AC-=12;
                    attacker.damage+=mod(attacker.strength);
                    attacker.dmgBns+=mod(attacker.strength);
                }
            },
            Guard_Stance: function(attacker) {
                if(attacker.stance !== 'defensive') {
                    attacker.stance = 'defensive';
                    printC(attacker.name + ' assumes a defensive stance!');
                    attacker.AC+=6;
                }
                if(attacker.stance === 'offensive') {
                    attacker.stance = 'defensive';
                    printC(attacker.name + ' assumes a defensive stance!');
                    attacker.AC+=12;
                    attacker.damage-=mod(attacker.strength);
                    attacker.dmgBns-=mod(attacker.strength);
                    attacker.dexterity-=mod(attacker.strength) * 2;
                }
            },
        },
        story: {
			backStory: "You remember that you are Mance Krauss, a knight of Erdwynn, and first sword of the kingdom of Sommer's Glen.</p><p>During the Seven Year War, your king ordered you abandon your post to escort his winemaker to the vineyard beyond the castle walls. Though you acted according to your king, when you abandoned your post, a raiding party slipped through the gates and infiltrated the palace. Sparing the king to use as a hostage, they murdered the rest of the royal family. The king was made to order the opening of Sommer's Glen's main gate, allowing the invading army of Belan to sieze control of the castle and the realm. Your brothers in arms were executed and the kingdom conquered by the time you returned with the casks of wine you were sent for.</p><p>Despite murdering the winemaker for convincing the king of ordering such a fool's errand, there was nothing else you could do. Facing certain death at the hands of your enemies, or disgrace, you chose to survive and fled the realm.</p><p>Since entering your exile, you have roamed the lands in search of appropriate penance and some kind of peace. Your search led you to the forests of Nerdim and now here...",
			},//END STORY
        imgSrcLeft:'./assets/images/char6left.png',
        imgSrcRight:'./assets/images/char6right.png',
    },

    char2: {
        name: 'Sorcerer',
        HP: 78,
        AC: 9,
        MP: 10,
        SP: 4,
        damage: 6, //+3. but 1d10 flat with fireball
        dmgBns: 4,
        strength: 10,
        dexterity: 16,
        constitution: 12,
        intelligence: 16, 
        wisdom: 13,
        charisma: 8,
        speed: 30,
        actions: {
            Gather_Mana: manaRecover,
            Arcane_Bolt: function(attacker, defender) {
                printA(attacker, "Arcane Bolt", 'MP');
                fireball(attacker, defender);
            },
            Channel: function(attacker){
                channel(attacker, mod(attacker.intelligence));
            },
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
        story: {
            backStory: "",
        },
        imgSrcLeft:'./assets/images/char2left.png',
        imgSrcRight:'./assets/images/char2right.png',
    },
    char3: {
        name: 'Rogue',
        HP: 70,
        AC: 14,
        MP: 0,
        SP: 5,
        damage: 8, //+3? 
        dmgBns: 4,
        strength: 8,
        dexterity: 16,
        constitution: 10,
        intelligence: 13, 
        wisdom: 12,
        charisma: 16,
        speed: 28,
        actions: {
            Stab: attackIt,
            Poison_Strike: poisonAttack,
            Groin_Kick: function(attacker, defender) {
                printA(attacker, "Groin Kick", 'SP');
                kick(attacker, defender);
            },
        },
        story: {
            backStory: "",
        },
        imgSrcLeft:'./assets/images/char3left.png',
        imgSrcRight:'./assets/images/char3right.png',
    },

    char4: {
        name: 'Monk',
        HP: 85,
        AC: 12,
        MP: 0,
        SP: 4,
        damage: 4,
        dmgBns: 2,
        strength: 8,
        dexterity: 17,
        constitution: 14,
        intelligence: 10, 
        wisdom: 14,
        charisma: 12,
        speed: 20,
        actions: {
            Focus: function(attacker){
                channel(attacker, mod(attacker.wisdom));
            },
            Double_Strike: function(attacker, defender) {
                multiAttack(attacker, defender, 2);
            },
            Punishing_Fists: function (attacker, defender) {
                printA(attacker, 'Punishing Fists!', 'SP');
                if(attacker.SP > 0) {
                    multiAttack(attacker, defender, roll(attacker.SP + mod(attacker.wisdom)));
                    attacker.SP = 0;
                }
            }, 
        },
        story: {
            backStory: "",
        },
        imgSrcLeft:'./assets/images/char4left.png',
        imgSrcRight:'./assets/images/char4right.png',
    }
}

var boss = {
    name: 'Atlas',
    HP: 185,
    AC: 13,
    MP: 0,
    SP: 4,
    damage: 4,
    dmgBns: 2,
    strength: 8,
    dexterity: 17,
    constitution: 14,
    intelligence: 10, 
    wisdom: 14,
    charisma: 12,
    speed: 20,
    actions: {
        Focus: function(attacker){
            channel(attacker, mod(attacker.wisdom));
        },
        Double_Strike: function(attacker, defender) {
            multiAttack(attacker, defender, 2);
        },
        Punishing_Fists: function (attacker, defender) {
            printA(attacker, 'Punishing Fists!', 'SP');
            if(attacker.SP > 0) {
                multiAttack(attacker, defender, roll(attacker.SP + mod(attacker.wisdom)));
                attacker.SP = 0;
            }
        }, 
    },
    imgSrcLeft:'./assets/images/char1left.png',
    imgSrcRight:'./assets/images/char1right.png',
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
    char.HP += roll(20);
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
        if(roll(20) + mod(attacker.intelligence) > 11) {
            attacker.barrierHP = roll(attacker.maxHP / 2) + roll(attacker.damage) + mod(attacker.intelligence) + mod(attacker.constitution);
            printC(attacker.name + ' is surrounded by a magical barrier with ' + attacker.barrierHP + ' HP!');
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

function channel(attacker, charges) {
    if(attacker.SP < attacker.maxSP) {
        printC(attacker.name + ' focuses their energy!');        
        //determine MP recovered
        let plusSP = charges;
        //if more than Max, set to maxMP
        if(attacker.maxSP < attacker.SP + plusSP) {
            attacker.SP = attacker.maxSP;
            //else add it
        } else {
            attacker.SP += plusSP;
        }
    }
}

function magicMissles(attacker, defender) {
    if(attacker.MP >= 2 && attacker.SP > 0) {
        let dmg = 0;
        let bolts = 0;
        for(i = 0; i < attacker.SP; i++) {
            if (roll(20) + mod(attacker.intelligence) > defender.AC) {
                dmg += roll(attacker.damage) + mod(attacker.intelligence) + attacker.dmgBns;
                bolts++;
            }
        }
        if(dmg > 0) {
            defender.HP -= dmg;
            printC(defender.name + ' is hit by ' + bolts + ' out of '+ attacker.SP +  ' bolts!');
            printC(defender.name + ' takes ' + dmg + ' points of damage!');
        } else {
            printC(defender.name + ' narrowly avoids all of arcane bolts!');
        }
        attacker.SP = 0;
        attacker.MP -= 2;
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
    defender.stunCounter = roll(4) + attacker.dmgBns;
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
                .text("Who are you?");
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
            $('body').fadeOut('slow', function (){
                $('body').fadeIn('slow', game.storyPage(game.enemyChoose, game.player.story.backStory + preFight, 'player'));
            });

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
            $('#instr').fadeOut('slow');
            $('#enemies').fadeOut('slow', function(){
                $('#enemies').remove();
                $('#instr').remove();
                
                //add div for combat text
                $('<div>').attr("id", "combatTextContainer").attr("class", "combatTextContainer").appendTo('body');            
                $('<div>').attr("id", "combatText").attr("class", "combatText").appendTo('#combatTextContainer');
                //add div for btns
                $('<div>').attr("id", "actionBtns").attr("class", "actionBtns").appendTo('body');
                game.drawButtons();
            });
            game.battleStarted = false;
        },//end enterBattle

        drawButtons: function() {
            $('#actionBtns').hide();
            $('#combatTextContainer').hide();
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
            $('#actionBtns').fadeIn('slow');
            $('#combatTextContainer').fadeIn('slow');
            
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
                    game.battleWon(game.enemyChoose, 'Defeated text here', 'foe');
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
            
            if(game.player.HP > 0) {
                printC(game.player.name + " defeated " + game.currentOpponent.name + '!');
            } else if (game.currentOpponent.HP > 0) {
                printC(game.currentOpponent.name + " defeated " + game.player.name + '!');
            } else {
                printC(game.player.name + " and " + game.currentOpponent.name + ' defeated each other!');                
            }
            let x = $('<button>').attr('id', 'Continue').text('Continue').on("click", function(){
                    $('body').fadeOut('slow', function(){
                        game.storyPage(fx, str, pic);
                        $('body').fadeIn('slow');
                    });
            });
            $('#actionBtns').append(x)

        },

        storyPage: function (fx, str, pic) {
            //this chunk draws player in left corner with text
            $('body').empty();
            $('<div>').addClass("storyPageDiv").attr("id", "storyPageDiv").appendTo('body');
            switch (pic) {
                case 'player':
                    $('<img>').attr("src", game.player.imgSrcRight).attr("id", "player").addClass('playerStoryPic').appendTo('#storyPageDiv');
                break;
                case 'foe':
                    $('<img>').attr("src", game.currentOpponent.imgSrcLeft).attr("id", "enemy").addClass('enemyStoryPic').appendTo('#storyPageDiv');
                break;
                case 'boss':
                    $('<img>').attr("src", boss.imgSrcLeft).attr("id", "enemy").addClass('enemyStoryPic').appendTo('#storyPageDiv');                    
                break;
            }
            $('<p>').html(str).appendTo('#storyPageDiv');
            $('<button>').attr("id", "Continue").text("Continue")
                        .on("click", function() {
                            $('body').fadeOut('slow', function(){
                                fx();
                                $('body').fadeIn('slow');
                            
                            });
                        }).appendTo('#storyPageDiv');
        }, //end storyPage
    intro: "The arena is filled with cheering spectators in strange dress. Airships float through the sky above the arena filled with more spectators. You marvel at the flying ships; you didn't know such machinations were possible. Looking past the crowd, you see tall buildings with strange architecture that jut into the sky just beyond the stands. The arena is situated in the middle of a city of such buildings. You realize that you are far, far away from home.</p><p>In the middle of the stands, from the section you assume would be reserved for royalty steps a figure wearing heavy armor and carrying a massive sword.</p><p>A hush falls over the crowd.</p><p>The figure says, \"Welcome! For the entertainment of you, our guests, we have prepared this glorious display of valor and blood. This melee we dedicate to Innovar, lord of the Umbral plane, in celebration of his works!\"</p><p>The crowd cheers more raucously than before, but the armored man raises his hand to silence the onlookers.</p><p>\"For this season's tribute, we have scoured the material planes in search of worthy contestants for Innovar's blessing. With pleasure, I introduce our tournament's contestants!\"</p><p>The man gestures to the arena where you stand, and for the first time you realize that you are not alone in the arena. You can see that there are other contestants wearing stunned and confused looks that match your own.</p><p>The announcer continues, \"First we have the Dishonorable Knight. The greatest sword of his order, but sole survivor of the fall of his realm. Now a disgraced vagabond.\"</p><p>\"Next, I present the Soulless Sorceress. Without caution, she bartered her soul to the demon Valefor in exchange for Arcane might.\"</p><p>\"Third is the Hedonistic Assassin. Untainted by guilt or remorse, he leaves bodies and sorrow in the wake of his pursuit of riches and women.\"</p><p>\"Last is the Faithless Ascetic, a monk of the highest martial prowess. Abandoning his order and his God, he wanders the planes in search of his own truth.\"</p><p>The words of the announcer sting you, and the pain makes you finally remember who you are...",

    }//end game obj

    $('#initial').on("click", "#start", function() {
        $('body').fadeOut('slow', function(){
            $('body').fadeIn('slow', game.storyPage(game.characterSelect, game.intro, 'boss'));
        });
    });
    
});
