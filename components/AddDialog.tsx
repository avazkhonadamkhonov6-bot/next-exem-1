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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAddTodoMutation } from "@/api/todo"
import { Loader2, PlusCircle, UploadCloud } from "lucide-react"

interface AddDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AddDialog({ open, setOpen }: AddDialogProps) {
  const [addTodo, { isLoading }] = useAddTodoMutation()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<FileList | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('Name', name)
    formData.append('Description', description)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('Images', files[i])
      }
    }

    try {
      await addTodo(formData).unwrap()
      setName('')
      setDescription('')
      setFiles(null)
      setOpen(false)
    } catch (err) {
      console.error('Хатогӣ ҳангоми илова кардан:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <DialogTitle className="text-lg font-bold text-slate-900">Иловаи вазифаи нав</DialogTitle>
            </div>
          </DialogHeader>

          <FieldGroup className="space-y-3">
            <Field>
              <Label htmlFor="add-name" className="text-xs font-semibold text-slate-700">Ном</Label>
              <Input
                id="add-name"
                required
                placeholder="Номи вазифа..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-slate-200"
              />
            </Field>

            <Field>
              <Label htmlFor="add-desc" className="text-xs font-semibold text-slate-700">Тавсиф</Label>
              <Input
                id="add-desc"
                required
                placeholder="Маълумот дар бораи вазифа..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl border-slate-200"
              />
            </Field>

            <Field>
                <input
                  id="add-images"
                  type="file"
                  required
                  multiple
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-5 gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>
              Бекор кардан
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-xl bg-blue-600 hover:bg-blue-700">
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
              Сабт кардан
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
