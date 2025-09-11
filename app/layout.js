import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ReduxProvider } from "./providers";

export const metadata = {
  title: "Inventory Management System",
  description: "Manage your automobile parts inventory efficiently",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <ReduxProvider>
            {children}
            <Toaster />
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
