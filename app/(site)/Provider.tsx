"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import ChatBot from "@/components/ChatBot";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";
import { InquiryCartProvider } from "@/context/InquiryCartContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <InquiryCartProvider>
                {/* <Lines /> */}
                <Header />
                <ToasterContext />
                {children}
                <Footer />
                <ScrollToTop />
                <ChatBot />
            </InquiryCartProvider>
        </ThemeProvider>
    );
}
