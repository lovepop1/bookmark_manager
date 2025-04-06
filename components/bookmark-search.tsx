"use client"
import { Input } from "@/components/ui/input"

interface BookmarkSearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function BookmarkSearch({ searchQuery, onSearchChange }: BookmarkSearchProps) {
  return (
    <Input
      type="text"
      placeholder="Search bookmarks..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  )
}
