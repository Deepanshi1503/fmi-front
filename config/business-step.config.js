import Overview from "@/components/investor-profile-creation/investor-overview/steps";
import Investments from "@/components/investor-profile-creation/investments/steps";
import CompanyDetail from "@/components/investor-profile-creation/company-details/steps";
import FounderTeam from "../components/investor-profile-creation/founder-team-details/steps"

const businessStepsConfig = [
    { id: "company-detail", label: "Company Detail", component: <CompanyDetail /> },
    { id: "overview", label: "Overview", component: <Overview /> },
    { id: "investments", label: "Investments", component: <Investments /> },
    { id: "founder-team", label: "Founder & Team", component: <FounderTeam /> },
];

export default businessStepsConfig;