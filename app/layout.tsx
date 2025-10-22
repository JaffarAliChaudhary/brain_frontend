import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import ClientOnly from "@/components/ClientOnly";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground transition-colors duration-600">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientOnly>
            <Navbar />
          </ClientOnly>
          <main className="container mx-auto p-6 space-y-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}