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

export const PrivateRouter = ({ children }: PrivateRouterProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authToken: Nullable<string> = SessionStorage.getItem(AUTH_KEY);

      if (!authToken) {
        navigate("/");
      }

      try {
        const authCheck: Auth = await get("/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!authCheck._id) {
          navigate("/");
        }
      } catch (e: unknown) {
        console.error(e);

        navigate("/");
      }
    })();
  }, []);

  return <Fragment>{children}</Fragment>;
};
