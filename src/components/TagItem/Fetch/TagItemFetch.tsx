// chakra
import { Box } from "@chakra-ui/react";

// hooks
import { useFetch } from "@/hooks";

// components
import { RenderProps, TagItem } from "@/components";

// apis
import { get } from "@/apis";

// types
import type { Nullable, Tag } from "@/types";

interface TagItemFetchProps {
  onTagItemClickEvent: (tag: Tag) => void;
}

interface TagResponse {
  foundTags: Tag[];
}

export const TagItemFetch = ({ onTagItemClickEvent }: TagItemFetchProps) => {
  const tagResult: Nullable<TagResponse> = useFetch<string, TagResponse>(
    get,
    "/api/v2/tags",
  );

  return (
    <Box
      py="24px"
      sx={{
        ".tag-render-list": {
          display: "flex",
          flexDir: "row",
          flexWrap: "wrap",
          gap: 2,
          padding: 2,
        },
      }}
    >
      {tagResult && (
        <RenderProps
          className="tag-render-list"
          items={tagResult.foundTags}
          render={(item: Tag) => {
            return (
              <TagItem tag={item} onTagItemClickEvent={onTagItemClickEvent} />
            );
          }}
        />
      )}
    </Box>
  );
};
