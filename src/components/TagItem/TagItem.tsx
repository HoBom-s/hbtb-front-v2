import { memo } from "react";

// chakra
import { Tag } from "@chakra-ui/react";

// types
import type { Tag as ArticleTag } from "@/types";

interface TagItemProps {
  tag: ArticleTag;

  onTagItemClickEvent: (tag: ArticleTag) => void;
}

export const TagItem = memo(({ tag, onTagItemClickEvent }: TagItemProps) => {
  return (
    <Tag
      colorScheme="teal"
      cursor="pointer"
      onClick={() => onTagItemClickEvent(tag)}
    >
      {tag.title}
    </Tag>
  );
});
