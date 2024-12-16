"use client";
import { useEffect, useState } from "react";
import LayoutLoader from "@/components/layout-loader";
import { useAppDispatch } from "./Store";
import { useRouter, usePathname } from "next/navigation";
import axiosInstance from "@/config/axios.config";
import { setUser } from "./slice/UserSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false)

  const validateToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const { data } = await axiosInstance.post("/api/validateToken", { token });
      dispatch(setUser({ ...data.user }));
      handleRoleBasedRedirection(data.user.role);
    } catch (error) {
      console.error("Token validation failed:", error);
      redirectToLogin();
    } finally {
      setIsLoading(false)
    }
  };

  const handleRoleBasedRedirection = (role) => {
    console.log(pathname, role) 
    if (role.name === 'ADMIN') {
      if (!pathname.startsWith('/admin')) {
        router.push("/admin/dashboard");
      }
    } else if (role.name === 'TRAINER') {
      if (!pathname.startsWith('/trainer')) {
        router.push("/trainer/dashboard");
      }
    }
  };

  const redirectToLogin = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    router.push("/auth/login");
  };

  useEffect(() => {
    setIsLoading(true)
    validateToken();
  }, []);
  return <>
    {isLoading ? <LayoutLoader /> :
      children}
  </>
};

export default AuthProvider;
