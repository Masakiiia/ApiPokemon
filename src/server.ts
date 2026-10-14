import {Pokemon} from "./Pokemon";
import {createServer} from "node:http"

const hostname = '127.0.0.1';
const port = 3000;
var lastPokemonIdEncounter = 0

async function getPokemonFromPokeApi(randomPokemonId: number): Promise<Response> {
    return await fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemonId);
}

function getRandomPokemonId(): number {
    return Math.floor(Math.random() * 1025) + 1;
}

async function getWildResponse(): Promise<Pokemon> {
    const randomPokemonId = getRandomPokemonId();
    const pokeApiResponse = await getPokemonFromPokeApi(randomPokemonId);
    const data = await pokeApiResponse.json();
    return Pokemon.newFromJson(data);
}

export const server = createServer(async (req, res) => {

    if (req.method === 'GET' && req.url === '/wild') {
        const wildResponse = await getWildResponse();
        lastPokemonIdEncounter = wildResponse.id
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(wildResponse));
    }

    if (req.method === 'POST' && req.url === '/wild/capture') {
        const captureRate = Math.floor(Math.random() * 100) + 1;
        const pokemon = await getPokemonFromPokeApi(lastPokemonIdEncounter);
        const data = await pokemon.json();
        if (captureRate % 2 === 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            lastPokemonIdEncounter = 0;
            return res.end("Capture de " + data.name + " réussie !!!");
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            return res.end("Dommage... La capture de " + data.name + " n'a pas abouti....;");
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



