import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";

import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import DocAppBar from "./shared/components/doc-app-bar";
import { SWRConfig } from "swr";
import { GlobalProvider } from "./shared/components/global-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starry Doc",
  description: "Doc serivce for starry stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CssBaseline />

      <GlobalProvider>
        <body className={inter.className}>
          <DocAppBar />
          {children}
        </body>
      </GlobalProvider>
    </html>
  );
}
