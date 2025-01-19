import axios from '@/lib/axios';
import { create } from 'zustand';
import {Word} from "@/types/Types";
import toast from "react-hot-toast";

interface WordStore {
  words: Word[];
  isAddingWords: boolean;
  existingWords: Word[];
  addWords: (words: Word[]) => Promise<void>;
  addWordsError: string;
  searchForWordError: string;
  searchForWord: (word: string) => Promise<void>;
  isSearchingForWord: boolean;
}

export const useWordStore = create<WordStore>((set, get) => ({
  words: [],
  isAddingWords: false,
  existingWords: [],
  addWordsError: "",
  searchForWordError: "",
  isSearchingForWord: false,

  searchForWord: async (word: string) => {
    try {
      set({ isSearchingForWord: true });

      const response = await axios.get(`/words/search?query=${word}`);
      set({ words: response.data, searchForWordError: "" });
    } catch (error: any | never) {
      set({ searchForWordError: error.response?.data?.message || "Failed to search for words." });
    } finally {
      set({ isSearchingForWord: false });
    }

  },

  addWords: async (words: Word[]) => {
    try {
      set({ isAddingWords: true });
      const response = await axios.post("/words", words);
      toast.success("Words added successfully.");
      console.log("Words added successfully:", response.data);

      set({ existingWords: [] });
      set({ addWordsError: "" });

    } catch (error: any | never) {
      set({ addWordsError: error.response?.data?.message || "Failed to add words." });

      if (error.response?.data?.existingWords) {
        set({ existingWords: error.response.data.existingWords });
      }

    } finally {
      set({ isAddingWords: false });
    }
  }

}))