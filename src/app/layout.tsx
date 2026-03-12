import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "./providers";

export const metadata: Metadata = {
  title: "PeopleFusion – Org Chart",
  description: "Interactive employee organisational chart",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
