import { AppSidebar } from "@/components/dashboardComponents/app-sidebar";
import { TopNavbar } from "@/components/dashboardComponents/top-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/TanstackProvider/TanstackProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <TanstackProvider>
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>
                            <TopNavbar />
                            {children}
                        </SidebarInset>
                    </SidebarProvider>
                </TanstackProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
