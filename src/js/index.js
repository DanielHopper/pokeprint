#! /usr/bin/env node

var _ = require('underscore');
var colors = require('colors');
var program = require('commander');
var request = require('request');
var poke = require('./pokelist');

var defaultOptions = {'stats': true, 'abilities': true, 'type': true};




// ASCII taken from http://www.asciiartfarts.com/pokemon.html

console.log(
'                                   .::.                       \n',
'                              .;:**"            AMC           \n',
'                              `                  0            \n',
'  .:XHHHHk.              db.   .;;.     dH  MX   0            \n',
'oMMMMMMMMMMM       ~MM  dMMP :MMMMMR   MMM  MR      ~MRMN     \n',
'QMMMMMb  "MMX       MMMMMMP !MX" :M~   MMM MMM  .oo. XMMM "MMM\n',
'  `MMMM.  )M> :X!Hk. MMMM   XMM.o"  .  MMMMMMM X?XMMM MMM>!MMP\n',
'   "MMMb.dM! XM M"?M MMMMMX.`MMMMMMMM~ MM MMM XM `" MX MMXXMM \n',
'    ~MMMMM~ XMM. .XM XM`"MMMb.~*?**~ .MMX M t MMbooMM XMMMMMP \n',
'     ?MMM>  YMMMMMM! MM   `?MMRb.    `"""   !L"MMMMM XM IMMM  \n',
'      MMMX   "MMMM"  MM       ~%:           !Mh.""" dMI IMMP  \n',
'      "MMM.                                             IMX   \n',
'       ~M!M                                             IMP   \n',
'               Gotta try {...} catch () {...} em all!         \n');


var pokeStats = function (pkmn) {

	var stats = ['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed'];

	// include stat calculation for specific levels


	for (var i in stats) {
		if (pkmn.hasOwnProperty(stats[i])) {
			var stat = Math.floor(pkmn[stats[i]]/2);
				full = '',
				left = '';
			for (var x = 0; x <= 100; x++){
				if (stat) {
					full+='_';
					stat--;
				} else {
					left+='|'
				}
			}
			console.log(stats[i] + ": " + pkmn[stats[i]]);
			console.log(full.bgRed + left.bgWhite);
		}
	}
};

var pokeAbilities = function (pkmn) {

	// ability printing

};

var pokeType = function (pkmn) {

	console.log("Type 1: " + pkmn.types[0].name.toUpperCase().white.bgGreen +
				" Type 2: " + pkmn.types[1].name.toUpperCase().white.bgBlue );

};

var pokePrint = function (body, options) {

	var pkmn = JSON.parse(body);
	options = options || defaultOptions;

	console.log(pkmn.name);
	options.type && pokeType(pkmn);
	options.abilities && pokeAbilities(pkmn);
	options.stats && pokeStats(pkmn, options); //will handle levels, IVs, EVs

	// etc...

};


var getPokemon = function (dexNumber, options) {

	var url = 'http://pokeapi.co/api/v1/pokemon/' + dexNumber;
	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			pokePrint(body);
		} else {
			console.error("error occurred: ", error);
		}
	});

};

var options = {};

program
	.version('1.0.0')
	.usage("[options] <pokemon>")
	.option("-s --stats", "Display stats of specified pokemon")
	.option("-a --abilities", "Display the abilities of the specified")
	.option("-L --level <number>", "Base stats off a pokemon at this level (default is 100)", /^[1-100]$/i, "100")
	.option("-t --type", "Display the specified pokemon's type, along with it's effectiveness on other types")
	.option("-I --IV", "Gives interactive mode for IV selecting (default no IVs)")
	.option("-E --EV", "Gives interactive mode for IV selecting (default perfect EVs")
	.parse(process.argv);

if (program.stats) options = _.extend(options, {'stats': true});
if (program.abilities) options = _.extend(options, {'abilities': true});
if (program.level) options = _.extend(options, {'withLevel': true, 'level': program.level});
if (program.type) options = _.extend(options, {'type': true});
if (program.IV) options = _.extend(options, {'IVMode': true});
if (program.EV) options = _.extend(options, {'EVMode': true});


getPokemon(poke.dex.indexOf(program.args[0]) + 1, options);

