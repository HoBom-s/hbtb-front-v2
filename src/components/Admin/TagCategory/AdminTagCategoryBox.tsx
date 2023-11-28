// chakra
import { Box, Tabs, TabList, Tab, TabPanels, Text } from "@chakra-ui/react";

// types
import type { ChildrenAlias } from "@/types";

interface TagCategory {
  title: string;
}

interface AdminTagCategoryProps {
  children: ChildrenAlias;

  onSelectedTabChangeEvent: (index: number) => void;
}

export const AdminTagCategory = ({
  children,
  onSelectedTabChangeEvent,
}: AdminTagCategoryProps) => {
  const tagCategories: TagCategory[] = [
    {
      title: "Tags",
    },
  ];

  return (
    <Box boxShadow="md">
      <Tabs
        isFitted
        onChange={(index: number) => onSelectedTabChangeEvent(index)}
      >
        <TabList mb="1em">
          {tagCategories.map((tagCategory: TagCategory) => (
            <Tab key={tagCategory.title}>
              <Text as="b">{tagCategory.title.toUpperCase()}</Text>
            </Tab>
          ))}
        </TabList>
        <TabPanels>{children}</TabPanels>
      </Tabs>
    </Box>
  );
};
