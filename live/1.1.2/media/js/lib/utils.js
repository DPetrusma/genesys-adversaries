"use strict";System.register([],function(_export,_context){"use strict";var minionSkill,characteristics,dice,symbolise,diceMap,book,bookMap,statify,words,times,sourceMap,getSourceLink;function r(symbol,ranks){var buffer=[];for(var i=0;i<ranks;++i){buffer.push(":"+symbol+":")}return buffer.join("")}return{setters:[],execute:function(){_export("minionSkill",minionSkill=function minionSkill(minions,skill,skills){var value=0;var skillsHash={};if(Array.isArray(skills)){skills.forEach(function(s){return skillsHash[s]=0})}else{skillsHash=skills}if(minions>0&&skill in skillsHash){value+=minions-1}return Math.min(value,5)});_export("minionSkill",minionSkill);_export("characteristics",characteristics=["Brawn","Agility","Intellect","Cunning","Willpower","Presence"]);_export("characteristics",characteristics);_export("dice",dice=function dice(stat,skill){var total=Math.max(stat,skill);var upgrade=Math.min(stat,skill);var symbols=[];for(var j=0;j<upgrade;++j){symbols.push(diceMap["proficiency"])}for(var _j=upgrade;_j<total;++_j){symbols.push(diceMap["ability"])}return{__html:symbols.join("")}});_export("dice",dice);_export("symbolise",symbolise=function symbolise(text){Object.keys(diceMap).forEach(function(k){var reg=new RegExp(":"+k+":","g");text=text.replace(reg,diceMap[k])});return{__html:text}});_export("symbolise",symbolise);_export("diceMap",diceMap={// dice
"boost":"<span class='icon boost'></span>","proficiency":"<span class='icon proficiency'></span>","ability":"<span class='icon ability'></span>","setback":"<span class='icon setback'></span>","challenge":"<span class='icon challenge'></span>","difficulty":"<span class='icon difficulty'></span>","force":"<span class='icon force'></span>",// outcomes
"advantage":"<span class='icon advantage'></span>","failure":"<span class='icon failure'></span>","success":"<span class='icon success'></span>","threat":"<span class='icon threat'></span>","triumph":"<span class='icon triumph'></span>","despair":"<span class='icon despair'></span>",// force
"lightside":"<span class='icon lightside'></span>","darkside":"<span class='icon darkside'></span>","forcepip":"<span class='icon forcepip'></span>",// difficulty levels
"easy":"<strong>Easy</strong> (<span class='icon difficulty'></span>)","average":"<strong>Average</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span>)","hard":"<strong>Hard</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)","daunting":"<strong>Daunting</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)","formidable":"<strong>Formidable</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",// upgraded easy difficulty
"easy-1":"<strong>Easy</strong> (<span class='icon challenge'></span>)",// upgraded average difficulty
"average-1":"<strong>Average</strong> (<span class='icon challenge'></span><span class='icon difficulty'></span>)","average-2":"<strong>Average</strong> (<span class='icon challenge'></span><span class='icon challenge'></span>)",// upgraded hard difficulties
"hard-1":"<strong>Hard</strong> (<span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)","hard-2":"<strong>Hard</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon difficulty'></span>)","hard-3":"<strong>Hard</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span>)",// upgraded daunting difficulties
"daunting-1":"<strong>Daunting</strong> (<span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)"});_export("diceMap",diceMap);_export("book",book=function book(name){return name in bookMap?bookMap[name]:name});_export("book",book);bookMap={// core books
"book:aor":"Age of Rebellion","book:eote":"Edge of the Empire","book:fad":"Force and Destiny","book:GCRB":"Genesys Core Rulebook","book:EPG":"Expanded Player's Guide","book:RoT":"Realms of Terrinoth","book:SotB":"Shadow of the Beanstalk",// beginner games
"book:aorbg":"Age of Rebellion: Beginner\u2019s Game","book:eotebg":"Edge of the Empire: Beginner\u2019s Game","book:tfabg":"The Force Awakens: Beginner\u2019s Game",// source books
"book:lonh":"Lords of Nal Hutta","book:sor":"Strongholds of Resistance","book:sof":"Suns of Fortune","book:nop":"Nexus of Power","book:dor":"Dawn of Rebellion","book:rots":"Rise of the Separatists","book:aaa":"Allies and Adversaries",// career books
"book:dc":"Dangerous Covenants",// no stats
"book:da":"Desparate Allies","book:doh":"Disciples of Harmony","book:ev":"Endless Vigil","book:fh":"Far Horizons","book:fc":"Fly Casual",// no stats
"book:ktp":"Keeping the Peace","book:lbe":"Lead by Example","book:sm":"Special Modifications","book:sot":"Stay on Target","book:ss":"Savage Spirits","book:eto":"Enter the Unknown","book:kof":"Knights of Fate","book:fo":"Fully Operational","book:cam":"Cyphers and Masks",// adventures
"book:oaa":"Onslaught at Arda I","book:cotgk":"Chronicles of the Gatekeeper","book:ragp":"Rescue at Glare Peak","book:uabs":"Under a Black Sun","book:flt":"Friends Like These","book:btr":"Beyond the Rim","book:motpq":"Mask of the Pirate Queen","book:joy":"Jewel of Yavin","book:god":"Ghosts of Dathomir"};_export("statify",statify=function statify(text,stats,ranks){// convert characteristics and skills
Object.keys(stats).forEach(function(k){return text=text.replace(new RegExp("{"+k+"}","g"),stats[k])});// insert ranks and format
text=text.replace(/\{ranks\}/g,ranks);text=text.replace(/\{ranks\|words\}/g,function(){return words[ranks]});text=text.replace(/\{ranks\|times\}/g,function(){return times[ranks]});text=text.replace(/\{ranks\|multiply-10\}/g,function(){return ranks*10});text=text.replace(/\{ranks\|multiply-50\}/g,function(){return ranks*50});text=text.replace(/\{ranks\|multiply-100\}/g,function(){return ranks*100});text=text.replace(/\{ranks\|minus-1\}/g,function(){return ranks-1});text=text.replace(/\{ranks\|plus-2\}/g,function(){return ranks+2});// add game symbols a number of times equal to ranks
["setback","boost","success","threat","force"].forEach(function(symbol){return text=text.replace(new RegExp("{ranks\\|("+symbol+")}","g"),function(s,match){return r(match,ranks)})});return text});_export("statify",statify);words=["","one","two","three","four","five"];times=["","once","twice","three times","four times","five times"];sourceMap={"source:Never Tell Me the Odds":"http://www.starwarsrpgpodcast.com/","source:D20Radio.com":"http://www.d20radio.com/main/","source:Heroes on Both Sides":"https://drive.google.com/file/d/1kz3ZK_Pmxf6HneRCOwY_0lzwmk0GZL1N/view","source:Creature Catalogue":"https://community.fantasyflightgames.com/topic/265621-genesys-creature-catalogue-formerly-bestiary/"};_export("getSourceLink",getSourceLink=function getSourceLink(source){if(source in sourceMap){return"<a href=\""+sourceMap[source]+"\" target=\"_blank\">"+source.replace("source:","")+"</a>"}return null});_export("getSourceLink",getSourceLink)}}});