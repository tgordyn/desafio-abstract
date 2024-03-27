import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/roboto"; 

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
