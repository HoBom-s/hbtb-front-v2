import { useMemo } from "react";

// chakra
import { Flex, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface PaginatorProps {
  curPageNumber: number;

  totalPageNumber: number;

  onBackButtonClickEvent: () => void;

  onFowardButtonClickEvent: () => void;

  onPageButtonClickEvent: (pageNumber: number) => void;
}

export const Paginator = ({
  curPageNumber,
  totalPageNumber,
  onBackButtonClickEvent,
  onFowardButtonClickEvent,
  onPageButtonClickEvent,
}: PaginatorProps) => {
  const pageIndexes: number[] = useMemo(
    () =>
      Array.from({ length: totalPageNumber }).map((_, idx: number) => idx + 1),
    [totalPageNumber],
  );

  const isFirstPageNumber: boolean = useMemo(
    () => curPageNumber === 1,
    [curPageNumber],
  );

  const isLastPageNumber: boolean = useMemo(
    () => curPageNumber === totalPageNumber,
    [curPageNumber, totalPageNumber],
  );

  return (
    <Flex alignItems="center" gap={2}>
      <Button
        variant="outline"
        isDisabled={isFirstPageNumber}
        onClick={onBackButtonClickEvent}
      >
        <ArrowBackIcon />
      </Button>
      {pageIndexes.map((num: number) => (
        <Button
          key={num}
          variant={num === curPageNumber ? "solid" : "outline"}
          onClick={() => onPageButtonClickEvent(num)}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="outline"
        isDisabled={isLastPageNumber}
        onClick={onFowardButtonClickEvent}
      >
        <ArrowForwardIcon />
      </Button>
    </Flex>
  );
};
