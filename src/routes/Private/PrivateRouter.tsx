import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

// apis
import { get } from "@/apis";

// utils
import { AUTH_KEY, SessionStorage } from "@/utils";

// types
import { Nullable, Auth, ChildrenAlias } from "@/types";

interface PrivateRouterProps {
  children: ChildrenAlias;
}

interface AuthResponse {
  foundUser: Auth;
}

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authToken: Nullable<string> = SessionStorage.getItem(AUTH_KEY);

      if (!authToken) {
        navigate("/");
      }

      try {
        const authCheck: AuthResponse = await get("/api/v2/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!authCheck.foundUser.id) {
          navigate("/");
        }
      } catch (e: unknown) {
        console.error(e);

        navigate("/");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Fragment>{children}</Fragment>;
};
