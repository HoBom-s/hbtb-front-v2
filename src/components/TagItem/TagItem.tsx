// chakra
import { Tag } from "@chakra-ui/react";

interface TagItemProps {
  name: string;

  onTagItemClickEvent: () => void;
}

export const TagItem = ({ name, onTagItemClickEvent }: TagItemProps) => {
  return (
    <Tag colorScheme="teal" onClick={onTagItemClickEvent}>
      {name}
    </Tag>
  );
};
