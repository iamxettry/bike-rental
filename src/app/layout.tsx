import type { Metadata } from "next";
import "./globals.css";
import { Style } from "@/lib/Style";
import Footer from "@/components/global/Footer";
import { Toaster } from "react-hot-toast";
import Main from "./Main";
import ContextProvider from "@/context/ContextProvider";
import Script from "next/script";
export const metadata: Metadata = {
  title: "Bike Rental System",
  description: "Bike Rental System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setInitialTheme = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

  return (
    <html lang="en">
      <body className={Style.bgPrimary}>
        {/* <Script id="theme-switcher" strategy="beforeInteractive">
          {`
            (function() {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })()
          `}
        </Script> */}
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex flex-col min-h-screen  ">
          <ContextProvider>
            <Main>{children}</Main>
          </ContextProvider>
        </div>
      </body>
    </html>
  );
}
