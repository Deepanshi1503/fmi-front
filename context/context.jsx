"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
// import useSWR from "swr";
// import { useSearchParams } from "next/navigation";
// import { setCookie } from "cookies-next";
// const searchParams = useSearchParams();   
// SWR LIbraray for data fee
//   const schoolCategoryData = useSWR(
//     `${SCHOOL_CATEGORY_API_ENDPOINT}?filters[is_featured]=true&populate=*`,
//     fetcher
//   );
// *****************

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    //****************** Dashboard *********************//
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
    useEffect(() => {
        if (selectedBusiness) {
            setFilteredProfiles(businesses.filter((profile) => profile.id === selectedBusiness.id));
        } else {
            setFilteredProfiles(businesses); // Include all businesses when "All listings" is selected
        }
    }, [selectedBusiness, businesses])


    //****************** Step up form for business *********************//
    const [activeStep, setActiveStep] = useState(null);
    const [loading, setLoading] = useState(true);
    // Load the active step from localStorage or sessionStorage
    useEffect(() => {
        const savedStep = localStorage.getItem("activeStep");
        if (savedStep !== null) {
            setActiveStep(parseInt(savedStep, 10));
        } else {
            setActiveStep(0);
        }
        setLoading(false);
    }, []);

    // Save the active step to localStorage whenever it changes
    useEffect(() => {
        if (activeStep !== null) {
            localStorage.setItem("activeStep", activeStep);
        }
    }, [activeStep]);


    //****************** Step up form for business 6th step quity and fundraising *********************//
    const [isSaleListing, setIsSaleListing] = useState(true); // Default to Fundraise Listing

    return (
        <GlobalContext.Provider
            value={{
                businesses,
                setBusinesses,
                selectedBusiness,
                setSelectedBusiness,
                filteredProfiles,
                setFilteredProfiles,
                activeStep,
                setActiveStep,
                loading,
                setLoading,
                isSaleListing,
                setIsSaleListing
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
