import axios from '@/lib/axios';
import { create } from 'zustand';
import {Word} from "@/types/Types";
import toast from "react-hot-toast";

interface WordStore {
  words: Word[];
  loading: boolean;
  existingWords: Word[];
  addWords: (words: Word[]) => Promise<void>;
  addWordsError: string;
}

export const useWordStore = create<WordStore>((set, get) => ({
  words: [],
  loading: false,
  existingWords: [],
  addWordsError: "",

  addWords: async (words: Word[]) => {
    try {
      set({ loading: true });
      const response = await axios.post("/words", words);
      toast.success("Words added successfully.");
      console.log("Words added successfully:", response.data);

      set({ existingWords: [] });
      set({ addWordsError: "" });

    } catch (error: any) {
      set({ addWordsError: error.response?.data?.message || "Failed to add words." });

      if (error.response?.data?.existingWords) {
        set({ existingWords: error.response.data.existingWords });
      }

    } finally {
      set({ loading: false });
    }
  }

}))