var preFight = "</p><p>The announcer calls out with a bellow, \"Let the games begin!. Contestants, choose your opponents wisely. Only one of you will leave this arena alive!";

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
        constitution: 18,
        intelligence: 9, 
        wisdom: 11,
        charisma: 14,
        speed: 38,
        actions: {
            Attack: function(attacker, defender) {
                attackIt(attacker, defender);
            },
            Rest: skillRecover,
            Double_Slash: function(attacker, defender) {
                printA(attacker, 'Double Slash', 'SP', 1);
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
                    attacker.damage+=attacker.dmgBns;
                    attacker.dexterity+=mod(attacker.strength) * 2;
                }
                if(attacker.stance === 'defensive') {
                    attacker.stance = 'offensive';
                    printC(attacker.name + ' assumes an offensive stance!');                    
                    attacker.AC-=12;
                    attacker.damage+=attacker.dmgBns;
                    attacker.dexterity+=mod(attacker.strength) * 2;
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
                    attacker.damage-=attacker.dmgBns;                    
                    attacker.dexterity-=mod(attacker.strength) * 2;
                }
            },
        },
        story: {
            backStory: "You remember that you are Mance Krauss, a knight of Erdwynn, and first sword of the kingdom of Sommer's Glen.</p><p>During the Seven Year War, your king ordered you abandon your post to escort his winemaker to the vineyard beyond the castle walls. Though you acted according to your king, when you abandoned your post, a raiding party slipped through the gates and infiltrated the palace. Sparing the king to use as a hostage, they murdered the rest of the royal family. The king was made to order the opening of Sommer's Glen's main gate, allowing the invading army of Belan to sieze control of the castle and the realm. Your brothers in arms were executed and the kingdom conquered by the time you returned with the casks of wine you were sent for.</p><p>Despite murdering the winemaker for convincing the king of ordering such a fool's errand, there was nothing else you could do. Facing certain death at the hands of your enemies, or disgrace, you chose to survive and fled the realm.</p><p>Since entering your exile, you have roamed the lands in search of appropriate penance and some kind of peace. Your search led you to the forests of Nerdim and now here...",
            loseText: "The knight falls on one knee, beaten. His eyes flash with remorse at the thought of never regaining the honor he lost for his disgrace. However, he closes his eyes and coughs the blood from his throat before drawing one last breath.</p><p>With the thought of rejoining his brethren in the afterlife, his face betrays the faintest smile before he falls to the ground and breathes no more.",
            winText: "Having bested the announcer, the crowd stares down at you in shock. You rip the enchanted blade from his hands and examine it briefly. You feel within it power beyond imagination.</p><p>You raise the blade above your head and look to the crowd. They begin to cheer raucously at your show of valor and might.</p><p>The crowd begins to empty the stands and flood the arena. You are swept off your feet and carried out of the arena by the crowd, who parade you down the streets, their new champion.</p><p>Though weary from battle, your mind races with thoughts of how you will rule your new kingdom.",
        },//END STORY
        imgSrcLeft:'./assets/images/char6left.png',
        imgSrcRight:'./assets/images/char6right.png',
    },

    char2: {
        name: 'Sorcerer',
        HP: 78,
        AC: 11,
        MP: 10,
        SP: 2,
        damage: 5, //+3. but 1d10 flat with fireball
        dmgBns: 5,
        strength: 10,
        dexterity: 16,
        constitution: 12,
        intelligence: 18, 
        wisdom: 13,
        charisma: 8,
        speed: 30,
        actions: {
            Gather_Mana: manaRecover,
            Arcane_Bolt: function(attacker, defender) {
                printA(attacker, "Arcane Bolt", 'MP', 1);
                fireball(attacker, defender);
            },
            Channel: function(attacker){
                channel(attacker, roll(mod(attacker.intelligence)));
            },
            Arcane_Volley: function (attacker, defender) {
                printA(attacker, "Arcane Volley", 'MP', 2);
                magicMissles(attacker, defender);
            },
            Dispel_Toxin: curePoison,
            Arcane_Protection: function(attacker, defender) {
                printA(attacker, "Arcane Protection", 'MP', 3);
                barrier(attacker, defender);
            },
        },
        story: {
            backStory: "You remember that you are Sanala Rhy'Din, daughter of Q'ara and Bedic, and Princess of Marr.</p><p>Upon coming of age, you were sent away by your parents to learn magic, as is customary for your people. However, instead of attending the local academy, your father, King Bedic, ordered you be taught private lessons by the esteemed sorcerer Enro. The King feared not only for your safety in the academy, but thought it wise to provide the best instruction possible, and who better than one of the legendary heroes?</p><p>The King's decision proved unwise however, as Enro was an arrogant and unforgiving man. He had no patience for novices, and lacked the subtlety and grace needed to help ease a young girl like yourself into the realm of womanhood.</p><p>He demanded you devote yourself wholly to the study of the mystic arts. In lieu of intense study to try and meet his unrealistic expectations, you sought shortcuts.</p><p>After finding a tome on summoning incantations, you discovered the spell to summon the demon Valefor, master of evocation. Armed with this spell and a binding circle, you summoned the demon and attempted to bind him.</p><p>He easily bested your attempts to contain him however, and offered you two choices: die now and offer your soul as punishment for summoning him, or accept his power and forfeit your soul upon death.</p><p>Realizing you had made a grave mistake and thinking you could at least buy yourself more time, you accepted his offered and made a pact in exchange for power.</p><p>After waking from a terrible dream, you found yourself in the smoldering ruins of your kingdom. Enro laid at your feet, mortally injured and scowling you.</p><p>\"What have you done?\" He fell silent and still after he spoke his last words.</p><p>After years spent wandering and searching for a way to best Valefor and free yourself from his chains, you found yourself approaching Fandalin in the forest of Nerdim. Now here you are in this strange arena.",
            loseText: "The sorcerer grasps at her chest, frantic and unable to breath. Light pours from her eyes and mouth while demonic laughter fills the air. Her face contorts in terror at the sound. Suddenly, she freezes in place. Her form seems to crinkle and crack, before the arena is rocked by an explosion.</p><p>She vaporizes before the crowd, leaving only a small charred crater where she stood, and faint echoes of the unholy laughter reverberating through the air.",
            winText: "The announcer, still and lifeless, lay before you. Rolling his lifeless body aside, you grab his enchanted sword.</p><p>You instantly realize the magnitude of the power contained within the blade. Wasting no time, you whisper the incantation that you will never forget, the one that summons the demon Valefor.</p><p>With a blinding flash, the crowd gasps at the sight of the demon before them.</p><p>\"What fool dares summon Valefor?\" The beast's voice sends shivers through the spectators. He turns to you and his lips draw into a grin.</p><p>Before he can say another word, you drive the spellblade deep into his body, impaling the demon. Valefor drops to one knee and grasps the blade in an attempt to wrest it from his chest. While the demon is distracted, you whisper the words to dispel the containment magic on the blade, followed by those to cast blink.</p><p>You watch the explosion from high above the arena, safely insulated from the blast in the space between planes. You see that the battlegrounds were situated in the middle of a city that spanned the entirety of a free-floating island. At least, they did before the explosion shattered a large portion of it. and whisper the words to dispel the containment magic on the blade.</p><p>Once you finish marvelling at the destruction, you feel a peace you have not known for what feels like ages. Freedom. You cast a teleportation spell and leave the Umbral plane.",
        },
        imgSrcLeft:'./assets/images/char2left.png',
        imgSrcRight:'./assets/images/char2right.png',
    },
    char3: {
        name: 'Rogue',
        HP: 70,
        AC: 12,
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
        speed: 32,
        actions: {
            Stab: function(attacker, defender) {
                if(attacker.SP < attacker.maxSP) {
                    attacker.SP++;
                }
                attackIt(attacker, defender);
            },
            Poison_Strike: poisonAttack,
            Cheap_Shot: function(attacker, defender) {
                printA(attacker, "Cheap Shot", 'SP', 1);
                kick(attacker, defender);
            },
            Backstab: function(attacker, defender) {
                printA(attacker, "Backstab", 'SP', 2);
                if(attacker.SP >= 2) {
                    attacker.SP-=2;
                    if(roll(20) > defender.AC / 2) {
                        let dmg = (attacker.dmgBns * 4) + roll(attacker.damage);
                        defender.HP-=dmg;
                        printC(defender.name + ' takes ' + dmg + ' points of damage!');
                    } else {
                        printC(defender.name + ' dodges the blade!');
                    }
                }
            }
        },
        story: {
            backStory: "You remember that you are Lox Kellan, and you immediately swear that you will never drunkenly decide to travel alone again.</p><p> As the highest paid and most feared Assassin in Freeport, you naturally began to garner more and more enemies. Eventually the attempts on your life began to outweigh the allure Freeport's notoriously beautiful women, and you decided it was time to relocate. So you packed your bags and fled the city under the cover of darkness, stealing nips from your flask as you watched the city disappear over the horizon.</p><p>Accepting only enough work to keep your wallet filled and your flask full, you moved from city to city all across Erthos, leaving numerous dead bodies and discarded maidens in your wake.</p><p>After an altercation in a lowly inn at the end of a night of drinking, you found yourself wandering through Nerdim forest heading towards Fandalin. If it wasn't for your carelessness and inebriation, those thugs never would have gotten the drop on you.</p><p>To make matters worse, you are painfully sober and staring down an awful death participating in some terrible gladiator show.</p><p> Heaving a deep sigh, your hand brushes your coat pocket, and you feel your flask tucked close to your chest. You quickly snatch it out and gulp down the  liquor within. Maybe things aren't so bad after all.",
            loseText: "The rogue, bloodied and wounded, discards his rapier and dagger before easing himself to the ground. However, lacking sufficient strength, he trips and lays himself out in the dirt.</p><p>Lying supine and staring at the sky, totally oblivious to the crowd and his opponent, he produces his flask and pours the last drops into his mouth before his arm goes limp and the life leaves his eyes.",
            winText: "As the announcer falls, you pause to read the crowd, curious as to whether they will cheer or boo the death of their leader.</p><p>To your relief, the crowd erupts into uproarious cheer. You stand straight and begin to bow repeatedly and wave to the audience. When spectators begin to enter the arena grounds, you fish a smoke pellet from your belt and palm it discreetly, waiting for your new fans to approach.</p><p>Before the crowd gets too close, you smash the pellet and surround yourself and the announcer in smoke. Quickly, you loot his body, searching for gold, valuables, and booze. Unfortunately, with time only for a cursory glance, you only find the heavy sword he used in battle. You deem it too heavy and unwieldly to use or steal and quickly shed your cloak. </p><p>As the first fans approach, you mix in with the crowd, using the excitement and confusion to slip away.</p><p>Outside the arena, you make your way to the nearest pub in search of ale and women.",
        },
        imgSrcLeft:'./assets/images/char3left.png',
        imgSrcRight:'./assets/images/char3right.png',
    },

    char4: {
        name: 'Monk',
        HP: 85,
        AC: 12,
        MP: 0,
        SP: 2,
        damage: 4,
        dmgBns: 3,
        strength: 8,
        dexterity: 17,
        constitution: 14,
        intelligence: 10, 
        wisdom: 14,
        charisma: 12,
        speed: 20,
        mended: false,
        actions: {
            Focus: function(attacker){
                channel(attacker, roll(attacker.dmgBns));
            },
            Double_Strike: function(attacker, defender) {
                multiAttack(attacker, defender, 2);
            },
            Punishing_Fists: function (attacker, defender) {
                if(attacker.SP > 0) {
                    multiAttack(attacker, defender, roll(attacker.SP +attacker.dmgBns));
                    attacker.SP = 0;
                }
            },
            Mend: function (attacker, defender) {
                if (!attacker.mended) {
                    attacker.mended = true;
                    attacker.HP += Math.floor(attacker.maxHP / 3);
                    if(attacker.HP > attacker.maxHP) {
                        attacker.HP = attacker.maxHP;
                    }
                    printC(attacker.name + ' focuses his chi to his wounds!');
                }
                else {
                    printC(attacker.name + ' is out of breath!');
                    
                }
            },
        },
        story: {
            backStory: "You remember that you are Medin of the Empty Hand, disciple of Syr, and master of the martial arts.</p><p>As an orphan, you were taken in by monks from hidden monastery in the Tolsar Mountains and trained in their ways from a young age.</p><p>Each day you spent seven hours tempering your body into a weapon in the service of Syr the Tranquil, and the remaining daylight studying Syr's teachings and maintaining the monastery grounds.</p><p>As you aged, your martial skills continued to develop and even surpass the elder monks.</p><p>At the annual tournament before your eighteenth name day, you competed against your brothers for sport in celebration of Syr and his teachings.</p><p>As you progressed through the rankings, whispers circulated about your love of battle and the severity of the injuries you imposed on your opponents.</p><p>In the final bout, not knowing your own strength, you delivered a lethal blow to your opponent, one of your fellow monks.</p><p>You were exiled from the monastery and forced to denounce yourself before Syr.</p><p>Forced to wander the Earth, shamed and exiled, you brought justice to evildoers and devoted your life to honoring Syr's teachings despite your mistakes.</p><p>Your quest found you in the forest of Nerdim, on your way to Fandalin to ask guidance from Nephilhelm, Syr's most famous disciple. Now you find yourself in another wretched tournament, this time forced to use your fists for bloodshed.",
            loseText: "The monk breathes heavily trying to catch his breath. His body can no longer ignore his injuries through sheer will alone, and his fighting stance relaxes slightly. As his breath slows, he recites Syr's final blessing quietly, not loud enough for any to hear. When he finishes, still standing, his arms fall to his sides. He stands still as a statue on the battleground, his body too strong to fall, despite his defeat.",
            winText: "The announcer, beaten and broken, lays at your feet.</p><p>The cheers of the crowd at your victory only serve to enrage you. \"This contest is an affront to Syr\", you think to yourself. Looking down at the announcer's corpse, you see his spellblade at his feet. You pick the blade up and hold it high above your head. The crowd cheers even louder at your display.</p><p>You deploy all of your might in bringing the blade down into the ground, unleashing the awesome fury of its power on the floating landmass the city and arena are built upon.</p><p>Cheers turn to screams and the floating island splits in two, and the large buildings beginning to crumble around the arena. You feel your stomach heave as the entire island begins to fall, the damage dealt to its core so absolute that it can no longer hold itself together.</p><p>You discard the sword, its magic now completely consumed, and watch the destruction of the island.</p><p>As you wait for death, you feel the hand of Syr on your shoulder, and you hear him say with perfect calm, \"Your work is not yet complete, my child.\"",
        },
        imgSrcLeft:'./assets/images/char4left.png',
        imgSrcRight:'./assets/images/char4right.png',
    }
}

