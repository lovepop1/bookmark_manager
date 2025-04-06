import type { Bookmark } from "@/types/bookmark"
import { BookmarkCard } from "./bookmark-card"

interface BookmarkListProps {
  bookmarks: Bookmark[]
  onDeleteBookmark: (id: string) => void
  onEditBookmark: (bookmark: Bookmark) => void
}

export function BookmarkList({ bookmarks, onDeleteBookmark, onEditBookmark }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 text-center border">
        <p className="text-muted-foreground">No bookmarks found. Add some bookmarks to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Bookmarks</h2>
      <div className="grid gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onDelete={onDeleteBookmark}
            onEdit={() => onEditBookmark(bookmark)}
          />
        ))}
      </div>
    </div>
  )
}
