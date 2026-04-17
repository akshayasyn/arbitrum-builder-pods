import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { Blocks, Layers, LineChart, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Layers },
  { href: "/concepts", label: "Concepts", icon: Blocks },
  { href: "/prices", label: "Live Prices", icon: LineChart },
  { href: "/simulator", label: "Simulator", icon: Code },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              A
            </div>
            <span className="font-bold text-lg tracking-tight">Builder Pods</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {children}
      </main>

      <footer className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 py-8 px-4 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm font-medium text-foreground">
              Arbitrum Builder Pods
            </p>
            <p className="text-sm text-muted-foreground">
              Submitted by Akshay Yogesh Naphade
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub: https://github.com/akshayasyn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
