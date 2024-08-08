// import { JsonDB, Config } from "node-json-db";

// export default async function handler(req, res) {
//   const db = new JsonDB(new Config("db", true, false, "/"));

//   if (req.method === "GET") {
//     const query = req.query;
//     const { pokemonId } = query;

//     var data = await db.getData("/");

//     return res
//       .status(200)
//       .json(data.catchedPokemon.some((pokemon) => pokemon.id === Number(pokemonId)));
//   } else if (req.method === "DELETE") {
//     try {
//       const query = req.query;
//       const { pokemonId } = query;

//       await db.delete(
//         "/catchedPokemon[" +
//           (await db.getIndex("/catchedPokemon", Number(pokemonId))) +
//           "]"
//       );
//       return res.status(200).send("Pokemon liberado");
//     } catch {
//       return res.status(409).send("Pokemon no encontrado");
//     }
//   }
//   return res.status(405).send("Method not allowed.");
// }


import axios from 'axios';
import { apiUrl } from "@/utils/constants";


export default async function handler(req, res) {
  //const localh = 'http://localhost:4000/api/catched'
  const { pokemonId } = req.query;

  if (req.method === "GET") {
    try {
      const response = await axios.get(apiUrl);

      const pokemonExists = response.data.some((pokemon) => pokemon.id === Number(pokemonId));

      return res.status(200).json(pokemonExists);
    } catch (error) {
      return res.status(error.response?.status || 500).send(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      await axios.delete(`${apiUrl}/${pokemonId}`);
      return res.status(200).send("Pokemon liberado");
    } catch (error) {
      if (error.response?.status === 404) {
        return res.status(409).send("Pokemon no encontrado");
      }
      return res.status(error.response?.status || 500).send(error.message);
    }
  }

  return res.status(405).send("Method not allowed.");
}
