"use client";
import React, { useEffect } from "react";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/partials/footer";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileSidebar from "@/components/partials/sidebar/mobile-sidebar";
import HeaderSearch from "@/components/header-search";
import { useMounted } from "@/hooks/use-mounted";
import LayoutLoader from "@/components/layout-loader";
import { useAppSelector } from "./Store";
const DashBoardLayoutProvider = ({ children, roleType }) => {
  const { collapsed } = useSidebar();
  const [open, setOpen] = React.useState(false)
  const location = usePathname();
  const router=useRouter()
  const isMobile = useMediaQuery("(min-width: 768px)");
  const mounted = useMounted();
  const user = useAppSelector((state) => state.user)
  const handleRoleBasedRedirection = () => {
    const role = user?.role
    if (role.name === 'ADMIN') {
      if (!location.startsWith('/admin')) {
        router.push("/admin/dashboard");
      }
    } else if (role.name === 'TRAINER') {
      if (!location.startsWith('/trainer')) {
        router.push("/trainer/dashboard");
      }
    }
  };

  useEffect(() => {
    if (user)
      handleRoleBasedRedirection()
  }, [location])

  if (!mounted) {
    return <LayoutLoader />;
  }
  return (
    <>
      <Header handleOpenSearch={() => setOpen(true)} roleType={roleType} />
      <Sidebar />
      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
          "ltr:xl:ml-[248px] rtl:xl:mr-[248px]": !collapsed,
        })}
      >
        <div
          className={cn(
            "md:pt-6 pb-[37px] pt-[15px] md:px-6 px-4  page-min-height-semibox ",
            {}
          )}
        >
          <div className="semibox-content-wrapper ">
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default DashBoardLayoutProvider;
const LayoutWrapper = ({ children, isMobile, setOpen, open, location }) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};
