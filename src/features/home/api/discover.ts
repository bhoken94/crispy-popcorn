import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { MediaItem, PaginatedResponse } from "@/types/api";

type DiscoverParams = {
  language?: string;
  sortBy?: string;
  withGenres?: string;
  page?: number;
  withReleaseType?: string;
  primaryReleaseDateGte?: string;
  type?: "movie" | "tv";
};

export const getDiscover = ({
  language = "it-IT",
  sortBy = "popularity.desc",
  withGenres,
  page = 1,
  withReleaseType = "2|3",
  primaryReleaseDateGte,
  type = "movie",
}: DiscoverParams): Promise<PaginatedResponse<MediaItem>> => {
  return api.get(`/discover/${type}`, {
    params: {
      language,
      sort_by: sortBy,
      with_genres: withGenres,
      with_release_type: withReleaseType,
      "primary_release_date.gte": primaryReleaseDateGte,
      page,
    },
  });
};

export const getDiscoverQueryOptions = (params: DiscoverParams = {}) => {
  return queryOptions({
    queryKey: ["discover", { ...params, primaryReleaseDateGte: params.primaryReleaseDateGte?.split("T")[0] }],
    queryFn: () => getDiscover(params),
  });
};

type UseDiscoverOptions = DiscoverParams & {
  queryConfig?: QueryConfig<typeof getDiscoverQueryOptions>;
};

export const useDiscover = ({ queryConfig, ...params }: UseDiscoverOptions) => {
  return useQuery({
    ...getDiscoverQueryOptions(params),
    ...queryConfig,
  });
};
