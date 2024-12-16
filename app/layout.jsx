// import "./assets/scss/globals.scss";
// import "./assets/scss/theme.scss";
// import { siteConfig } from "@/config/site";
// import Providers from "@/provider/providers";
// import "simplebar-react/dist/simplebar.min.css";
// import TanstackProvider from "@/provider/providers.client";
// import "flatpickr/dist/themes/light.css";
// import DirectionProvider from "@/provider/direction.provider";
// import StoreProvider from "@/provider/StoreProvider"
// import '@/config/axios.config'
// import AuthProvider from "@/provider/auth.provider"
// export const metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
// };

// export default function RootLayout({ children, params: { lang } }) {
//   return (
//     <html lang={lang}>
//       <StoreProvider>
//         <AuthProvider>
//           <TanstackProvider>
//             <Providers>
//               <DirectionProvider lang={lang}>{children}</DirectionProvider>
//             </Providers>
//           </TanstackProvider>
//         </AuthProvider>
//       </StoreProvider>
//     </html>
//   );
// }



import { Inter } from "next/font/google";
import "./globals.css";
import "@/public/css/common.css";
import "@/public/css/responsive.css";
import "@/public/css/bootstrap.css";
import "@/public/css/all.css";
import "@/public/css/font-awesome.min.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
