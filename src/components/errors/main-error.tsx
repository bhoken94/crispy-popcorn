import { Button, Flex, Heading } from "@chakra-ui/react";

export const MainErrorFallback = () => {
  return (
    <Flex flexDirection="column" height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
      <Heading color={"red.500"} size="lg" fontSize="2xl">
        Ooops, something went wrong :({" "}
      </Heading>
      <Button mt={4} onClick={() => window.location.assign(window.location.origin)}>
        Aggiorna
      </Button>
    </Flex>
  );
};
