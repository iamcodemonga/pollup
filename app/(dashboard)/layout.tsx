// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/dashboard/SideBar";
import { ThemeProvider } from "@/components/Theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
            <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
                <section className='w-full flex h-screen'>
                    <SideBar />
                    {children}
                </section>
            </ThemeProvider> );
}
