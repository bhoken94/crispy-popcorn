import Header from "@/components/ui/header";
import { Stack } from "@chakra-ui/react";
import MovieSearch from "@/features/home/components/movieSearch";
import MovieList from "@/features/home/components/movieList";
const HomeRoute = () => {
  return (
    <>
      <Header />
      <Stack direction="column" align="center" justify="center" margin="auto" px={4} py={8}>
        <MovieSearch />
        <MovieList title="Trending Movies" />
        <MovieList title="Top Rated" />
        <MovieList title="Upcoming" />
      </Stack>
      {/* <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to MovieMaster</h1>
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input type="text" placeholder="Search for movies..." className="flex-grow" />
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>
        <MovieList title="Trending Movies" />
        <MovieList title="Top Rated" />
        <MovieList title="Upcoming" />
      </div> */}
    </>
  );
};

export default HomeRoute;