var boss = {
    name: 'Atlas',
    HP: 300,
    AC: 10,
    MP: 10,
    SP: 12,
    damage: 10,
    dmgBns: 4,
    strength: 15,
    dexterity: 16,
    constitution: 8,
    intelligence: 16, 
    wisdom: 14,
    charisma: 12,
    speed: 40,
    actions: {
        Focus: function(attacker){
            channel(attacker, mod(attacker.wisdom));
        },
        MultiSlash: function(attacker, defender) {
            printA(attacker, 'Multi Slash', 'SP', 4);
                if(attacker.SP > 0) {
                    multiAttack(attacker, defender, 4);
                    attacker.SP -= 4;
                }
        },
        Arcane_Slash: function(attacker, defender) {
            printA(attacker, "Arcane Slash", 'MP', 1);
            fireball(attacker, defender);
        },
    },
    story: {
        preFight: "The announcer leaps from his place in the stands down into the arena before you.</p><p>A hush falls over the crowd and he says, \"Well-met champion! You have given us a marvelous show this day!\"</p><p>He draws his sword and points it at you.</p><p>\"Pray tell, though, Champion, did you expect to leave here with your life? All are tribute to Innovar, and you are no different.\"</p><p>You steel yourself for the final battle, summoning what's left of your strength.",
        postFight: "The announcer, mortally wounded but still compelled to get the last word, says, \"You think you've won the day... Fool. May Innovar feast your essence for a thousand years.\"</p><p>He chokes on his words and heaves a final, labored breath before collapsing in a heap on the ground.",
    },
    imgSrcLeft:'./assets/images/char1left.png',
    imgSrcRight:'./assets/images/char1right.png',
}

