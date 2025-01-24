'use client';
import React, {useEffect, useState} from 'react';

import {useParams, useRouter} from "next/navigation";
import {useProtected} from "@/hooks/useProtected";
import {useSectionStore} from "@/stores/sectionStore";
import LoadingScreen from "@/components/util/LoadingScreen";
import {AnimatePresence, motion} from 'framer-motion';
import SentenceFormingQuestion from "@/components/SentenceFormingQuestion";
import  {Word} from "@/types/Types";
import {useLessonStore} from "@/stores/lessonStore";
import toast from "react-hot-toast";

const Page = () => {

  const { isCheckingProtection } = useProtected();

  const { sectionId, lessonId } = useParams();
  const [sectionIdNum] = useState<number | null>(typeof sectionId === "string" ? parseInt(sectionId) : null);
  const [lessonIdNum] = useState<number | null>(typeof lessonId === "string" ? parseInt(lessonId) : null);

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const router = useRouter();

  const { questions, isLoadingQuestions, fetchQuestions, fetchQuestionsError, setFetchQuestionsError, handleIncorrectQuestion } = useSectionStore();
  const { isCheckingAnswers, checkAnswers, resetUserAnswers, addToUserAnswers } = useLessonStore();

  // Fetch questions on load
  useEffect(() => {
    const handleLoadQuestions = () => {
      if (lessonIdNum && sectionIdNum) {
        fetchQuestions(sectionIdNum, lessonIdNum);
        resetUserAnswers();
      } else {
        setFetchQuestionsError("Invalid URL. sectionId or lessonId invalid.");
      }
    }

    handleLoadQuestions();

  }, [fetchQuestions, sectionId, lessonId]);


  const nextQuestion = async (isCorrect: boolean, answer: Word[]) => {
    // This condition check is important, because if the question is incorrect we just want to move it to the end of the stack
    // If we do that, the index will stay the same, so we don't have to increment the currentQuestion.
    if (!isCorrect) {
      handleIncorrectQuestion(questions[currentQuestion]);
      return;
    }

    // add answer to the userAnswers array
    const newUserAnswer = { questionId: questions[currentQuestion].id, answer: answer };
    await addToUserAnswers(newUserAnswer);

    // Check if at last question
    if (currentQuestion === questions.length - 1) {
      if (lessonIdNum && sectionIdNum) {
        // Check answers
        const answersValid = await checkAnswers(sectionIdNum, lessonIdNum);

        // Correct answers,
        if (answersValid) {
          toast.success("Lesson Complete");
          router.push(`/learn?sectionId=${sectionIdNum}`);
          return;
        }
      } else {
        // Should only reach this step if a true bug happens or the user is experimenting outside UI
        toast.error("Something went wrong");
        return;
      }
    }
    // Increment if not the last question
    else {
      setCurrentQuestion(prev => prev + 1);
    }
  }


  // Conditional Returns
  if (isCheckingProtection || isLoadingQuestions || isCheckingAnswers) return <LoadingScreen />
  if (fetchQuestionsError) return <DisplayError errorMessage={fetchQuestionsError} />
  if (!questions) return <DisplayError errorMessage={"Questions not found"} />

  return (
    <div className="w-full h-screen pt-16 flex items-center justify-center flex-col">

      {/* Progress Bar */}
      <div className="w-[40rem] rounded-full bg-white h-6 my-4 shadow-xl overflow-hidden">
        <div
          className={`h-full bg-accent duration-700`}
          style={{
            width: `${(currentQuestion / questions.length) * 100}%`
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .5 }}
        className="w-[40rem] bg-white shadow-xl rounded h-[40rem] p-4"
      >
        <AnimatePresence initial={false}>
          {/* Sentence Forming Type */}
          {questions[currentQuestion].type === "sentence-forming" &&
              <SentenceFormingQuestion question={questions[currentQuestion]} nextQuestion={nextQuestion} />
          }

          {/*  TODO: Add Sentence Typing and Image Choice */}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default Page;

const DisplayError = ({errorMessage}: {
  errorMessage: string;
}) => {

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h2 className="text-primary text-lg font-semibold">Something went wrong</h2>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}