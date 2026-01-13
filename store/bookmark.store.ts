"use client";

import { create } from "zustand";

type BookmarkState = {
  bookmarks: string[]; // classId 배열
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],

  toggle: (id) =>
    set((s) => ({
      bookmarks: s.bookmarks.includes(id)
        ? s.bookmarks.filter((x) => x !== id)
        : [...s.bookmarks, id],
    })),

  has: (id) => get().bookmarks.includes(id),
}));
