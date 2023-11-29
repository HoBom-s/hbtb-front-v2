import { memo } from "react";

// chakra
import { Tag } from "@chakra-ui/react";

// types
import type { Tag as ArticleTag } from "@/types";

interface TagItemProps {
  tag: ArticleTag;

  outlined?: boolean;

  onTagItemClickEvent: (tag: ArticleTag) => void;
}

export const TagItem = memo(
  ({ tag, outlined, onTagItemClickEvent }: TagItemProps) => {
    return (
      <Tag
        colorScheme="teal"
        cursor="pointer"
        variant={outlined ? "outline" : "subtle"}
        onClick={() => onTagItemClickEvent(tag)}
      >
        {tag.title}
      </Tag>
    );
  },
);
