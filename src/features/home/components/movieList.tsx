import Card from "@/components/ui/card";
import { Container, Grid, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router";

const MovieList = ({ title }: { title: string }) => {
  // This would be replaced with actual data fetching logic
  const movies = [
    { id: 1, title: "Movie 1", poster: "/placeholder.svg" },
    { id: 2, title: "Movie 2", poster: "/placeholder.svg" },
    { id: 3, title: "Movie 3", poster: "/placeholder.svg" },
    { id: 4, title: "Movie 4", poster: "/placeholder.svg" },
  ];

  return (
    <Container pb={4}>
      <Heading size="md" fontSize="2xl" fontWeight="bold" mb={4}>
        {title}
      </Heading>

      <Grid templateColumns="repeat(2, auto)" gap={4} md={{ gridTemplateColumns: "repeat(4, auto)" }}>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <Card title={movie.title} variant="elevated">
              <Image
                src={movie.poster}
                alt={movie.title}
                width={300}
                height={450}
                aspectRatio={2 / 3}
                objectFit="cover"
              />
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
