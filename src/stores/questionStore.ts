import { create } from 'zustand';
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import {Question} from "@/types/Types";

interface QuestionStore {
  isCreatingQuestion: boolean;
  createQuestionError: string;
  createQuestion: (
    title: string,
    type: string,
    options: string,
    answer: string
  ) => Promise<void>;
  newQuestion: Question | null;

  total: number | null;
  fetchTotal: () => Promise<void>;

  isSearchingForQuestion: boolean;
  questions: Question[];
  searchForQuestion: (query: string) => Promise<void>;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  // Variables
  isCreatingQuestion: false,
  createQuestionError: "",
  newQuestion: null,

  total: null,

  isSearchingForQuestion: false,
  questions: [],

  // Functions
  searchForQuestion: async (query: string) => {
    try {
      set({ isSearchingForQuestion: true });
      const response = await axios.get(`/questions/search?query=${query}`);
      set({ questions: response.data, isSearchingForQuestion: false });
    } catch (e) {
      console.log(e.response.data || "Failed to search for questions.");
      set({ questions: [], isSearchingForQuestion: false });
    }
  },

  fetchTotal: async () => {
    try {
      const response = await axios.get("/questions/total");
      set({ total: response.data });
    } catch (e) {
      console.log(e.response.data || "Failed to fetch total.");
      set({ total: null });
    }
  },

  createQuestion: async (title, type, options, answer) => {
    try {
      set({ isCreatingQuestion: true, createQuestionError: "", newQuestion: null });
      const response = await axios.post("/questions", {
        title, type, options, answer
      });
      toast.success("Question created successfully.");
      console.log("Question created successfully:", response.data);
      set({ isCreatingQuestion: false, newQuestion: response.data });
    } catch (e) {
      set({ isCreatingQuestion: false, createQuestionError: e.response?.data || "Failed to create question." });
    }
  }
}))