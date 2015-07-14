pokeprint
=========


##### PrettyPrint, but for Pokémon! 



___


Welcome to `pokeprint`, the Pokédex inside your terminal. This simple command makes use of the [PokéApi](http://pokeapi.co/) to bring you all the information you might need about the Pokémon universe. 

## Setup

Simply clone this repo, and run `npm install`. If you would like to run `pokeprint` outside of the project folder, just add it to your path:

```
export PATH=$PATH:path/to/pokeprint
```

## Usage

`pokeprint` currently supports 3 options

- `pokeprint [-s, --stats] <pokemon>` returns the requested pokemon with their stats visualized [WORKING]
- `pokeprint [-a, --abilities] <pokemon>` returns the requested pokemon with their potential abilities and their effects [IN PROGRESS]
- `pokeprint [-b, --breeding] <pokemon>` returns the requested pokemon along with any information necessary for breeding them [IN PROGRESS]

These options can be used in conjunction with eachother, or not at all, in which case a default set of options will be loaded.