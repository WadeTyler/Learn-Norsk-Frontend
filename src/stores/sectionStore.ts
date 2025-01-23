import {create} from "zustand";
import axios from "@/lib/axios";
import {Question, Section} from "@/types/Types";

interface SectionStore {

  total: null | number;
  fetchTotal: () => Promise<void>;

  sections: Section[];
  isSearchingSections: boolean;
  searchSectionsById: (id: number) => Promise<void>;
  getAllSections: () => Promise<void>;

  newSection: Section | null;
  isCreatingSection: boolean;
  createSectionError: string;
  createSection: (title: string, sectionNumber: number, experienceReward: number, lessonIds: number[]) => Promise<void>;

  isDeletingSection: boolean;
  deleteSectionSuccess: string;
  deleteSectionError: string;
  deleteSection: (id: number) => Promise<void>;

  questions: Question[];
  isLoadingQuestions: boolean;
  fetchQuestionsError: string;
  setFetchQuestionsError: (message: string) => void;
  fetchQuestions: (sectionId: number, lessonId: number) => Promise<void>;

  handleIncorrectQuestion: (question: Question) => void;
}

export const useSectionStore = create<SectionStore>((set, get) => ({
  sections: [],

  total: null,
  fetchTotal: async () => {
    try {
      const response = await axios.get("/sections/total");
      set({ total: response.data });
    } catch (e) {
      console.log(e.response?.data || "Failed to fetch total sections");
    }
  },

  isSearchingSections: false,
  searchSectionsById: async (id) => {
    try {
      const response = await axios.get(`/sections/${id}`);
      set({ sections: [response.data] });
    } catch (e) {
      console.log(e.response?.data || "Section not found");
      set({ sections: [] });
    }
  },

  getAllSections: async () => {
    try {
      set({ isSearchingSections: true });
      const response = await axios.get("/sections");
      console.log(response.data);
      set({ sections: response.data, isSearchingSections: false });
    } catch (e) {
      console.log(e.response?.data || "Failed to get all sections");
      set({ sections: [], isSearchingSections: false });
    }
  },


  newSection: null,
  isCreatingSection: false,
  createSectionError: "",
  createSection: async (title, sectionNumber, experienceReward, lessonIds) => {
    try {
      set({ isCreatingSection: true, newSection: null });
      const response = await axios.post("/sections", { title, sectionNumber, experienceReward, lessonIds });
      set({ newSection: response.data, isCreatingSection: false });
      get().fetchTotal();
    } catch (e) {
      set({ createSectionError: e.response?.data || "Failed to create section", isCreatingSection: false });
    }
  },

  isDeletingSection: false,
  deleteSectionError: "",
  deleteSectionSuccess: "",

  deleteSection: async (id) => {
    try {
      set({ isDeletingSection: true, deleteSectionError: "", deleteSectionSuccess: "" });
      const response = await axios.delete(`/sections/${id}`);
      set({ deleteSectionSuccess: response.data, isDeletingSection: false });
      get().fetchTotal();
    } catch (e) {
      set({ deleteSectionError: e.response?.data || "Failed to delete section", isDeletingSection: false });
    }
},

  questions: [],
  isLoadingQuestions: true,
  fetchQuestionsError: "",
  setFetchQuestionsError: (message) => {
    set({ fetchQuestionsError: message, isLoadingQuestions: false });
  },
  fetchQuestions: async (sectionId, lessonId) => {
    try {
      set({ questions: [], isLoadingQuestions: true, fetchQuestionsError: "" });
      const response = await axios.get(`/sections/${sectionId}/lessons/${lessonId}/questions`);
      set({ questions: response.data, isLoadingQuestions: false });
      console.log(response.data);
    } catch (e) {
      set({ fetchQuestionsError: e.response?.data || "Failed to load questions.", isLoadingQuestions: false });
    }
  },

  handleIncorrectQuestion: (question) => {
    const newQuestions = get().questions.filter(q => q.id !== question.id);
    newQuestions.push(question);
    set({ questions: newQuestions });
  }

}))