import { Button, Container, Flex, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
const MovieSearch = () => {
  return (
    <Container maxW="xl">
      <Flex gap={2}>
        <Input type="text" placeholder="Ricerca per film o serie tv..." className="flex-grow" />
        <Button>
          <Search className="mr-2 h-4 w-4" /> Cerca
        </Button>
      </Flex>
    </Container>
  );
};

export default MovieSearch;
