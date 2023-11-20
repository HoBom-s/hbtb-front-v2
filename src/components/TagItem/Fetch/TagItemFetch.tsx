import { useCallback } from "react";

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

export const TagItemFetch = () => {
  const tagResult: Nullable<Tag[]> = useFetch<string, Tag[]>(get, "/tag");

  const handleTagItemClick = useCallback((tag: Tag) => {
    console.log(tag);
  }, []);

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
          items={tagResult}
          render={(item: Tag) => {
            return (
              <TagItem tag={item} onTagItemClickEvent={handleTagItemClick} />
            );
          }}
        />
      )}
    </Box>
  );
};
