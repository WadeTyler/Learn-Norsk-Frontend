export interface Word {
  id?: number;
  norsk: string;
  eng: string;
  image?: string;
}

export interface Question {
  id: number;
  type: "image-choice" | "sentence-forming" | "sentence-typing";
  title: string;
  options?: Word[];
  answer: Word[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  level: number;
  experience: number;
  role: string;
  createdAt: string;
}

export interface Lesson {
  id: number;
  lessonNumber: number;
  experienceReward: number;
  questions?: Question[];
  createdAt: string;
}