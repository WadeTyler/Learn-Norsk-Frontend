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

}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  // Variables
  isCreatingQuestion: false,
  createQuestionError: "",
  newQuestion: null,

  // Functions
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