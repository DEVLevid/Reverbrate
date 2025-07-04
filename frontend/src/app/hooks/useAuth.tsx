"use client";

import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const { token, refreshToken } = useContext(AuthContext);
  return { token, refreshToken };
}
