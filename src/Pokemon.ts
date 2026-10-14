export class Pokemon {

    private constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly types: string[],
        public readonly stats: any,
    ) {
    }

    static newFromJson(json: any): Pokemon {
        return new Pokemon(json.id, json.name, json.types, json.stats);
    }
}