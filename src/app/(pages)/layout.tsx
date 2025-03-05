import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import TanstackProvider from "@/TanstackProvider/TanstackProvider";
import type { Metadata } from "next";
import { Montserrat, Roboto, Rubik } from "next/font/google";
import "../globals.css";
import { Suspense } from "react";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
});

const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"],
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "SKB BEST",
    description: "Get the best",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} ${roboto.variable} ${rubik.variable} ${montserrat.variable} antialiased`} cz-shortcut-listen="true">
                <TanstackProvider>
                <Suspense fallback={<div>Loading search...</div>}>
                    <Header />
                    {children}
                    <Footer />
                    </Suspense>
                </TanstackProvider>
            </body>
        </html>
    );
}
