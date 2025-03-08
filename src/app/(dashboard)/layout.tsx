import { AppSidebar } from "@/components/dashboardComponents/app-sidebar";
import { TopNavbar } from "@/components/dashboardComponents/top-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import TokenExpirationContext from "@/context/TokenExpirationContext";
import TanstackProvider from "@/TanstackProvider/TanstackProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "../(pages)/StoreProvider";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DASHBOARD SKB BEST",
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                cz-shortcut-listen="true"
                suppressHydrationWarning>
                <StoreProvider>
                    <TanstackProvider>
                        <TokenExpirationContext>
                            <SidebarProvider>
                                <AppSidebar />
                                <SidebarInset>
                                    <TopNavbar />
                                    {children}
                                </SidebarInset>
                            </SidebarProvider>
                        </TokenExpirationContext>
                    </TanstackProvider>
                    <Toaster richColors />
                </StoreProvider>
            </body>
        </html>
    );
}
