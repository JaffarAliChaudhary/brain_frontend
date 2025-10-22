"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // ✅ Get current path

  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Transcripts", path: "/transcripts" },
    { name: "Search", path: "/search" },
  ];

  return (
    <nav className="flex items-center justify-between bg-card shadow-sm px-6 py-3 rounded-xl">
      <div className="flex justify-center items-center w-full space-x-6">
        {navItems.map(({ name, path }) => (
          <Link
            key={path}
            href={path}
            className={`font-medium transition-colors ${
              pathname === path
                ? "text-primary font-semibold" // ✅ Active link style
                : "hover:text-primary text-muted-foreground"
            }`}
          >
            {name}
          </Link>
        ))}
      </div>

      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      )}
    </nav>
  );
}
