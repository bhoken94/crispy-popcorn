import Header from "@/components/ui/header";
import { useTrendingAll } from "@/features/home/api/trending-all";
import MovieList from "@/features/home/components/movieList";
import MovieSearch from "@/features/home/components/movieSearch";
import { Flex, Heading, Spinner, Stack } from "@chakra-ui/react";

const HomeRoute = () => {
  const trendingAllQuery = useTrendingAll({
    timeWindow: "day",
  });

  if (trendingAllQuery.isLoading) {
    return (
      <Flex height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
        <Spinner color={"blue.500"} size={"xl"} />
      </Flex>
    );
  }

  return (
    <>
      <Header />
      <Stack direction="column" align="center" justify="center" margin="auto" px={4} py={8}>
        <Heading size="4xl" fontSize="4xl">
          Benvenuto in Crispy Popcorn
        </Heading>
        <MovieSearch />
        <MovieList title="In tendenza" movies={trendingAllQuery.data?.results ?? []} />
        {/* <MovieList title="I più votati" />
        <MovieList title="In uscita" /> */}
      </Stack>
    </>
  );
};

export default HomeRoute;
