import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter, Space_Grotesk as spaceGroteskk } from "next/font/google"; // needed to write because of those camel case errors by eslint
import React from "react";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = spaceGroteskk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    " A community-driven platform for asking and answering programming questions. Get help, share knowledge and collaborate with developers from around the world. Explore topics in web developments, mobile app development, algorithms, data structures and more...",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover: text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
