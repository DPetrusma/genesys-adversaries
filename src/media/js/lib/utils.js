
import { findByProperty } from "./list"


export const minionSkill = function(minions, skill, skills) {
	let value = 0;
	let skillsHash = {};

	if(Array.isArray(skills)) {
		skills.forEach(s => skillsHash[s] = 0);
	}
	else {
		skillsHash = skills;
	}

	if(minions > 0 && skill in skillsHash) {
		value += minions - 1;
	}
	return  Math.min(value, 5);
}


export const characteristics = ["Brawn", "Agility", "Intellect", "Cunning", "Willpower", "Presence"];


// convert marked text into dice and return in a React dangerouslySetInnerHTML format
export const dice = function dice(stat, skill, boost, setback) {
	let total = Math.max(stat, skill);
	let upgrade = Math.min(stat, skill);
	let symbols = [];

	// build dice pool
	for(let j = 0; j < upgrade; ++j) {
		symbols.push(diceMap["proficiency"]);
	}

	for(let j = upgrade; j < total; ++j) {
		symbols.push(diceMap["ability"]);
	}

	// add boost
	for(let j = 0; j < boost; ++j) {
		symbols.push(diceMap["boost"]);
	}

	// add setback
	for(let j = 0; j < setback; ++j) {
		symbols.push(diceMap["setback"]);
	}

	return { __html: symbols.join("") };
}


// convert marked text into game symbols and return in a React dangerouslySetInnerHTML format
export const symbolise = function symbolise(text) {
	Object.keys(diceMap).forEach(k => {
		let reg = new RegExp(`:${k}:`, "g");

		text = text.replace(reg, diceMap[k]);
	});

	return { __html: text };
}

