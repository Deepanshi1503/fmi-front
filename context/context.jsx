"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
// import useSWR from "swr";
// import { useSearchParams } from "next/navigation";
// import { setCookie } from "cookies-next";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    // const searchParams = useSearchParams();   
    // SWR LIbraray for data fee
    //   const schoolCategoryData = useSWR(
    //     `${SCHOOL_CATEGORY_API_ENDPOINT}?filters[is_featured]=true&populate=*`,
    //     fetcher
    //   );
    // *****************

    //fetch all the business
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("userId"));
                if (!userId) return;

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses?filters[user][id][$eq]=${userId}&populate=stats,step_progress`
                );
                setBusinesses(response.data.data);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };

        fetchBusinesses();
    }, []);


    //filtered business based on the selected profile
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    useEffect(()=>{
        if (selectedBusiness) {
            setFilteredProfiles(businesses.filter((profile) => profile.id === selectedBusiness.id));
        } else {
            setFilteredProfiles(businesses); // Include all businesses when "All listings" is selected
        }
    },[selectedBusiness, businesses])

    return (
        <GlobalContext.Provider
            value={{
                businesses,
                selectedBusiness,
                setSelectedBusiness,
                filteredProfiles,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
