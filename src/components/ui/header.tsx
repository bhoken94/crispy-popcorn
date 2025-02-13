import { Link } from "react-router";
import { ColorModeButton } from "./color-mode";
import { Avatar } from "./avatar";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" p={4} boxShadow="md">
      <Flex align="center">
        <Link to="/">
          <Heading size="sm">Crispy Popcorn</Heading>
        </Link>
        <Spacer />

        <Button asChild variant="ghost" mr={2}>
          <Link to="/movies">Film</Link>
        </Button>

        <Button asChild variant="ghost" mr={2}>
          <Link to="/tv-series">Serie TV</Link>
        </Button>
        <Spacer />
        <ColorModeButton mr={2} />
        <Avatar src="https://bit.ly/tioluwani-kola" />
      </Flex>
    </Box>
  );
};

export default Header;
