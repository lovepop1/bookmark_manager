# 🔖 Bookmark Manager App

A simple and beautiful bookmark manager built with **Next.js**, **TypeScript**, **TailwindCSS**, and **ShadCN UI**. Easily add, edit, delete, sort, and search your bookmarks – all in a sleek and responsive interface.

---

This is a lightweight, client-side bookmark management app with an intuitive UI. It's a fully functional CRUD app with search and sort capabilities. The app is modular, easy to extend, and can be hooked up to a backend like Supabase if needed.

---

## 🚀 Features

- 📌 Add new bookmarks with title, URL, and category
- ✏️ Edit bookmarks in-place with real-time form updates
- 🗑️ Delete bookmarks seamlessly
- 🔍 Search bookmarks by title or URL
- 🗂️ Filter bookmarks by category
- 🔃 Sort bookmarks by:
  - Newest First
  - Oldest First
  - Title A-Z
  - Title Z-A
- 🎨 Clean and consistent UI using ShadCN and TailwindCSS

---

## 🛠 How to Run This Project

1. **Clone the repository**

   git clone https://github.com/lovepop1/bookmark_manager.git
2. **Go to working repository**
3. **Install Dependencies**
   npm install --legacy-peer-deps
   or
   yarn install
4. **Run the development server**
   npm run dev
   or
   yarn dev

## ⚔️ Challenges Faced

- **Hydration mismatches in Next.js**: Had to ensure consistent rendering between the server and client. Learned to avoid dynamic properties during SSR like `Math.random()` or browser-only conditions.
  
- **Dropdown consistency**: Styling a dropdown to match the custom input components from ShadCN required precise use of Tailwind utilities.

- **Managing form state**: Syncing controlled input values with props and handling edit states for multiple bookmarks was a bit tricky but satisfying to solve.

---

## 📚 What I Learned

- How to build **reusable, type-safe components** in a Next.js + TypeScript setup.

- Working with **TailwindCSS utility classes** for polished UI design.

- **Avoiding SSR hydration pitfalls** in Next.js applications.

- Enhancing user experience with better **forms, inputs, and interactions** using ShadCN UI components.

- The importance of **UX details** like dropdowns, form cancel/reset buttons, and focus states.

