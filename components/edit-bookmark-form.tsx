"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Bookmark } from "@/types/bookmark"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditBookmarkFormProps {
  bookmark: Bookmark
  onSave: (updated: Bookmark) => void
  onCancel: () => void
}

const categories = ["Work", "Personal", "Education", "Entertainment", "Finance"]

export function EditBookmarkForm({ bookmark, onSave, onCancel }: EditBookmarkFormProps) {
  const [title, setTitle] = useState(bookmark.title)
  const [url, setUrl] = useState(bookmark.url)
  const [category, setCategory] = useState(bookmark.category)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...bookmark, title, url, category })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />

      <div>
        <Label htmlFor="category" className="mb-1 block">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
