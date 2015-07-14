#! /usr/bin/env node

var _ = require('underscore');
var colors = require('colors');
var program = require('commander');
var request = require('request');
var poke = require('./pokelist');

var defaultOptions = {'stats': true, 'abilities': true};




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


var pokeStats = function (body) {

	var stats = ['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed'];
	var pkmn = JSON.parse(body);


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

var pokeAbilities = function (body) {

	// ability printing

};

var pokeBreeding = function (body) {

	// breeding info printing

};

var pokePrint = function (body, options) {

	var pkmn = JSON.parse(body);
	options = options || defaultOptions;

	console.log(pkmn.name);
	options.stats && pokeStats(body);
	options.abilities && pokeAbilities(body);
	options.breeding && pokeBreeding(body);

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
	.option("-s, --stats", "Display stats of specified pokemon")
	.option("-a, --abilities", "Display abilities of specified pokemon")
	.option("-b, --breeding", "Display information about specified pokemon relevant to breeding")
	.parse(process.argv);

if (program.stats) options = _.extend(options, {'stats': true});
if (program.abilities) options = _.extend(options, {'abilities': true});
if (program.breeding) options = _.extend(options, {'breeding': true});


getPokemon(poke.dex.indexOf(program.args[0]) + 1, options);

