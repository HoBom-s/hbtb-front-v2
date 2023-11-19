import { useState, useEffect, useCallback, ChangeEvent } from "react";

// chakra
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

// icons
import { FaSearch } from "react-icons/fa";

// images
import MainImage from "@/assets/main-bg.jpg";

export const Header = () => {
  const [headerScrollPosition, setHeaderScrollPosition] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHeaderScrollPosition(window.scrollY);
    });
  }, []);

  const handleSearchButtonClick = useCallback(() => {
    setIsSearchOpen((prevIsSearchOpen: boolean) => !prevIsSearchOpen);
  }, []);

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchKeyword(value);
  };

  return (
    <Box>
      <Box
        bg={headerScrollPosition < 84 ? "transparent" : "rgb(8, 9, 10)"}
        w="100%"
        h="84px"
        p={1}
        zIndex={2}
        transition="0.5s"
        position="fixed"
      >
        <Flex
          h="100%"
          p={0}
          flex={1}
          position="relative"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button bg="transparent" color="white" _hover={{ bg: "transparent" }}>
            <Text as="b" fontSize="xl">
              HOBOM TECH
            </Text>
          </Button>
          <Box>
            <Button
              bg="transparent"
              color="white"
              _hover={{ bg: "transparent" }}
            >
              <Text as="b" fontSize="xl" borderBottom="3px solid orange">
                TECH
              </Text>
            </Button>
            <Button
              bg="transparent"
              color="white"
              _hover={{ bg: "transparent" }}
              onClick={handleSearchButtonClick}
            >
              <FaSearch />
            </Button>
          </Box>
        </Flex>
      </Box>
      {isSearchOpen && headerScrollPosition < 84 && (
        <Box
          w="100%"
          height="420px"
          top="0"
          left="0"
          zIndex={1}
          position="fixed"
          bgColor="black"
        >
          <Box
            w="100%"
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <InputGroup w="500px">
              <Input
                size="lg"
                bgColor="white"
                placeholder="검색어를 입력하세요."
                value={searchKeyword}
                onChange={handleSearchValueChange}
              />
              <InputRightElement cursor="pointer">
                <SearchIcon />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      )}
      <Box w="100%" h="420px" top={0} left={0} zIndex={0}>
        <Image
          w="100%"
          h="420px"
          src={MainImage}
          objectFit="cover"
          position="absolute"
        />
        <Box
          w={[300, 600, 1200]}
          h="420px"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Text
              as="b"
              h="70px"
              fontSize={{ sm: "46px", md: "54px", lg: "54px" }}
              mb="24px"
              color="white"
            >
              Tech Blog
            </Text>
            <Text
              color="#FFFFFF8A"
              fontSize={{ sm: "16px", md: "18px", lg: "18px" }}
              letterSpacing={-1}
            >
              HoBom 서비스의 기술과 노하우를 공유합니다.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
