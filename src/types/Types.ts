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
