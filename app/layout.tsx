import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ConvexClientProvider } from "./providers/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { Loader } from "@/components/loader";
import { ModalProvider } from "./providers/modal-provider";
import { AppWrapper } from "./context_";
import { AuthProvider } from "./context_/AuthContext";
import { WorkspaceProvider } from "./context_/WorkspaceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beyondraft",
  description: "A flowchart generation tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Loader>
              <AuthProvider>
                <WorkspaceProvider>
                  <AppWrapper>
                    {children}
                    <ModalProvider />
                    <Toaster />
                  </AppWrapper>
                </WorkspaceProvider>
              </AuthProvider>
            </Loader>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
