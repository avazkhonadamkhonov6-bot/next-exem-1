'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { useAddImgMutation } from "@/api/todo"
import { Loader2, ImagePlus, UploadCloud } from "lucide-react"

interface AddImgDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  todoId: number | null
}

export function AddImgDialog({ open, setOpen, todoId }: AddImgDialogProps) {
  const [addImg, { isLoading }] = useAddImgMutation()
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!todoId || !file) return

    const formData = new FormData()
    formData.append('Images', file)

    try {
      await addImg({ todoId, formData }).unwrap()
      setFile(null)
      setOpen(false)
    } catch (err) {
      console.error('Хатогӣ ҳангоми иловаи расм:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <ImagePlus className="w-4 h-4" />
              </div>
              <DialogTitle className="text-lg font-bold text-slate-900">Иловаи расм ба вазифа</DialogTitle>
            </div>
          </DialogHeader>

          <FieldGroup className="space-y-3">
            <Field>
              <Label htmlFor="upload-img-input" className="text-xs font-semibold text-slate-700">Интихоби расм</Label>
              <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center">
                <UploadCloud className="w-7 h-7 text-slate-400 mb-1" />
                <p className="text-xs text-slate-500 mb-3">Расмро интихоб кунед</p>
                <input
                  id="upload-img-input"
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
              </div>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-5 gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>
              Бекор кардан
            </Button>
            <Button type="submit" disabled={isLoading || !file} className="rounded-xl bg-blue-600 hover:bg-blue-700">
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
              Боргузорӣ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
