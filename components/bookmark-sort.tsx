"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

interface BookmarkSortProps {
  sortBy: string
  onSortChange: (value: string) => void
}

export function BookmarkSort({ sortBy, onSortChange }: BookmarkSortProps) {
  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-full md:w-60">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="oldest">Oldest First</SelectItem>
        <SelectItem value="az">Title A-Z</SelectItem>
        <SelectItem value="za">Title Z-A</SelectItem>
      </SelectContent>
    </Select>
  )
}
