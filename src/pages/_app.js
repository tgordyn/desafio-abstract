import "@/styles/globals.css";
import {
  ChakraProvider,
  Box,
  GridItem,
  Image,
  Text,
  Grid,
  Badge,
} from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const pokemonData = {
    name: "Pikachu",
    number: "#025",
    type: "Electric",
    image: "pikachu_image_url.jpg",
  };

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
