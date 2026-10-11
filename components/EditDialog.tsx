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
import { useEditTodoMutation } from "@/api/todo"
import { IData } from "@/types/todo"
import { Loader2, Edit3 } from "lucide-react"

interface EditDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  todo?: IData | null
  name?: string
  id?: number | string
  phone?: string
  setName?: (name: string) => void
  setPhone?: (phone: string) => void
}

function EditForm({
  setOpen,
  todo,
  propName,
  propId,
}: {
  setOpen: (open: boolean) => void
  todo?: IData | null
  propName?: string
  propId?: number | string
}) {
  const [editTodo, { isLoading }] = useEditTodoMutation()
  const [name, setName] = useState(todo?.name || propName || '')
  const [description, setDescription] = useState(todo?.description || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const targetId = todo?.id ?? Number(propId)
    try {
      await editTodo({
        id: targetId,
        name,
        description,
      }).unwrap()
      setOpen(false)
    } catch (err) {
      console.error('Хатогӣ ҳангоми таҳрир:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <div className="flex items-center gap-2 mb-1">
          <DialogTitle className="text-lg font-bold text-slate-900">Таҳрири вазифа (Edit Todo)</DialogTitle>
        </div>
      </DialogHeader>

      <FieldGroup className="space-y-3">
        <Field>
          <Label htmlFor="edit-name" className="text-xs font-semibold text-slate-700">Ном</Label>
          <Input
            id="edit-name"
            required
            placeholder="Номи вазифа..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border-slate-200"
          />
        </Field>

        <Field>
          <Label htmlFor="edit-desc" className="text-xs font-semibold text-slate-700">Тавсиф</Label>
          <Input
            id="edit-desc"
            required
            placeholder="Маълумот дар бораи вазифа..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl border-slate-200"
          />
        </Field>
      </FieldGroup>

      <DialogFooter >
        <Button type="button" variant="outline" className="rounded-xl" onClick={() => setOpen(false)}>
          Бекор кардан
        </Button>
        <Button type="submit" disabled={isLoading} className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
          Сабт кардан
        </Button>
      </DialogFooter>
    </form>
  )
}

export function EditDialog({ open, setOpen, todo, name: propName, id: propId }: EditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        {open && (
          <EditForm
            key={todo?.id ?? String(propId)}
            setOpen={setOpen}
            todo={todo}
            propName={propName}
            propId={propId}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
