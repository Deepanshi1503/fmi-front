"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchBusinesses } from "@/utils/api";
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

    //****************** Login and signup auth *********************//
    const [step, setStep] = useState("login");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");


    //****************** Dashboard *********************//
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("userId"));
                if (!userId) return;

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/businesses?filters[user][id][$eq]=${userId}&populate=stats,step_progress` //fetch all the business
                );
                setBusinesses(response.data.data);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };

        fetchBusinesses();
    }, []);

    const [filteredProfiles, setFilteredProfiles] = useState([]);
    useEffect(() => {
        if (selectedBusiness) {
            setFilteredProfiles(businesses.filter((profile) => profile.id === selectedBusiness.id)); //filtered business based on the selected profile
        } else {
            setFilteredProfiles(businesses); //when "All listings" is selected
        }
    }, [selectedBusiness, businesses])

    //******************Investor Dashboard *********************//
    const [investor, setInvestor] = useState([]);
    useEffect(() => {
        const fetchInvestor = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("userId"));
                if (!userId) return;

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/investors?filters[user][id][$eq]=${userId}&populate=*` //fetch all the business
                );
                setInvestor(response.data.data);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };

        fetchInvestor();
    }, []);


    //****************** Step up form for business *********************//
    const [activeStep, setActiveStep] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const savedStep = localStorage.getItem("activeStep");
        const savedInvestorStep = localStorage.getItem("investorActiveStep");
        if (savedStep !== null) {
            setActiveStep(parseInt(savedStep, 10));
        } else {
            setActiveStep(0);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (activeStep !== null) {
            localStorage.setItem("activeStep", activeStep); // Save the active step to localStorage whenever it changes
        }
    }, [activeStep]);


    //****************** Step up form for investor *********************//
    const [investorActiveStep, setInvestorActiveStep] = useState(null);
    useEffect(() => {
        const savedInvestorStep = localStorage.getItem("investorActiveStep");
        if (savedInvestorStep !== null) {
            setInvestorActiveStep(parseInt(savedInvestorStep, 10));
        } else {
            setInvestorActiveStep(0);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (investorActiveStep !== null) {
            localStorage.setItem("investorActiveStep", investorActiveStep); // Save the active step to localStorage whenever it changes
        }
    }, [investorActiveStep]);

    const [isInvestorFormDirty, setIsInvestorFormDirty] = useState(false); // Track unsaved changes
    useEffect(() => {
        // Store the initial values of the localStorage keys to track
        const initialInvestorInfo = JSON.stringify(localStorage.getItem("combineInvestorInfo"));
        const initialInvestorProgress = JSON.stringify(localStorage.getItem("profileInvestorProgress"));

        const handleStorageChange = () => {
            const updatedInvestorInfo = JSON.stringify(localStorage.getItem("combineInvestorInfo"));
            const updatedInvestorProgress = JSON.stringify(localStorage.getItem("profileInvestorProgress"));

            // Check if the values have changed compared to the initial state
            if (
                updatedInvestorInfo !== initialInvestorInfo ||
                updatedInvestorProgress !== initialInvestorProgress
            ) {
                setIsInvestorFormDirty(true); // Mark the form as dirty
            }
        };

        // Add the storage event listener
        window.addEventListener("storage", handleStorageChange);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    //****************** Step up form for business 6th step equity and fundraising *********************//
    const [isSaleListing, setIsSaleListing] = useState(true); // Default to Fundraise Listing


    //****************** Investor Listing page *********************//

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
                setIsSaleListing,
                step,
                setStep,
                email,
                setEmail,
                phoneNumber,
                setPhoneNumber,
                name,
                setName,
                investorActiveStep,
                setInvestorActiveStep,
                isInvestorFormDirty,
                setIsInvestorFormDirty,
                investor,
                setInvestor,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
