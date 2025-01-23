import {create} from "zustand";
import axios from "@/lib/axios";
import {Section} from "@/types/Types";

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
      const response = await axios.get("/sections");
      console.log(response.data);
      set({ sections: response.data });
    } catch (e) {
      console.log(e.response?.data || "Failed to get all sections");
      set({ sections: [] });
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
}

}))