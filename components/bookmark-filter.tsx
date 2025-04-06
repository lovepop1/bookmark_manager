"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface BookmarkFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function BookmarkFilter({ categories, selectedCategory, onSelectCategory }: BookmarkFilterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedCategory} onValueChange={onSelectCategory} className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={`category-${category}`} />
              <Label htmlFor={`category-${category}`} className="capitalize">
                {category === "all" ? "All Bookmarks" : category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

