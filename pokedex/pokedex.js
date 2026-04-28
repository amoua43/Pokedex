
//const pokemonCount = 156;
var pokedex = {}; // {1 : {"name" : "bulbasaur", "img" : url, "type" : ["grass", "poison"], "desc" : "..."}}

// window.onload = async function() {
//     //getPokemon(494);
//     const start = 494;
//     const count = 156;

//     for (let i = start; i < start + count; i++) {
//         await getPokemon(i);
//         let pokemon = document.createElement("div");
//         pokemon.id = i;
//         pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
//         pokemon.classList.add("pokemon-name");
//         pokemon.addEventListener("click", updatePokemon);
//         this.document.getElementById("pokemon-list").append(pokemon);
//     }

//     document.getElementById("pokemon-desc")

//     console.log(pokedex);
// }
const promises = [];
window.addEventListener("load", async function() {
    //getPokemon(494);
    const start = 494;
    const count = 156;
    for (let i = start; i < start + count; i++) {
        try {
        promises.push(getPokemon(i));
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        } catch (error) {
            console.error(`Error fetching data for pokemon ${i}:`, error);
            // Handle the error here, e.g. log it, display an error message, etc.
        }
    }

    await Promise.all(promises);

    console.log(pokedex);
})


async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    //console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    //console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][1]["flavor_text"];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};
}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    //clear the previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}