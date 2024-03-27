import React, { useState } from "react";
import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { InfoOutlineIcon, DeleteIcon } from "@chakra-ui/icons";

export default function PokemonCard({
  pokemon,
  type,
  onButtonClick,
  onDeleteClick,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      borderRadius="xl"
      alignItems="center"
      maxW={{ base: "100%", sm: "350px", md: "450px", lg: "450px" }}
      maxH={{ base: "100%", sm: "450px", md: "500px", lg: "550px" }}
      bg="blue.100"
      border="1px solid"
      borderColor="blue.200"
    >
      <AspectRatio w="full" ratio={1}>
        <>
        {!imageLoaded && <Spinner size="lg" color="blue.500" />}
        <Image
          alt="Imagen Pokemon"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          onLoad={handleImageLoad}
          display={imageLoaded ? 'block' : 'none'}
        />
        </>
      </AspectRatio>
      <Text
        textAlign="center"
        textTransform="capitalize"
        fontSize={{ base: "3xl", sm: "2xl", md: "xl", lg: "xl" }}
        fontFamily="Roboto"
      >
        {" "}
        {pokemon.name}
      </Text>

      {type ? (
        <HStack spacing={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {" "}
          {pokemon.types.map((type) => (
            <Badge
              key={type.slot}
              rounded="md"
              colorScheme="teal"
              fontSize={{ base: "lg", md: "md", lg: "xs" }}
              px={{ base: 2, md: 1 }}
              py={{ base: 1, md: 1.5 }}
              mx={{ base: 2, md: 0.7 }}
              my={{ base: 2, md: 1 }}
            >
              {type.type.name}
            </Badge>
          ))}
        </HStack>
      ) : (
        <Flex justifyContent="space-between" w="100%">
          <Box as="button" key={pokemon.id} onClick={onButtonClick}>
            <InfoOutlineIcon
              color="blue.500"
              boxSize={{ base: 12, sm: 10, md: 8, lg: 6 }}
            />{" "}
          </Box>
          <Box as="button" key={pokemon.name} onClick={onDeleteClick}>
            <DeleteIcon
              color="red.500"
              boxSize={{ base: 12, sm: 10, md: 8, lg: 6 }}
            />{" "}
          </Box>
        </Flex>
      )}
    </Stack>
  );
}