//super important for deep copy! Thanks stack overflow!
function copy(oldObject) {
    var newObject = jQuery.extend(true, {}, oldObject);
    return newObject;
}

function printA (attacker, actName, points, cost) {
    switch (points) {
        case 'SP':
        if (attacker.SP >= cost) {
            printC(attacker.name + ' uses ' + actName + '!');
        } else {
            printC(attacker.name + ' is out of ' + points + '!');
        }
        break;
        case 'MP':
        if (attacker.MP >= cost) {
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
    char.dmgBns++;
    char.strength += roll(4) + mod(char.strength);
    char.dexterity += roll(2);
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
		let psnDmg = roll(4) + roll(4) + roll(4);
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
    if(char.stunCounter == 0) {
        printC(char.name + " is no longer stunned!");
        char.stunCounter--;        
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

    afterTurn(char);
    afterTurn(opponent);
}

function cpuTurn(cpu, target) {
    beforeTurn(target);
    beforeTurn(cpu);
    //stunned
    if(cpu.stunCounter == 0) {
        printC(cpu.name + " is no longer stunned!");
        cpu.stunCounter--;
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
                dmg += roll(attacker.damage) + attacker.dmgBns;
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
	if(roll(20) > 10 + mod(defender.constitution)) {
        if(defender.stunCounter == undefined || defender.stunCounter < 0) {
            defender.stunCounter = 0;
        }
        if(defender.stunCounter == 0) {
            defender.stunCounter += roll(4);
            printC(defender.name + " is stunned!");
        } else {
		printC(defender.name + " cannot be more stunned!");
        }
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

            if(game.foeCounter > 0) {

                $('<h1>').attr("class", "instr").attr("id", "instr").text("Choose Your Opponent").appendTo('body');
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
                }//end for
                $('body').append(a);
            }//end if foes > 0
            else {
                game.enterBattle();
            }

        },
        enterBattle: function(x) {
            let enemy = 'balls';
            if(game.foeCounter > 0) {
                //x is the pic, use the id
                enemy = $(x).attr("id");
                game.currentOpponent = copy(game.chars[enemy]);
            } else {
                game.currentOpponent = copy(boss);
                enemy = 'boss';
            }
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
            if(game.foeCounter > 0) {
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
            } //end if foes > 0
            //else if foes = 0, and it's boss time,
            else {
                $('<div>').attr("id", "combatTextContainer").attr("class", "combatTextContainer").appendTo('body');            
                $('<div>').attr("id", "combatText").attr("class", "combatText").appendTo('#combatTextContainer');
                //add div for btns
                $('<div>').attr("id", "actionBtns").attr("class", "actionBtns").appendTo('body');
                game.drawButtons();
            }
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
                game.battleWon(game.characterSelect, game.player.story.loseText, 'player');
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
                    game.battleWon(game.enemyChoose, game.currentOpponent.story.loseText, 'foe');
                }
                //if no more dudes, this
                if (game.foeCounter == 0) {
                    let x = function() {game.storyPage(game.enemyChoose, boss.story.preFight, 'boss')}
                    game.battleWon(x, game.currentOpponent.story.loseText, 'foe');
                    // game.battleWon(game.characterSelect, game.player.story.winText, 'player');
                }
                //if boss defeated
                if(game.foeCounter < 0) {
                    let credits = function (){game.storyPage(game.characterSelect,'Thanks for Playing!', 'boss')}
                    let ending = function () {game.storyPage(credits, game.player.story.winText, 'player')}
                    game.battleWon(ending, game.currentOpponent.story.postFight, 'boss');
                    
                    // game.battleWon(game.characterSelect, 'boss lost text here', 'boss');
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
