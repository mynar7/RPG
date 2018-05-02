# RPG

## Overview
For this project I set out to make a turn-based role playing game similar to JRPGs from the 90's. The game has an active time battle system with each character having their own speed stat that controls how often they can perform an action. Each character also has unique moves based off of their individual stats.

The game begins with some exposition to set up the reason for why the characters must fight each other, as well as the main antagonist. Afterward the player chooses which character to play as, and then battles the remaining three characters before fighting the boss character. Each character has a unique story that is presented when the character wins or losses.

The battle system for the game is roughly based off of Gary Gygax's D&D system of using dice roll's to determine hits/misses and damage. For example, when performing a basic attack, a dice roll contrasted against the defending characters armor class (AC) determines whether or not an attack lands, and on a successful attack, the attacker rolls a damage dice plus a damage bonus to determine the amount of damage dealt.
 
The battle system also borrows some characteristics of older Final Fantasy titles, having stats like Hit Points, Magic Points, Skill points, and attacks that consume those stats when performed. This adds an element of resource management into the game so that a player must alternate attacks at the right time to be successful.
 
In addition to dealing damage, there are various moves that inflict status ailments like poison or stun, and some that benefit the character by healing, removing ailments, increasing stats, etc.

## Technologies
* Javascript
* jQuery
* HTML
* CSS

## Challenges
<ul><li> When coding the game, I used literal objects instead of constructor functions to contain all the attributes for each character. However, the characters were intended to start each new battle with their HP/MP/SP at max. Characters also level up after winning a battle and start the next battle with higher stats. Also I originally had the moves deleted from the object when a player depleted his skill points. However because the character data was coded as literal objects, I wasn't able to restore those methods by copying the object.

Fortunately, I was able to use jQuery's extend to deep copy the character objects and apply changes as needed to stats. This way I could level up a character, copy the character object before a battle, and then after battle use the original object to level up and continue the game, discarding the battle character object.

After becoming more familiar with constructor functions, I realized I should have written all the character data as a constructor, allowing me to create objects as needed and with whatever stats I wanted. Also, I believe I could have reduced the amount of code by having a constructor for the basic character objects and applying further changes as necessary.</li>

<li>I also had a hard time finding assets I could use for the game. Going forward I realize that I need to look into pixel art or a similar means of creating my own assets instead of searching for creative commons assets or commissioning artists.</li>

<li>During testing, I received feedback that the game could benefit from instructions. Having spent so much time on the game logic and UI, I did not realize that players wouldn't immediately be familiar with the game mechanics. I think I could remedy this by adding tooltips for the characters and move buttons, and also by possibly adding a general tutorial/mechanics page before the player initially chooses a character.</li></ul>

## Future Updates
* Tooltips
* Tutorial/Instructions