export const diceMap = {
	// dice
	"boost": "<span class='icon boost'></span>",
	"proficiency": "<span class='icon proficiency'></span>",
	"ability": "<span class='icon ability'></span>",
	"setback": "<span class='icon setback'></span>",
	"challenge": "<span class='icon challenge'></span>",
	"difficulty": "<span class='icon difficulty'></span>",
	"force": "<span class='icon force'></span>",

	// outcomes
	"advantage": "<span class='icon advantage'></span>",
	"failure": "<span class='icon failure'></span>",
	"success": "<span class='icon success'></span>",
	"threat": "<span class='icon threat'></span>",
	"triumph": "<span class='icon triumph'></span>",
	"despair": "<span class='icon despair'></span>",

	// force
	"lightside": "<span class='icon lightside'></span>",
	"darkside": "<span class='icon darkside'></span>",
	"forcepip": "<span class='icon forcepip'></span>",

	// difficulty levels
	"easy": "<strong>Easy</strong> (<span class='icon difficulty'></span>)",
	"average": "<strong>Average</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"hard": "<strong>Hard</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"daunting": "<strong>Daunting</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"formidable": "<strong>Formidable</strong> (<span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",

	// upgraded easy difficulty
	"easy-1": "<strong>Easy</strong> (<span class='icon challenge'></span>)",

	// upgraded average difficulty
	"average-1": "<strong>Average</strong> (<span class='icon challenge'></span><span class='icon difficulty'></span>)",
	"average-2": "<strong>Average</strong> (<span class='icon challenge'></span><span class='icon challenge'></span>)",

	// upgraded hard difficulties
	"hard-1": "<strong>Hard</strong> (<span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"hard-2": "<strong>Hard</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon difficulty'></span>)",
	"hard-3": "<strong>Hard</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span>)",

	// upgraded daunting difficulties
	"daunting-1": "<strong>Daunting</strong> (<span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"daunting-2": "<strong>Daunting</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"daunting-3": "<strong>Daunting</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span><span class='icon difficulty'></span>)",
	"daunting-4": "<strong>Daunting</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span>)",

	// upgraded formidable difficulties
	"formidable-1": "<strong>Formidable</strong> (<span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"formidable-2": "<strong>Formidable</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"formidable-3": "<strong>Formidable</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span><span class='icon difficulty'></span><span class='icon difficulty'></span>)",
	"formidable-4": "<strong>Formidable</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span><span class='icon difficulty'></span>)",
	"formidable-5": "<strong>Formidable</strong> (<span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span><span class='icon challenge'></span>)"
};


// return book name
export const book = function book(name) {
	return name in bookMap ? bookMap[name] : name;
}

let bookMap = {
	// core books
	"book:GCRB": "Genesys Core Rulebook",
	"book:EPG": "Expanded Player's Guide",
	"book:RoT": "Realms of Terrinoth",
	"book:SotB": "Shadow of the Beanstalk",
};


// add talent ranks, and correct numbers of dice to talent text
export const statify = function(text, stats, ranks) {
	// convert characteristics and skills
	Object.keys(stats).forEach(k => text = text.replace(new RegExp(`\{${k}\}`, "g"), stats[k]));

	// insert ranks and format
	text = text.replace(/\{ranks\}/g, ranks);
	text = text.replace(/\{ranks\|words\}/g,        () => words[ranks]);
	text = text.replace(/\{ranks\|times\}/g,        () => times[ranks]);
	text = text.replace(/\{ranks\|multiply-10\}/g,  () => ranks * 10);
	text = text.replace(/\{ranks\|multiply-50\}/g,  () => ranks * 50);
	text = text.replace(/\{ranks\|multiply-100\}/g, () => ranks * 100);
	text = text.replace(/\{ranks\|minus-1\}/g,       () => ranks - 1);
	text = text.replace(/\{ranks\|plus-2\}/g,       () => ranks + 2);

	// add game symbols a number of times equal to ranks
	["setback", "boost", "success", "threat", "force"].forEach(symbol => text = text.replace(new RegExp(`\{ranks\\|(${symbol})\}`, "g"), (s, match) => r(match, ranks)));

	return text;
}

let words = ["", "one", "two", "three", "four", "five"];
let times = ["", "once", "twice", "three times", "four times", "five times"];


function r(symbol, ranks) {
	let buffer = [];

	for(let i = 0; i < ranks; ++i) {
		buffer.push(`:${symbol}:`);
	}

	return buffer.join("");
}


let sourceMap = {
	"source:Never Tell Me the Odds": "http://www.starwarsrpgpodcast.com/",
	"source:D20Radio.com": "http://www.d20radio.com/main/",
	"source:Heroes on Both Sides": "https://drive.google.com/file/d/1kz3ZK_Pmxf6HneRCOwY_0lzwmk0GZL1N/view",
	"source:For Light and Life": "https://drive.google.com/file/d/1UqlPAo3cWwHKlTHV8lBIG8Wyk1BKTTRP/view?usp=sharing",
};

export const getSourceLink = function getSourceLink(source) {
	if(source in sourceMap) {
		return `<a href="${sourceMap[source]}" target="_blank">${source.replace("source:", "")}</a>`;
	}

	return null;
}


// return true if the character is a pilot
export const isPilot = function isPilot(character) {
	return "tags" in character && character.tags.indexOf("pilot") != -1;
}


// convert a hash of characteristics to an array of name/values
export const hashToArray = function hashToArray(hash) {
	let array = [];

	for(let i in hash) {
		array.push({
			"name": i,
			"value": hash[i]
		});
	}

	return array;
}


export const createQuality = function createQuality(qualities, name, rank) {
	// strip any ranks from the quality name
	let created = {
		name: name.replace(/\s\d+$/, ""),
		ranked: false
	};

	let quality = qualities.find(findByProperty("name", created.name));

	// if the quality is ranked, mark it as so and apply any ranks to it
	if(quality && quality.ranked) {
		created.ranked = true;

		// rank could be at the end of the name or it could be a separate argument
		// the separate argument takes the priority
		if(rank) {
			created.rank = rank;
		}
		else {
			let match = name.match(/\d+$/);

			if(match) {
				created.rank = match[0];
			}
		}
	}

	return created;
}
