import Card from "@/components/ui/card";
import { MediaItem } from "@/types/api";
import { Box, Button, Flex, Heading, Image, Container, IconButton } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

const MovieList = ({ title, movies }: { title: string; movies: MediaItem[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    direction: "ltr",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const moviesToShow = movies.slice(0, 10);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Container mb={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md" fontSize="2xl" fontWeight="bold" mb={4}>
          {title}
        </Heading>
        <Flex gap={2}>
          <IconButton variant="outline" onClick={scrollPrev} disabled={!prevBtnEnabled}>
            <ChevronLeft />
          </IconButton>
          <IconButton variant="outline" onClick={scrollNext} disabled={!nextBtnEnabled}>
            <ChevronRight />
          </IconButton>
        </Flex>
      </Flex>
      <Box ref={emblaRef} overflow="hidden">
        <Flex>
          {moviesToShow.map((movie) => (
            <Box
              key={movie.id}
              minW="0"
              flex={{ base: "0 0 50%", sm: "0 0 33.33%", md: "0 0 25%", lg: "0 0 20%" }}
              p={2}
              _first={{ pl: 2 }}>
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <Card
                  title={movie.title ?? movie.original_title ?? movie.name ?? movie.original_name ?? ""}
                  variant="elevated">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title ?? movie.original_title ?? movie.name ?? movie.original_name ?? ""}
                    width={300}
                    height={450}
                    aspectRatio={2 / 3}
                    w="full"
                    objectFit="cover"
                  />
                </Card>
              </Link>
            </Box>
          ))}
        </Flex>
      </Box>
    </Container>
  );
};

export default MovieList;
