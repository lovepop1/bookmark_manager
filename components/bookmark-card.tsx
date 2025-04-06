"use client"

import type { Bookmark } from "@/types/bookmark"
import { Trash2, ExternalLink, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface BookmarkCardProps {
  bookmark: Bookmark
  onDelete: (id: string) => void
  onEdit: () => void
}

export function BookmarkCard({ bookmark, onDelete, onEdit }: BookmarkCardProps) {
  // Format the date to a readable string
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(bookmark.createdAt)

  // Truncate URL if it's too long
  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-semibold text-lg">{bookmark.title}</h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline flex items-center gap-1 mt-1"
            >
              {truncateUrl(bookmark.url)}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <Badge variant="outline">{bookmark.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <span className="text-xs text-muted-foreground">Added on {formattedDate}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(bookmark.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
