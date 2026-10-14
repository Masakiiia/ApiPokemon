import express, {NextFunction} from 'express';
import {Pokemon} from './Pokemon';
import {AppError} from "./AppError";
import {errorHandler} from "./errorHandler";

const app = express();
app.use(express.json());

let lastPokemonIdEncounter = 0;

async function getPokemonFromPokeApi(id: number): Promise<Response> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    if (!response.ok) {
        throw new AppError(response.status, `Erreur PokeAPI: ${response.statusText}`);
    }
    return response;
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

app.get('/', (req, res) => {
    try {
        res.json({message: 'Hello'});
    } catch (err) {
        throw new AppError(100, 'BROKEN');
    }

});

app.get('/wild', async (req, res, next: NextFunction) => {
    try {
        const wildResponse = await getWildResponse();
        lastPokemonIdEncounter = wildResponse.id;
        res.json(wildResponse);
    } catch (err) {
        next(err);
    }
});

app.post('/wild/capture', async (req, res, next: NextFunction) => {
    try {
        const captureRate = Math.floor(Math.random() * 100) + 1;
        const pokemon = await getPokemonFromPokeApi(lastPokemonIdEncounter);
        const data = await pokemon.json();
        if (lastPokemonIdEncounter === 0) {
            throw new AppError(400, 'Aucun Pokemon rencontré. Appelez d\'abord GET /wild');
        }
        if (captureRate % 2 === 0) {
            lastPokemonIdEncounter = 0;
            res.send("Capture de " + data.name + " réussie !!!");
        } else {
            res.send("Dommage... La capture de " + data.name + " n'a pas abouti....;");
        }
    } catch (err) {
        next(err);
    }

});

app.use(errorHandler);

export default app;