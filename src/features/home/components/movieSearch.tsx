import { Button, Container, Flex, Heading, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
const MovieSearch = () => {
  return (
    <>
      <Heading size="lg" fontSize="2xl">
        Benvenuto in Crispy Popcorn
      </Heading>
      <Container maxW="xl">
        <Flex gap={2}>
          <Input type="text" placeholder="Ricerca per film o serie tv..." className="flex-grow" />
          <Button>
            <Search className="mr-2 h-4 w-4" /> Cerca
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default MovieSearch;
