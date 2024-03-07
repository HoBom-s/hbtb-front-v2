import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// chakra
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

// apis
import { get } from "@/apis";

// types
import { Auth } from "@/types";

// utils
import { SessionStorage, AUTH_KEY } from "@/utils";

interface AuthResponse {
  foundUser: Auth;
}

export const AdminHeader = () => {
  const [adminAuth, setAdminAuth] = useState<Auth>();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authInformation: AuthResponse = await get("/api/v2/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SessionStorage.getItem(AUTH_KEY)}`,
        },
      });

      setAdminAuth(authInformation.foundUser);
    })();
  }, []);

  const handleLogoutButtonClick = () => {
    SessionStorage.clearAllItem();

    navigate("/");
  };

  return (
    <Box>
      <Box w="100%" h="50px" bgColor="#424242" boxShadow="lg">
        <Flex justifyContent="space-between" alignItems="center" p="12px">
          <Box>
            <Text
              as="b"
              fontSize="xl"
              color="teal.100"
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              HOBOM TECH
            </Text>
          </Box>
          <Box>
            <Text
              as="b"
              fontSize="sm"
              color="teal.100"
              cursor="pointer"
              pr="20px"
              onClick={handleLogoutButtonClick}
            >
              LOGOUT
            </Text>
            <Avatar
              loading="lazy"
              size="sm"
              cursor="pointer"
              name={adminAuth?.nickname}
              src={adminAuth?.profileImg}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
