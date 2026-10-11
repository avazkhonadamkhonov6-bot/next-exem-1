"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { useGetTodoByidQuery } from "@/api/todo";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, CheckCircle2, Clock, ImageOff, Sparkles } from "lucide-react";

function ProductDetailContent() {
  const params = useParams();
  const rawId = Array.isArray(params?.praductId) ? params?.praductId[0] : params?.praductId;
  const { data, isLoading, isError } = useGetTodoByidQuery(rawId);
  const item = data?.data;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/praducts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ба рӯйхати маҳсулотҳо (Back to list)</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-slate-500">Маълумот боргирӣ шуда истодааст...</p>
        </div>
      ) : isError || !item ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200/90 shadow-sm text-center">
          <p className="text-base font-semibold text-red-500">Маълумот ёфт нашуд ё хатогӣ рух дод.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-2">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>ID: #{item.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {item.name}
              </h1>
            </div>

            <div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  item.isCompleted
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {item.isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Фаъол (Active)</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5" />
                    <span>Ғайрифаъол (Inactive)</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Тавсиф (Description)
              </h3>
              <p className="text-base text-slate-700 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                {item.description || "Тавсиф надорад."}
              </p>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Расмҳо (Gallery)
              </h3>
              {item.images && item.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {item.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative rounded-2xl overflow-hidden border border-slate-200/90 aspect-square bg-slate-50 shadow-xs group"
                    >
                      <img
                        src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-slate-50 text-slate-400 text-sm border border-slate-100">
                  <ImageOff className="w-4 h-4" />
                  <span>Расмҳо мавҷуд нестанд</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto py-10 px-4 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-500">Боргирӣ...</p>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
