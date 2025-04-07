import { useQuery, queryOptions } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { MediaDetail } from "@/types/api";

type DetailParams = {
  mediaId: string;
  type?: "movie" | "tv";
  language?: string;
};

export const getMediaDetail = ({ mediaId, type, language = "it-IT" }: DetailParams): Promise<MediaDetail> => {
  return api.get(`/${type}/${mediaId}`, {
    params: {
      language,
    },
  });
};

export const getMediaDetailQueryOptions = (params: DetailParams = { mediaId: "", type: "movie" }) => {
  return queryOptions({
    queryKey: ["detail", { ...params }],
    queryFn: () => getMediaDetail(params),
  });
};

type UseDetailOptions = DetailParams & {
  queryConfig?: QueryConfig<typeof getMediaDetailQueryOptions>;
};

export const useDetail = ({ queryConfig, ...params }: UseDetailOptions) => {
  return useQuery({
    ...getMediaDetailQueryOptions(params),
    ...queryConfig,
  });
};
