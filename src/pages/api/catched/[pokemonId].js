import { JsonDB, Config } from "node-json-db";

const db = new JsonDB(new Config("db", true, false, "/"));

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = req.query;
    const { pokemonId } = query;
    var data = await db.getData("/");

    return res
      .status(200)
      .json(data.some((pokemon) => pokemon.id === Number(pokemonId)));
  } else if (req.method === "DELETE") {
    try {
      const query = req.query;
      const { pokemonId } = query;

      await db.delete(
        "/catchedPokemon[" +
          (await db.getIndex("/catchedPokemon", Number(pokemonId))) +
          "]"
      );

      return res.status(200);
    } catch {
      return res.status(409).send("Pokemon no encnontrado");
    }
  }
  return res.status(405).send("Method not allowed.");
}
