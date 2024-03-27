import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Flex,
  Stack,
  Heading,
  Box,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import Header from "@/components/Header";
import PokemonCard from "@/components/PokemonCard";
import ModalPokemonDetails from "@/components/ModalPokemonDetails";
//import { updateCatchedPokemons } from "@/utils/updateCatchedPokemons";

export default function CapturedPokemons() {
  const [catchedPokemons, setCatchedPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const pokemonDataModal = useDisclosure();

  useEffect(() => {
    setIsLoading(true);
    try {
      axios
        .get("/api/catched")
        .then((response) => {
          const data = response.data;
          setCatchedPokemons(data);
        })
        .catch((error) => {
          console.error("Error al obtener los pokemones capturados", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error al obtener los pokemones capturados", error);
      setIsLoading(false);
    }
  }, []);

  const handleViewPokemon = (pokemon)=> {
    const { id } = pokemon;
    const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(pokemonApiUrl)
      .then((response) => {
        const selectedPokemonData = response.data;
        setSelectedPokemon(selectedPokemonData);
        pokemonDataModal.onOpen();
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del Pokémon:", error);
      });
  }

  const handleDelete = (pokemon)=> {
    const { id } = pokemon;
    const pokemonApiUrl = `/api/catched/${id}`;

    axios
      .delete(pokemonApiUrl)
      .then(() => {
        setCatchedPokemons((prevCatchedPokemons) =>
          prevCatchedPokemons.filter((p) => p.id !== id)
        );
      })
      .catch((error) => {
        console.error(
          "Error al actualizar el estado de captura del pokémon",
          error
        );
      });
  }

  const updateCatchedPokemons = async () => {
    try {
      const response = await axios.get("/api/catched");
      const data = response.data;
      setCatchedPokemons(data);
    } catch (error) {
      console.error("Error al obtener los pokemones capturados", error);
    }
  };

  useEffect(() => {
    updateCatchedPokemons();
  }, []);


  return (
    <>
      <Header minH="10vh" />
      <Flex
        alignItems="center"
        justifyContent="center"
        bg="gray.200"
        minH="100vh"
        fontFamily="Roboto"
      >
        <Container maxW="container.lg" py="10" textAlign="center">
          <Heading as="h1" mb="5" mt="2em">
            Pokemon Capturados
          </Heading>
          {isLoading ? (
            <Spinner size="xl" color="blue.800" />
          ) : (
            <Flex alignItems="center" justifyContent="center">
              <Container
                maxW="container.lg"
                alignItems="center"
                justifyContent="center"
              >
                <Stack
                  p={{ base: 5, md: 10 }}
                  alignItems="center"
                  spacing="5"
                  justifyContent="center"
                  textAlign="center"
                  w="full"
                >
                  {" "}
                  <Flex
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ base: 5, md: 10 }}
                    w="full"
                  >
                    {catchedPokemons.map((pokemon) => (
                      <Box
                        key={pokemon.id}
                        flexBasis={{
                          base: "100%",
                          sm: "50%",
                          md: "33.33%",
                          lg: "25%",
                          xl: "20%",
                        }}
                        flexGrow={0}
                        flexShrink={0}
                        mx={5}
                        mt={8}
                      >
                        <PokemonCard
                          pokemon={pokemon}
                          onButtonClick={() => handleViewPokemon(pokemon)}
                          onDeleteClick={() => handleDelete(pokemon)}
                        />
                      </Box>
                    ))}
                  </Flex>
                </Stack>
              </Container>
            </Flex>
          )}
        </Container>
      </Flex>
      <ModalPokemonDetails
        pokemonDataModal={pokemonDataModal}
        selectedPokemon={selectedPokemon}
        pokemon={selectedPokemon}
        catchedPokemons={catchedPokemons}
        setCatchedPokemons={setCatchedPokemons}
        updateCatchedPokemons={updateCatchedPokemons}
      />
    </>
  );
}
