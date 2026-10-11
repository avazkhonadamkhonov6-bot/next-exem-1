'use client';

import React, { useState } from 'react';
import { useDeleteImgMutation, useDeleteTodoMutation, useGetTodoQuery } from "@/api/todo";
import { Button } from "@/components/ui/button";
import { AddDialog } from "@/components/AddDialog";
import { AddImgDialog } from "@/components/AddImgDialog";
import { EditDialog } from "@/components/EditDialog";
import { Link } from "@/i18n/navigation";
import { IData } from "@/types/todo";
import {
  Plus,
  Trash2,
  Edit3,
  ImagePlus,
  Eye,
  CheckCircle2,
  Clock,
  Package,
  Layers,
  ImageOff,
} from "lucide-react";

export default function ProductsPage() {
  const { data, refetch, isLoading } = useGetTodoQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [deleteImg] = useDeleteImgMutation();

  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [openI, setOpenI] = useState(false);

  const [name, setName] = useState('');
  const [idI, setIdI] = useState<number | null>(null);
  const [idx, setIdx] = useState<number | string>('');
  const [selectedTodo, setSelectedTodo] = useState<IData | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id).unwrap();
      await refetch();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDeleteImg = async (id: number) => {
    try {
      await deleteImg(id).unwrap();
      await refetch();
    } catch (err) {
      console.error('Delete image error:', err);
    }
  };

  const handleEdit = (todoItem: IData) => {
    setOpenE(true);
    setName(todoItem.name);
    setIdx(todoItem.id);
    setSelectedTodo(todoItem);
  };

  const handleAddImgClick = (id: number) => {
    setIdI(id);
    setOpenI(true);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 mb-2">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Management & Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Рӯйхати маҳсулотҳо (Products)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Идоракунии маҳсулотҳо бо RTK Query: илова, таҳрир, несткунӣ ва аксҳо
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Иловаи маҳсулот</span>
        </Button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-3xl p-6 border border-slate-200/80 animate-pulse space-y-4">
              <div className="h-40 bg-slate-100 rounded-2xl" />
              <div className="h-5 bg-slate-100 rounded-md w-3/4" />
              <div className="h-4 bg-slate-100 rounded-md w-1/2" />
            </div>
          ))}
        </div>
      ) : (!data?.data || data.data.length === 0) ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200/90 shadow-xs text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Ягон маҳсулот нест</h3>
          <p className="text-sm text-slate-500 mt-1 mb-5">
            Аввалин маҳсулотро бо тугмаи «Иловаи маҳсулот» сабт кунед.
          </p>
          <Button onClick={() => setOpen(true)} className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1.5" />
            Иловаи маҳсулот
          </Button>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Image Gallery Thumbnails */}
                {item.images && item.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    {item.images.slice(0, 3).map((img) => (
                      <div
                        key={img.id}
                        className="relative rounded-xl overflow-hidden aspect-square bg-white border border-slate-200/80 group/img shadow-2xs"
                      >
                        <img
                          src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImg(img.id)}
                          title="Нест кардани расм"
                          className="absolute top-1 right-1 w-6 h-6 rounded-lg bg-black/60 hover:bg-red-600 text-white flex items-center justify-center text-xs opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-32 mb-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-1.5">
                    <ImageOff className="w-6 h-6 text-slate-300" />
                    <span className="text-xs">Расм надорад</span>
                  </div>
                )}

                {/* Status Pill & ID */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    #{item.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      item.isCompleted
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {item.isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>Inactive</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Name & Description */}
                <h2 className="text-lg font-bold text-slate-900 tracking-tight line-clamp-1 mb-1">
                  {item.name}
                </h2>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {item.description || "Тавсиф дода нашудааст."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-1.5 flex-wrap">
                <Link
                  href={`/praducts/${item.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Info</span>
                </Link>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddImgClick(item.id)}
                    className="h-8 px-2.5 rounded-xl text-xs text-slate-600 hover:text-blue-600"
                    title="Иловаи расм"
                  >
                    <ImagePlus className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="h-8 px-2.5 rounded-xl text-xs text-slate-600 hover:text-indigo-600"
                    title="Таҳрир"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 px-2.5 rounded-xl text-xs text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                    title="Нест кардан"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AddDialog open={open} setOpen={setOpen} />
      <AddImgDialog open={openI} setOpen={setOpenI} todoId={idI} />
      <EditDialog
        open={openE}
        setOpen={setOpenE}
        todo={selectedTodo}
        name={name}
        id={idx}
      />
    </div>
  );
}
