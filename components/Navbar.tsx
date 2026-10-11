"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import React from "react";
import { CheckSquare, Globe, Sparkles, User, Package } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const handleChangeLang = (newLocale: string) => {
    router.replace(pathname, {
      locale: newLocale,
    });
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                {t("brand")}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60">
                <Sparkles className="w-2.5 h-2.5" /> RTK Query
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium hidden md:block">Next.js App</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/praducts"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive("/praducts")
                ? "bg-blue-50 text-blue-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{t("products")}</span>
          </Link>

          <Link
            href="/aboutMe"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive("/aboutMe")
                ? "bg-indigo-50 text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t("aboutMe")}</span>
          </Link>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-100 border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-xs transition-colors">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <select
              aria-label="Language selection"
              value={locale}
              onChange={(e) => handleChangeLang(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer uppercase text-xs font-bold text-slate-700"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="tj">TJ</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
