// chakra
import { Box } from "@chakra-ui/react";

// types
import type { ChildrenAlias } from "@/types";

interface RendererProps<T> {
  className?: string;

  items: T[];

  render: (item: T) => ChildrenAlias;
}

export const RenderProps = <T,>({
  className,
  items,
  render,
}: RendererProps<T>) => {
  return (
    <div className={className}>
      {items &&
        items.map((item: T, index: number) => (
          <Box key={index}>{render(item)}</Box>
        ))}
    </div>
  );
};
