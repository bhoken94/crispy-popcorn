import MovieView from "@/features/movies/components/movie-view";
import { useParams, useSearchParams } from "react-router";

const MovieRoute = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const movieId = params.id as string;
  const type = searchParams.get("type") as "movie" | "tv";
  return <MovieView movieId={movieId} type={type} />;
};

export default MovieRoute;
