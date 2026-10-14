import {describe, expect, it, vi} from "vitest";
import request from "supertest";
import app from './app';

global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve({
        id: 1,
        name: "bulbizarre",
        types: [{name: "grass"}],
        stats: [{base_stat: 45}],
    }),
});

describe("GET /wild", () => {
    it("returns a Pokemon", async () => {
        const res = await request(app)
            .get("/wild")
            .expect(200);

        expect(res.body.id).toBe(1);
        expect(res.body.name).toBe("bulbizarre");
    });
});