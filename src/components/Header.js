import { Box, Flex, Button, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

const Header = () => {
  const bgColor = useColorModeValue("blue.500", "blue.800");
  const textColor = useColorModeValue("white", "gray.200");
  const hoverBgColor = useColorModeValue("blue.600", "blue.900");
  const hoverBorderColor = useColorModeValue("white", "gray.200");

  return (
    <Box
      as="header"
      bg={bgColor}
      py="4"
      px="8"
      boxShadow="md"
      className="header"
      fontFamily="Roboto"
    >
      <Flex justify="space-between" alignItems="center">
        <NextLink href="/" passHref>
          <Box color={textColor} fontWeight="bold" fontSize="2xl">
            Inicio
          </Box>
        </NextLink>
        <NextLink href="/capturedPokemons" passHref>
          <Button
            
            colorScheme="teal"
            variant="outline"
            color="white"
            borderColor="white"
            _hover={{
              bgColor: hoverBgColor,
              borderColor: hoverBorderColor,
            }}
          >
            Mis Pokemon
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Header;
