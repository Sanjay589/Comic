"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  FolderOpen,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Zap,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const publicLinks: NavLink[] = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#faq", label: "FAQ" },
];

const protectedLinks: NavLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: <FolderOpen className="h-4 w-4" />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    href: "/help",
    label: "Help",
    icon: <HelpCircle className="h-4 w-4" />,
  },
];

interface NavigationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  variant?: "landing" | "app";
}

export function Navigation({
  isAuthenticated = false,
  onLogout,
  variant = "landing",
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMobileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const links = variant === "landing" ? publicLinks : protectedLinks;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || variant === "app"
          ? "bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-600 group-hover:bg-brand-500 transition-colors shadow-lg shadow-brand-600/25">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-100 tracking-tight hidden sm:inline">
              ComicCraft
              <span className="text-brand-400 ml-0.5">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-brand-400 bg-brand-600/10"
                    : "text-surface-400 hover:text-surface-100 hover:bg-dark-hover"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/create">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    New Comic
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onLogout}
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Sparkles className="h-4 w-4" />}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-dark-hover transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-dark-border pb-4 animate-slide-down">
            <div className="flex flex-col gap-1 pt-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-brand-400 bg-brand-600/10"
                      : "text-surface-400 hover:text-surface-100 hover:bg-dark-hover"
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-4 px-3">
              {isAuthenticated ? (
                <>
                  <Link href="/create">
                    <Button
                      variant="primary"
                      className="w-full"
                      leftIcon={<Plus className="h-4 w-4" />}
                    >
                      New Comic
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={onLogout}
                    leftIcon={<LogOut className="h-4 w-4" />}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="secondary" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="primary"
                      className="w-full"
                      leftIcon={<Sparkles className="h-4 w-4" />}
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
