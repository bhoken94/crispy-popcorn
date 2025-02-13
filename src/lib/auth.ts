import { User } from "@supabase/supabase-js";
import { configureAuth } from "react-query-auth";
import { supabase } from "./supabase-client";

const getUser = async (): Promise<User> => {
  const { data } = await supabase.auth.getUser();
  return data.user!;
};

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
  if (error) {
    console.error(error);
    return null;
  }
  return null;
};

const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

const authConfig = {
  userFn: getUser,
  loginFn: login,
  logoutFn: logout,
  registerFn: () => {
    throw new Error("Not implemented");
  },
};

export const { useUser, useLogin, useLogout, AuthLoader } = configureAuth(authConfig);
