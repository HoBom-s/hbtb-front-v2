import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
  Suspense,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

// recoil
import { useRecoilValue } from "recoil";
import { ArticlePost, articlePostSelector } from "@/store";

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
import { Search2Icon } from "@chakra-ui/icons";

// icons
import { FaSearch } from "react-icons/fa";

// components
import {
  ApiErrorBoundary,
  ApiErrorFallback,
  TagItemFetch,
  TagItemSkeleton,
} from "..";

// images
import MainImage from "@/assets/main-bg.jpg";

export const Header = () => {
  const [headerScrollPosition, setHeaderScrollPosition] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const articlePost: ArticlePost = useRecoilValue(articlePostSelector);

  const navigate = useNavigate();
  const location = useLocation();

  const headerInformation: ArticlePost = useMemo(() => {
    const { title, subtitle, thumbnail } = articlePost;

    const { pathname } = location;

    const currentPath: string = pathname.split("/")[1];

    if (currentPath === "post") {
      return {
        title: title,
        subtitle: subtitle,
        thumbnail: thumbnail,
      };
    }

    return {
      title: "Tech Blog",
      subtitle: "HoBom 서비스의 기술과 노하우를 공유합니다.",
      thumbnail: MainImage,
    };
  }, [location, articlePost]);

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
          <Button
            bg="transparent"
            color="white"
            _hover={{ bg: "transparent" }}
            onClick={() => navigate("/")}
          >
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
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            maxW="1200px"
          >
            <InputGroup maxW="500px" px={2}>
              <Input
                size="lg"
                bgColor="white"
                placeholder="검색어를 입력하세요."
                value={searchKeyword}
                onChange={handleSearchValueChange}
              />
              <InputRightElement cursor="pointer" mr="10px">
                <Search2Icon />
              </InputRightElement>
            </InputGroup>
            <ApiErrorBoundary Fallback={ApiErrorFallback}>
              <Suspense
                fallback={
                  <Flex py="24px" maxW="1200px" gap={2}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num: number) => (
                      <TagItemSkeleton key={num} />
                    ))}
                  </Flex>
                }
              >
                <TagItemFetch />
              </Suspense>
            </ApiErrorBoundary>
          </Box>
        </Box>
      )}
      <Box w="100%" h="420px" top={0} left={0} zIndex={0}>
        <Image
          w="100%"
          h="420px"
          src={headerInformation.thumbnail}
          filter={
            headerInformation.thumbnail === MainImage
              ? "brightness(100%)"
              : "brightness(50%)"
          }
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
              {headerInformation.title}
            </Text>
            <Text
              color="#FFFFFF8A"
              fontSize={{ sm: "16px", md: "18px", lg: "18px" }}
              letterSpacing={-1}
            >
              {headerInformation.subtitle}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
