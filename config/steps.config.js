import FounderTeam from "@/components/profile-creation/founder-team/founder-team-steps";
import CompanyOverview from "@/components/profile-creation/company-overview/company-overview-steps";
import ProductServices from "@/components/profile-creation/product-services/product-services-steps";
import MarketCompetition from "@/components/profile-creation/market-competition/market-competition-steps";
import Financial from "@/components/profile-creation/financial/financial-form";
import EquitySale from "@/components/profile-creation/equity-fundraising/equity-sell-steps"

const stepsConfig = [
  { id: "company-overview", label: "Company Overview", component: <CompanyOverview /> },
  { id: "products-services", label: "Products and Services", component: <ProductServices /> },
  { id: "founder-team", label: "Founder & Team", component: <FounderTeam /> },
  { id: "market-competition", label: "Market and Competition", component: <MarketCompetition /> },
  { id: "financial", label: "Financial", component: <Financial /> },
  { id: "equity-fundraising", label: "Equity & Fundraising", component: <EquitySale /> },
];

export default stepsConfig;