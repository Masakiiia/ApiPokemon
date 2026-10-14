import {describe, expect, it} from "vitest";
import {getPokemonFromPokeApi, getRandomPokemonId} from "./server";
import {Pokemon} from "./Pokemon";

vi.mock('./server', () => ({
    getRandomPokemonId: vi.fn().mockReturnValue(25),
}))
describe("getWildResponse", () => {
    it("return random pokemon", async () => {
        // Arrange

        const randomPokemonId = getRandomPokemonId();
        expect(randomPokemonId).toBe(25);
        const pokeApiResponse = await getPokemonFromPokeApi(randomPokemonId);
        const data = await pokeApiResponse.json();
        const poke = Pokemon.newFromJson(data);
        //Act

        // Assert
        expect(poke.id).toBe(randomPokemonId);
    })
})