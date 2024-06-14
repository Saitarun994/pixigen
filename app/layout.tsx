import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

const IBMPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-ibm-plex",

});

export const metadata: Metadata = {
  title: "Pixigen",
  description: "the ultimate AI-driven image editing platform. Designed for both amateurs and professionals, Pixigen offers cutting-edge tools to restore, recolor, and reinvent your photos effortlessly. Whether you're looking to remove backgrounds, apply generative fills, or simply enhance old pictures, Pixigen provides intuitive solutions to transform your images into masterpieces. Experience the future of image editing—optimize, create, and innovate with Pixigen today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [ neobrutalism],
        variables: { colorPrimary: 'red' },
        signIn: { 
          baseTheme: [], 
          variables: { colorPrimary: '#CA9BF7' }
        },
        signUp: { 
          baseTheme: [], 
          variables: { colorPrimary: '#CA9BF7' }
        }
      }}
    >
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
