"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { setCookie } from "cookies-next";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const searchParams = useSearchParams();   

    // SWR LIbraray for data fee
    //   const schoolCategoryData = useSWR(
    //     `${SCHOOL_CATEGORY_API_ENDPOINT}?filters[is_featured]=true&populate=*`,
    //     fetcher
    //   );
    // *****************

    return (
        <GlobalContext.Provider
            value={{
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
