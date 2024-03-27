import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalCloseButton,
  } from "@chakra-ui/react";
  import PokemonData from './PokemonData';

const ModalPokemonDetails = ({pokemonDataModal, selectedPokemon, catchedPokemons, setCatchedPokemons, updateCatchedPokemons}) => {
  return (
    <Modal {...pokemonDataModal}>
    <ModalOverlay />
    <ModalContent bg="blue.200" 
    border="1px solid"
    borderColor="blue.200"
    >
      <ModalHeader
        textAlign="center"
        textTransform="capitalize"
        fontSize="3xl"
      >
        {selectedPokemon?.name}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {selectedPokemon && (
          <PokemonData
            pokemon={selectedPokemon}
            catchedPokemons={catchedPokemons}
            setCatchedPokemons={setCatchedPokemons}
            onCatchedChange={updateCatchedPokemons}
          />
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default ModalPokemonDetails