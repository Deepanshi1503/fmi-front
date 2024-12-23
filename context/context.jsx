"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { setCookie } from "cookies-next";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const searchParams = useSearchParams();
    const [founders, setFounders] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [advisors, setAdvisors] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState([]);

    // useEffect(() => {
    //     // Load data from localStorage
    //     const savedData = {
    //         founders: JSON.parse(localStorage.getItem("founders")) || [],
    //         teamMembers: JSON.parse(localStorage.getItem("teamMembers")) || [],
    //         advisors: JSON.parse(localStorage.getItem("advisors")) || [],
    //         formState: JSON.parse(localStorage.getItem("formState")) || [],
    //     };
    //     setFounders(savedData.founders);
    //     setTeamMembers(savedData.teamMembers);
    //     setAdvisors(savedData.advisors);
    //     setIsFormOpen(savedData.formState);
    // }, []);

    // useEffect(() => {
    //     // Save data to localStorage
    //     localStorage.setItem("founders", JSON.stringify(founders));
    //     localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    //     localStorage.setItem("advisors", JSON.stringify(advisors));
    //     localStorage.setItem("formState", JSON.stringify(isFormOpen));
    // }, [founders, teamMembers, advisors, isFormOpen]);

    // SWR LIbraray for data fee
    //   const schoolCategoryData = useSWR(
    //     `${SCHOOL_CATEGORY_API_ENDPOINT}?filters[is_featured]=true&populate=*`,
    //     fetcher
    //   );
    // *****************

    return (
        <GlobalContext.Provider
            value={{
                founders,
                setFounders,
                teamMembers,
                setTeamMembers,
                advisors,
                setAdvisors,
                isFormOpen,
                setIsFormOpen,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
