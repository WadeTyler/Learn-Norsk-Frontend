import {create} from "zustand";
import axios from "@/lib/axios";
import {Lesson} from "@/types/Types";

interface LessonStore {
  isCreatingLesson: boolean;
  newLesson: Lesson | null;
  createLessonError: string;
  createLesson: (lessonNumber: number, experienceReward: number, questionIds: number[]) => Promise<void>;
  isSearchingLessons: boolean;
  lessons: Lesson[];
  searchLessons: () => Promise<void>;
  searchLessonsById: (id: number) => Promise<void>;
  deleteLesson: (id: number) => Promise<void>;
  isDeletingLesson: boolean;
  deleteLessonError: string;
  deleteLessonSuccess: string;
};

export const useLessonStore = create<LessonStore>((set, get) => ({

  isCreatingLesson: false,
  newLesson: null,
  createLessonError: "",
  createLesson: async (lessonNumber, experienceReward, questionIds) => {
    try {
      set({ isCreatingLesson: true, newLesson: null, createLessonError: "" });
      const response = await axios.post("/lessons", { lessonNumber, experienceReward, questionIds });
      set({ isCreatingLesson: false, newLesson: response.data });
    } catch (e) {
      set({ createLessonError: e.response?.data || "Failed to create lesson", isCreatingLesson: false });
    }
  },


  isSearchingLessons: false,
  lessons: [],
  searchLessons: async () => {
    try {
      set({ isSearchingLessons: true })
      const response = await axios.get("/lessons");
      set({ lessons: response.data });
    } catch (e) {
      set({ lessons: [] });
      console.log(e.response?.data || "Failed to search lessons.");
    } finally {
      set({ isSearchingLessons: false });
    }
  },
  searchLessonsById: async (id) => {
    try {
      set({ isSearchingLessons: true });
      const response = await axios.get(`/lessons/${id}`);
      set({ lessons: [response.data] });
    } catch (e) {
      set({ lessons: [] });
      console.log(e.response?.data || "Failed to search lessons.");
    } finally {}
    set({ isSearchingLessons: false });
  },


  isDeletingLesson: false,
  deleteLessonError: "",
  deleteLessonSuccess: "",
  deleteLesson: async (id) => {
    try {
      set({ isDeletingLesson: true, deleteLessonSuccess: "", deleteLessonError: "" });
      const response = await axios.delete(`/lessons/${id}`);
      set({ isDeletingLesson: false, deleteLessonSuccess: response.data });
  } catch (e) {
    set({ isDeletingLesson: false, deleteLessonError: e.response?.data || "Failed to delete lesson" })};
  },

}))