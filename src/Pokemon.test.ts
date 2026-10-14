import {describe, expect, it} from "vitest";
import {Pokemon} from "./Pokemon";

describe("newFromJson ", () => {
    it("Should Return Pokemon Given Json Data", () => {
        // Arrange
        const dataPokemon = {
            id: 1,
            name: "bulbizarre",
            types: ["grass"],
            stats: {
                hp: 10
            },
        }

        //Act
        const Poke = Pokemon.newFromJson(dataPokemon);

        // Assert
        expect(Poke.id).toBeTypeOf("number");
        expect(Poke.name).toBeTypeOf("string");
    })
})