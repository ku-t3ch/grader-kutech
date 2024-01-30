import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Grader KU Tech",
    description: "Grader KU Tech",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark">
            <body className={`font-sans ${inter.variable}`}>
                <TRPCReactProvider>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <div className="min-h-screen">
                        <Header />
                        <div className="p-5 h-full w-full">
                            {children}
                        </div>
                    </div>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
