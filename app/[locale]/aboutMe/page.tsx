"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Calendar,
  GraduationCap,
  Code2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Mail,
  Award,
} from "lucide-react";

export default function AboutMe() {
  const t = useTranslations("AboutMe");

  const skills = [
    { name: "React 19", level: "Frontend Core", bg: "bg-cyan-500/10 text-cyan-600 border-cyan-200" },
    { name: "Next.js 16", level: "App Router & SSR", bg: "bg-slate-900/10 text-slate-800 border-slate-300" },
    { name: "TypeScript", level: "Type Safety", bg: "bg-blue-500/10 text-blue-600 border-blue-200" },
    { name: "Redux Toolkit", level: "RTK Query & State", bg: "bg-purple-500/10 text-purple-600 border-purple-200" },
    { name: "Tailwind CSS", level: "Modern Responsive UI", bg: "bg-teal-500/10 text-teal-600 border-teal-200" },
    { name: "next-intl", level: "Multilingual i18n", bg: "bg-indigo-500/10 text-indigo-600 border-indigo-200" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Banner Header */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t("badge")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1 max-w-xl">
            {t("subtitle")}
          </p>
        </div>

        <Link
          href="/praducts"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/20 transition-all hover:gap-3"
        >
          <span>{t("projectsBtn")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
        <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        </div>

        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-100 flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
                  AA
                </div>
              </div>
              <div className="mt-2 sm:mt-0">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {t("name")}
                  </h2>
                  <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                </div>
                <p className="text-sm font-semibold text-indigo-600 mt-0.5">
                  {t("role")}
                </p>
                <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t("status")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {/* Birth Date */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t("birthDateLabel")}
                </p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">
                  {t("birthDateValue")}
                </p>
              </div>
            </div>

            {/* Current Course */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t("courseLabel")}
                </p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">
                  {t("courseValue")}
                </p>
              </div>
            </div>

            {/* Academy */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {t("academyLabel")}
                </p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">
                  {t("academyValue")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Two-Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Bio & Objectives */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t("bioTitle")}
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {t("bioText")}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t("skillsTitle")}:
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Next.js
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                React
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                TypeScript
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">
                RTK Query
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Stack & Highlights */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t("skillsTitle")}
            </h3>
          </div>

          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-slate-800">
                    {skill.name}
                  </span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${skill.bg}`}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
