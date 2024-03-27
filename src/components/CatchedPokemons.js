import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalCloseButton,
  Container,
  Stack,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import PokemonCard from "@/components/PokemonCard";

export default function CatchedPokemonsModal({
  isOpen,
  onClose,
  catchedPokemons,
}) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} overflowY="auto" maxHeight="60vh">
    <ModalOverlay />
    <ModalContent maxW="80vw">
      <ModalHeader>Pokemon Capturados</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Container maxW="container.lg" py="10">
          <Heading as="h1" mb="5">
            Pokemones Capturados
          </Heading>
          <Box > 
            <Stack p="5" alignItems="center" spacing="5">
              <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
                {catchedPokemons.map((pokemon) => (
                  <Box
                    as="button"
                    key={pokemon.id}
                    onClick={() => handleViewPokemon(pokemon)}
                  >
                    <PokemonCard pokemon={pokemon} />
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        </Container>
      </ModalBody>
    </ModalContent>
  </Modal>
  );
}
