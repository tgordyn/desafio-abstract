import Cors from 'cors';
import initMiddleware from '../../../lib/init.middleware';
import axios from 'axios';
import { apiUrl } from "@/utils/constants";

// Initialize the CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'DELETE'],
  })
);


//const localh = 'http://localhost:4000/api/catched'

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "GET") {
    try {
      const response = await axios.get(apiUrl);
      console.log('aca', response.data)
      return res.status(200).json(response.data);

    } catch (error) {
      return res.status(error.response?.status || 500).send(error.message);
    }
  } else if (req.method === "POST") {
    try {
      const newPokemon = {
        id: req.body.id,
        name: req.body.name,
      };

      const response = await axios.post(apiUrl, newPokemon);
      return res.status(200).json(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        return res.status(409).send("Pokemon ya existente");
      }
      return res.status(error.response?.status || 500).send(error.message);
    }
  } else if (req.method === "DELETE") {
    try {
      const { pokemonId } = req.query;

      const response = await axios.delete(`${apiUrl}/${pokemonId}`);
      return res.status(200).send('Pokemon eliminado');
    } catch (error) {
      return res.status(error.response?.status || 500).send(error.message);
    }
  } else {
    return res.status(405).send("Method not allowed.");
  }
}
