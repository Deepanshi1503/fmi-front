"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";
import { useSidebar, useThemeStore } from "@/store";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import NotificationMessage from "./notification-message";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenuHandler from "./mobile-menu-handler";
import FullScreen from "./full-screen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportsSnapshot from "@/app/admin/dashboard/components/reports-snapshot";
import WelcomeBlock from "@/app/admin/dashboard/components/welcome-block";
import GradiantRadialBar from "@/app/admin/dashboard/components/gradiant-radial-bar";
import BlueRadialBar from "@/app/admin/dashboard/components/blue-radial-bar";
import { usePathname } from "next/navigation";
import HeaderCard from "./header-card";
const NavTools = ({ isDesktop, sidebarType }) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      {/* {isDesktop && <Language />} */}
      {isDesktop && <FullScreen />}
      <ThemeButton />
      <NotificationMessage />
      <div className="ltr:pl-2 rtl:pr-2">
        <ProfileInfo />
      </div>
      {!isDesktop && sidebarType !== "module" && <MobileMenuHandler />}
    </div>
  );
};
const Header = ({ handleOpenSearch, roleType }) => {
  const location = usePathname();
  const { collapsed, sidebarType } = useSidebar();
  const { navbarType } = useThemeStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");

  return (
    <header
      className={cn("z-50 has-sticky-header rounded-md   ", {
        "ltr:xl:ml-[72px] rtl:xl:mr-[72px] ": collapsed,
        "ltr:xl:ml-[248px] rtl:xl:mr-[248px] ": !collapsed,

        "sticky top-6": navbarType === "relative",
      })}
    >
      <div className="xl:mx-20 mx-4 ">
        <div className="w-full backdrop-blur-lg md:px-6 px-[15px] p-4 rounded-md mt-6 my-0 shadow-md border-b blueBackground">
          <div className="flex justify-between items-center h-full bluebgHeader">
            <VerticalHeader
              sidebarType={sidebarType}
              handleOpenSearch={handleOpenSearch}
            />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
          {location.endsWith('/dashboard') && <AdminPage />}
          {location.endsWith('/user-dashboard') && <UserPage />}

        </div>
      </div>
    </header>
  );
}

export default Header;

const UserPage = () => {
  return <div className="grid grid-cols-12  gap-6 pt-6 rounded-lg blueBackground">
    <div className="col-span-12 lg:col-span-4 welcomeBlock">
      <WelcomeBlock />
    </div>
    <div className="col-span-12 lg:col-span-4">
      <Card className="lightblue-bg">
        <CardHeader className="mb-0">
          <h2>Learning Progress</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6">
            <GradiantRadialBar />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <BlueRadialBar />
          </div>
        </CardContent>
      </Card>
    </div>
    <div className="col-span-12 lg:col-span-4">
      <ReportsSnapshot />
    </div>
  </div>
}
const AdminPage = () => {
  return <>
  <HeaderCard/>
  </>;
}