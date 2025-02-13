import Header from "@/components/ui/header";
import MovieList from "@/features/home/components/movieList";
import MovieSearch from "@/features/home/components/movieSearch";
import { Heading, Stack } from "@chakra-ui/react";
import { supabase } from "@/lib/supabase-client";
import { useEffect } from "react";

const HomeRoute = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      const { data: movies, error } = await supabase.from("movies").select();
      if (error) {
        console.error(error);
      }
      console.table(movies);
    };
  }, []);

  return (
    <>
      <Header />
      <Stack direction="column" align="center" justify="center" margin="auto" px={4} py={8}>
        <Heading size="4xl" fontSize="4xl">
          Benvenuto in Crispy Popcorn
        </Heading>
        <MovieSearch />
        <MovieList title="Trending Movies" />
        <MovieList title="Top Rated" />
        <MovieList title="Upcoming" />
      </Stack>
    </>
  );
};

export default HomeRoute;
