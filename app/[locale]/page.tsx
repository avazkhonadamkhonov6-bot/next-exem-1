"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Package, User, Sparkles, ArrowRight, CheckCircle2, Zap, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-6 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span>{t("badge")}</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl leading-tight sm:leading-tight">
        {t("title")}
      </h1>

      {/* Description */}
      <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
        {t("description")}
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
        <Link
          href="/praducts"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Package className="w-4 h-4" />
          <span>{t("exploreBtn")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/aboutMe"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-sm border border-slate-200/90 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <User className="w-4 h-4 text-slate-500" />
          <span>{t("aboutBtn")}</span>
        </Link>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full text-left">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">RTK Query & CRUD</h3>
          <p className="text-xs text-slate-500 mt-1">Full state management with live API integration and instant cache sync.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">3 Languages Supported</h3>
          <p className="text-xs text-slate-500 mt-1">English, Russian and Tajik localization with next-intl and auto-routing.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Tailwind CSS & Shadcn</h3>
          <p className="text-xs text-slate-500 mt-1">Modern UI components, clean typography, responsive design and dialogs.</p>
        </div>
      </div>
    </div>
  );
}
