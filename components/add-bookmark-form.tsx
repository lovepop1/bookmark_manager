"use client"

import type React from "react"

import { useState } from "react"
import type { Bookmark } from "@/types/bookmark"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AddBookmarkFormProps {
  onAddBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void
}

export function AddBookmarkForm({ onAddBookmark }: AddBookmarkFormProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("")
  const [error, setError] = useState<string | null>(null)

  const categories = ["Work", "Personal", "Education", "Entertainment", "Finance"]

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate inputs
    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (!url.trim()) {
      setError("URL is required")
      return
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (include http:// or https://)")
      return
    }

    if (!category) {
      setError("Please select a category")
      return
    }

    // Add the bookmark
    onAddBookmark({ title, url, category })

    // Reset form
    setTitle("")
    setUrl("")
    setCategory("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Bookmark</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter bookmark title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
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

          <Button type="submit" className="w-full">
            Add Bookmark
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

