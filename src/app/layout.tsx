import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Toaster} from "react-hot-toast";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import NewNavbar from "@/components/navbar/NewNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Norsk",
  description: "Unlock Your Future with Norsk",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full`}
    >
    <ClientProvider/>
    <NewNavbar/>
    <Toaster/>
    {children}
    </body>
    </html>
  );
}
