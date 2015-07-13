#! /usr/bin/env node

var poke = require('./pokelist');
var program = require('commander');
var request = require('request');

var defaultOptions = {'name': true, 'stats': true, 'abilities': true};

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


var pokePrint = function (body, options) {

	var pkmn = JSON.parse(body);
	options = options || defaultOptions;

	options.name && console.log(pkmn.name);

	// etc...

}


var getPokemon = function (dexNumber, options) {

	var url = 'http://pokeapi.co/api/v1/pokemon/' + dexNumber;
	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			pokePrint(body);
		} else {
			console.error("error occurred: ", error);
		}
	});

}


// Basic Bulbasaur test

getPokemon(poke.dex.indexOf('Bulbasaur') + 1);
