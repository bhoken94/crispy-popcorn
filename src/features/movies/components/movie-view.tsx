import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb";
import {
  AbsoluteCenter,
  Box,
  Button,
  Em,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  ProgressCircle,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Clock, Heart, Star } from "lucide-react";
import { useDetail } from "../api/detail";
import { formatDate } from "@/utils/format";
import dayjs from "dayjs";

const MovieView = ({ movieId, type }: { movieId: string; type: "movie" | "tv" }) => {
  const useDetailQuery = useDetail({ mediaId: movieId, type: type });

  if (useDetailQuery.isLoading) {
    return (
      <Flex height={"100vh"} width={"100vw"} justifyContent={"center"} alignItems={"center"}>
        <Spinner color={"blue.500"} size={"xl"} />
      </Flex>
    );
  }

  const movie = useDetailQuery.data;

  if (!movie) {
    return <div>Media non trovato</div>;
  }

  return (
    <Box mx="auto" px={4} py={8}>
      <BreadcrumbRoot size="lg">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbCurrentLink>
          {movie.title ?? movie.original_title ?? movie.name ?? movie.original_name ?? ""}
        </BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Grid mt={4} templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8}>
        <GridItem>
          <Image
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title ?? movie.original_title ?? movie.name ?? movie.original_name ?? ""}
            width={300}
            height={450}
            rounded={"lg"}
            shadow={"lg"}
            w={"full"}
          />
        </GridItem>
        <GridItem>
          <Heading as="h1" size="3xl" fontStyle="bold" mb="2">
            {movie.title ?? movie.original_title ?? movie.name ?? movie.original_name ?? ""} (
            {dayjs(movie.release_date! || movie.first_air_date!).format("YYYY")})
          </Heading>
          <Flex justifyItems="center" alignItems={"center"} mb="4" spaceX="4">
            <Flex justifyItems="center">
              <ProgressCircle.Root
                size={"lg"}
                key={"lg"}
                value={movie.vote_average * 10}
                colorPalette={movie.vote_average >= 7 ? "green" : movie.vote_average >= 4 ? "yellow" : "red"}>
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range strokeLinecap="round" />
                </ProgressCircle.Circle>
                <AbsoluteCenter>
                  <ProgressCircle.ValueText />
                </AbsoluteCenter>
              </ProgressCircle.Root>
            </Flex>
            {movie.genres && (
              <Flex justifyItems="center">
                <Text color="gray">
                  <Em>{movie.genres.map((g) => g.name).join(",")}</Em>
                </Text>
              </Flex>
            )}
            {movie.runtime && (
              <Flex justifyItems="center">
                <Clock className="mr-1" />
                <span>{movie.runtime} min</span>
              </Flex>
            )}
          </Flex>
          <Text as="p" fontSize="lg" mb="4">
            {movie.overview}
          </Text>
          <Box mb="4">
            <Heading as="h2" size="xl" fontStyle="semibold" mb="2">
              Cast
            </Heading>
            {/* <Text>{movie.cast.join(", ")}</Text> */}
          </Box>
          <Box mb="4">
            <Heading as="h2" size="xl" fontStyle="semibold" mb="2">
              Director
            </Heading>
            {/* <Text>{movie.director}</Text> */}
          </Box>
          <Button mr="2">
            <Heart height="4" width="4" /> Aggiungi ai preferiti
          </Button>
          <Button variant="outline">Guarda il trailer</Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MovieView;
