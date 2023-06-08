import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  get_token,
  get_user,
  set_user as set_user_local_storage,
  set_token as set_token_local_storage,
} from "../helpers/storage";

const AuthContext = createContext();

export const user_local_storage = "_user";
export const token_local_storage = "_token";

const AuthContextProvider = ({ children }) => {
  const [user, set_user] = useState(get_user());
  const [token, set_token] = useState(get_token());

  useEffect(() => {
    if (user) {
      set_user_local_storage(user);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      set_token_local_storage(token);
    }
  }, [token]);

  const values = useMemo(
    () => ({
      user,
      set_user,
      token,
      set_token,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
