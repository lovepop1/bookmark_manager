"use client"

import { useState, useEffect } from "react"
import { BookmarkList } from "@/components/bookmark-list"
import { AddBookmarkForm } from "@/components/add-bookmark-form"
import { BookmarkFilter } from "@/components/bookmark-filter"
import { ThemeToggle } from "@/components/theme-toggle"
import { EditBookmarkForm } from "@/components/edit-bookmark-form"
import { BookmarkSearch } from "@/components/bookmark-search"
import { BookmarkSort } from "@/components/bookmark-sort"
import type { Bookmark } from "@/types/bookmark"
import { v4 as uuidv4 } from "uuid"

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")


  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks")
    if (savedBookmarks) {
      try {
        const parsedBookmarks = JSON.parse(savedBookmarks)
        // Convert string dates back to Date objects
        const bookmarksWithDates = parsedBookmarks.map((bookmark: any) => ({
          ...bookmark,
          createdAt: new Date(bookmark.createdAt),
        }))
        setBookmarks(bookmarksWithDates)
      } catch (error) {
        console.error("Error parsing bookmarks from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    let updated = [...bookmarks]
  
    // Search
    if (searchQuery) {
      updated = updated.filter((b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  
    // Sort
    updated.sort((a, b) => {
      if (sortBy === "newest") return b.createdAt.getTime() - a.createdAt.getTime()
      if (sortBy === "oldest") return a.createdAt.getTime() - b.createdAt.getTime()
      if (sortBy === "az") return a.title.localeCompare(b.title)
      if (sortBy === "za") return b.title.localeCompare(a.title)
      return 0
    })
  
    setFilteredBookmarks(updated)
  }, [selectedCategory, bookmarks, searchQuery, sortBy])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks])

  // Filter bookmarks whenever the selected category or bookmarks change
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredBookmarks(bookmarks)
    } else {
      setFilteredBookmarks(bookmarks.filter((bookmark) => bookmark.category === selectedCategory))
    }
  }, [selectedCategory, bookmarks])

  // Get unique categories from bookmarks
  const categories = ["all", ...new Set(bookmarks.map((bookmark) => bookmark.category))]

  const addBookmark = (bookmark: Omit<Bookmark, "id" | "createdAt">) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: uuidv4(),
      createdAt: new Date(),
    }
    setBookmarks([...bookmarks, newBookmark])
  }

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
  }

  const updateBookmark = (updated: Bookmark) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    )
    setEditingBookmark(null)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Personal Bookmark Manager</h1>
        <ThemeToggle />
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <div className="space-y-6">
          {editingBookmark ? (
            <EditBookmarkForm
              bookmark={editingBookmark}
              onSave={updateBookmark}
              onCancel={() => setEditingBookmark(null)}
            />
          ) : (
            <AddBookmarkForm onAddBookmark={addBookmark} />
          )}
          <BookmarkSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          
          <BookmarkFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <BookmarkSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>
        <BookmarkList
          bookmarks={filteredBookmarks}
          onDeleteBookmark={deleteBookmark}
          onEditBookmark={(b) => setEditingBookmark(b)}
        />
        
      </div>
    </main>
  )
}

