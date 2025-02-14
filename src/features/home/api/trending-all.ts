import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { MediaItem, PaginatedResponse } from "@/types/api";

export const getAllTrending = (language = "it-IT", timeWindow = "day"): Promise<PaginatedResponse<MediaItem>> => {
  return api.get(`/trending/all/${timeWindow}`, {
    params: {
      language,
    },
  });
};

export const getAllTrendingQueryOptions = ({
  language,
  timeWindow,
}: { language?: string; timeWindow?: "day" | "week" } = {}) => {
  return queryOptions({
    queryKey: language && timeWindow ? ["trending-all", { language, timeWindow }] : ["trending-all"],
    queryFn: () => getAllTrending(language, timeWindow),
  });
};

type UseTrendingAllOptions = {
  language?: string;
  timeWindow?: "day" | "week";
  queryConfig?: QueryConfig<typeof getAllTrendingQueryOptions>;
};

export const useTrendingAll = ({ language, timeWindow, queryConfig }: UseTrendingAllOptions) => {
  return useQuery({
    ...getAllTrendingQueryOptions({ language, timeWindow }),
    ...queryConfig,
  });
};
