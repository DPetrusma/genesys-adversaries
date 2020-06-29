# Genesys: Adversaries

A simple web app for looking up adversaries for the FFG's Genesys RPG. See it in action here: http://genesysadversaries.dylanpetrusma.com/. Credit for all of the hard work goes to Stoogoff: https://github.com/stoogoff. I only did some data entry for Genesys adversaries.

Built using:

- [Babel](https://babeljs.io)
- [React](https://facebook.github.io/react/)
- [Gulp](http://gulpjs.com/)
- Icons by [IcoMoon](https://icomoon.io/app/)
- Dice font from [FantasyFlightIcons](https://github.com/aflegel/FantasyFlightIcons)

## Structure

- build - build using gulp and babel
- dev - development version, created by gulp
- live - live version, created by gulp, everything is minified
- src - source code
	- src/media - all assets
		- src/media/data - JSON files containing adversary data
		- src/media/fonts - Star Wars dice font
		- src/media/js - all javascript
			- src/media/js/components - React components
			- src/media/js/lib - config and utilities
		- src/media/sass - sass stylesheet

## Install and Build

In the build directory run `npm install`. Once everything has installed run any of the following:

- `gulp dev clean` Delete the dev directory and start afresh.
- `gulp dev build` Completely build the project into the dev directory.
- `gulp watch` Watch files for changes and rebuild as necessary.

For Windows:

- Download npm from https://nodejs.org/en/download/.
- I needed to downgrade node.js to 10.x
- Add C:\Program Files\nodejs\ to your path.
- I needed to change some version for gulp saas. Open your package.json file and in that you will see gulp-saas in the dev dependencies. Change "gulp-sass": "^2.0.4" to "gulp-sass": "^3.1.0", run npm install
- Switch to your build directory and run `npm install`.
- Then run `npm install react@15.6.1`, and then `npm install react-dom@15.6.1`.
- To build from the build directory, run node_modules\.bin\gulp dev build, or node_modules\.bin\gulp live build.
- I had to copy react.min.js and react-dom.min.js from build/node_modules/react (or react-dom)/dist to the dev/[VERSION]/media/js/vendor folder, and rename to react.production.min.js and react-dom.production.min.js

## Host Locally

For Windows:

- In the build directory, run `npm install http-server -g`
- Run `http-server ../dev -c-1 -p 8010` to start a local server on port 8010 with no caching. In your browser, navigate to http://localhost:8010
- If you want to see changes reflected immediately, open a new Powershell/CMD window and run `gulp dev watch` in the build directory
- Change any of the watched files (including the JSON data files) and refresh the browser to see the changes

## Gulp

Main tasks:

`live` Output to the live directory and minify Javascript and CSS.

`dev` Output to the dev directory as is. This is the default action.

`clean` Delete the output directory.

`build` Build everything and save to the output directory.

`watch` After the `dev` task has completed watch all HTML, JS, SASS and JSON files for changes.

`deploy` After the `live` task has completed deploy to an AWS bucket. Target and authentication details need to be placed in a file called aws.json in the build directory. The format for this is:

``` JSON
{
	"key": "AUTH_KEY",
	"secret": "AUTH_SECRET",
	"bucket": "BUCKET_NAME",
	"region": "REGION"
}

```

## Completed Adversaries

- Creature Catalogue
- Core Rulebook
- Expanded Player's Guide
- Realms of Terrinoth
- Shadow of the Beanstalk

### In-Progress Adversaries

### Missing Adversaries

### Changes from source

- Creature Catalogue Ancient Wurm: Resilience instead of ranged. Added auto-fire and different ability (maybe make a new item quality?)
- Spectre: Ability can raise more spectres
- Instances of "Melee" fixed: CC Gorgul Demon claws changed to Brawl, CC Malithar Demon swords changed to Melee: Light and Tail lash changed to Brawl, CC Cyclops club changed to Melee: Light, CC Hill Giant club changed to Melee: Light, CC Fire Giant sword changed to Melee: Light, CC Frost Giant axe changed to Melee: Light
- CC Gnoll Night vision changed to Darkvision
- CC Some abilities renamed to match existing Star Wars or Genesys
- CC Lich removed Phylactery as it's mostly narrative
- A few talents and abilities on official adversaries were re-worded slightly to fit better with generic talents and abilities
-- E.g. Merriod has Multiattack instead of Monstrous Limbs

## TODO

- Favicon
- Get the source link updated
- Make it clear somehow that the credit goes to Stoo Goff for the design - I want it obvious that it was "Built by Stoo Goff, nlx3647, and SkyJedi", not me
- Maybe fiddle with some of the colours and icons to make them less SW and more Genesys
- Make implement work better somehow?
- Some tweaked and keyworded (maybe ranked) abilities: lesser amphibious, regeneration
- CC Dreadgazer to use opposed checks?
- Spellchecks, capitilisation, and grammar
- Young Ristie WT
- Ruinous Repartee uses Presence x 2. How to implement that, similar to the ranks multiplier replacement?
- Change Spined Thresher Too Many Mouths to Improved Multiattack? Though RAW it still needs to increase the difficulty

## Notes
- DnD creature types: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Swarm, Undead

