import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export const searchMovies = ({ searchParam }: { searchParam: string }): Promise<{ data: unknown }> => {
  return api.get(`/search/movie`, {
    params: {
      query: searchParam,
    },
  });
};

export const getSearchedMoviesQueryOptions = (searchParam: string) => {
  return queryOptions({
    queryKey: ["search_movies", searchParam],
    queryFn: () => {
      return searchMovies({ searchParam });
    },
  });
};

type UseSearchedMoviesOptions = {
  searchParam: string;
  queryConfig?: QueryConfig<typeof searchMovies>;
};

export const useSearchedMovies = ({ searchParam }: UseSearchedMoviesOptions) => {
  return useQuery({
    ...getSearchedMoviesQueryOptions(searchParam),
  });
};
