import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  Checkbox,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { apiUrl } from "@/utils/constants";


export default function PokemonData({
  pokemon,
  catchedPokemons,
  onCatchedChange,
}) {
  const [catched, setCatched] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  //const localh = 'http://localhost:4000/api/catched'


  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setCatched(catchedPokemons.some((p) => p.id === pokemon.id));
  }, [catchedPokemons, pokemon]);

  const handleCheckboxChange = async () => {
    try {
      setCatched(!catched);

      if (!catched) {
        //await axios.post(`/api/catched`, {
        await axios.post(apiUrl, {
          id: pokemon.id,
          name: pokemon.name,
        });
      } else {
        //await axios.delete(`/api/catched/${pokemon.id}`);
        await axios.delete(`${apiUrl}/${pokemon.id}`);
      }

      onCatchedChange();
    } catch (error) {
      console.error(
        "Error al actualizar el estado de captura del pokémon",
        error
      );
    }
  };

  const getBaseStat = (statsArray, atributo) => {
    const hpStatObject = statsArray.find((stat) => stat.stat.name === atributo);
    return hpStatObject ? hpStatObject.base_stat : null;
  }

  return (
    <Stack spacing={{ base: 2, md: 10 }} pb={{ base: 2 }} fontFamily="Roboto">
      <Stack spacing={{ base: 2, md: 0 }} position="relative">
        <Box
          position="absolute"
          right="0"
          zIndex="99"
          top={{ base: "10px", md: "unset" }}
        >
          <Checkbox
            isChecked={catched}
            onChange={handleCheckboxChange}
            colorScheme="blue.700"
            color="blue.700"
            fontWeight="bold"
            size="lg"
          >
            Capturado
          </Checkbox>{" "}
        </Box>
          <AspectRatio w="70%" ratio={1} mx="auto">
          <>
        {!imageLoaded && <Spinner size="lg" color="blue.500" />}
            <Image
              alt="Imagen Pokemon"
              objectFit="cover"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
              onLoad={handleImageLoad}
              display={imageLoaded ? 'block' : 'none'}
            />
            </>
          </AspectRatio>
        <Stack
          mt={{base: "2", md: "5"}}
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 1, md: 10 }}
          textAlign="center"
        >
          <Flex
            direction={{ base: "row", md: "column" }}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize={{ base: "2xl", sm: "2xl", md: "xl", lg: "xl" }}
              marginRight={{ base: "1em", md: "0" }}
              fontWeight="bold"
              color="gray.600"
            >
              Peso
            </Text>
            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "xl", lg: "xl" }}
              fontWeight="normal"
              color="blue.700"
            >
              {pokemon.weight}
            </Text>
          </Flex>
          <Flex
            direction={{ base: "row", md: "column" }}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize={{ base: "2xl", sm: "2xl", md: "xl", lg: "xl" }}
              marginRight={{ base: "1em", md: "0" }}
              fontWeight="bold"
              color="gray.600"
            >
              Altura
            </Text>
            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "xl", lg: "xl" }}
              fontWeight="normal"
              color="blue.700"
            >
              {pokemon.height}
            </Text>
          </Flex>
          <Flex
            direction={{ base: "row", md: "column" }}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize={{ base: "2xl", sm: "2xl", md: "xl", lg: "xl" }}
              marginRight={{ base: "1em", md: "0" }}
              fontWeight="bold"
              color="gray.600"
            >
              Movimientos
            </Text>
            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "xl", lg: "xl" }}
              fontWeight="normal"
              color="blue.700"
            >
              {pokemon.moves.length}
            </Text>
          </Flex>
          <Flex
            direction={{ sm: "row", md: "column" }}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize={{ base: "2xl", sm: "2xl", md: "xl", lg: "xl" }}
              marginRight={{ base: "1em", md: "0" }}
              fontWeight="bold"
              color="gray.600"
            >
              Tipos
            </Text>{" "}
            <Flex
              direction={{ base: "row", md: "column" }}
              alignItems="center"
              justifyContent="center"
            >
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  rounded="md"
                  colorScheme="teal"
                  fontSize={{ base: "md", md: "xs" }}
                  px={{ base: 2, md: 1 }}
                  py={{ base: 1, md: 1 }}
                  mx={{ base: 2, md: 0.7 }}
                  my={{ base: 2, md: 1 }}
                >
                  {type.type.name}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Stack>
      </Stack>

      <Stack
        spacing={5}
        p={5}
        bg="gray.200"
        borderRadius="xl"
        width={{ base: "full", md: "auto" }}
      >
        {" "}
        <Stack>
          <Text color="gray.600" fontSize={{ base: "md", md: "sm" }}>
            HP
          </Text>{" "}
          <Progress
            bg="gray.300"
            borderRadius="full"
            value={getBaseStat(pokemon.stats, "hp")}
          />
        </Stack>
        <Stack>
          <Text color="gray.600" fontSize={{ base: "md", md: "sm" }}>
            Ataque
          </Text>{" "}
          <Progress
            bg="gray.300"
            borderRadius="full"
            value={getBaseStat(pokemon.stats, "attack")}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
