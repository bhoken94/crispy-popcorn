import { useDiscover } from "@/features/home/api/discover";
import { useTrendingAll } from "@/features/home/api/trending-all";
import MovieList from "@/features/home/components/movieList";
import MovieSearch from "@/features/home/components/movieSearch";
import { MediaItem } from "@/types/api";
import { Flex, Heading, Spinner } from "@chakra-ui/react";

const HomeRoute = () => {
  const trendingAllQuery = useTrendingAll({
    timeWindow: "day",
  });

  const discoverQuery = useDiscover({
    type: "tv",
  });

  const upcomingMoviesQuery = useDiscover({
    type: "movie",
    primaryReleaseDateGte: new Date().toISOString(),
  });

  const isLoading = trendingAllQuery.isLoading || discoverQuery.isLoading || upcomingMoviesQuery.isLoading;

  if (isLoading) {
    return (
      <Flex height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
        <Spinner color={"blue.500"} size={"xl"} />
      </Flex>
    );
  }

  const discoverQueryResults = discoverQuery.data?.results.map((item: MediaItem) => {
    return {
      ...item,
      media_type: item.media_type ?? "tv",
    };
  });

  const upcomingMoviesQueryResults = upcomingMoviesQuery.data?.results.map((item: MediaItem) => {
    return {
      ...item,
      media_type: item.media_type ?? "movie",
    };
  });

  return (
    <>
      <Heading size="4xl" fontSize="4xl">
        Benvenuto in Crispy Popcorn
      </Heading>
      <MovieSearch />
      <MovieList title="In tendenza" movies={trendingAllQuery.data?.results ?? []} />
      <MovieList title="Serie TV Popolari" movies={discoverQueryResults ?? []} />
      <MovieList title="Film In uscita" movies={upcomingMoviesQueryResults ?? []} />
    </>
  );
};

export default HomeRoute;
