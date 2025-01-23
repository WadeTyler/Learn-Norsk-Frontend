import React, {SetStateAction} from 'react';
import {Section} from "@/types/Types";
import {IconCheck, IconChevronDown, IconChevronUp} from "@tabler/icons-react";
import {motion, AnimatePresence} from 'framer-motion';
import Link from "next/link";
import {useUserStore} from "@/stores/userStore";
import {useLessonStore} from "@/stores/lessonStore";

const SectionPanel = ({section, currentSection, setCurrentSection}: {
  section: Section;
  currentSection: number | null;
  setCurrentSection: React.Dispatch<SetStateAction<number | null>>;
}) => {

  const {user} = useUserStore();
  const { completedLessons } = useLessonStore();

  const handleSectionClick = () => {
    if (currentSection === section.id) setCurrentSection(null);
    else {
      setCurrentSection(section.id);
    }
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: .5}}
      className="w-[35rem] bg-white rounded shadow-xl flex flex-col p-4">
      <h2
        className="p-2 text-primary font-semibold text-lg flex justify-between items-center group cursor-pointer hover:text-accent duration-300"
        onClick={handleSectionClick}
      >
        <span>{section.sectionNumber} - {section.title}</span>
        {currentSection !== section.id
          ? <span className="group-hover:scale-110 transition-transform duration-300"><IconChevronDown/></span>
          : <span><IconChevronUp/></span>}
      </h2>

      <AnimatePresence initial={false}>
        {currentSection === section.id && (
          <motion.div
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0}}
            transition={{duration: .5, ease: 'easeInOut'}}
            className="w-full overflow-hidden"
          >
            <div className="flex flex-col gap-2 w-full">
              {section.lessons.map((lesson) => {

                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <Link
                    href={`/sections/${section.id}/lessons/${lesson.id}`}
                    className={`w-full flex flex-col gap-1 border-b p-2 last-of-type:border-none group cursor-pointer hover:text-accent`}
                    key={lesson.id}
                  >
                    <div className="w-full flex items-center justify-between">
                      <p className="text-primary group-hover:text-accent duration-300">
                        Lesson {lesson.lessonNumber}
                        <span className="text-foreground group-hover:text-accent duration-300">| {lesson.title}</span>
                      </p>
                      {isCompleted && <IconCheck />}
                    </div>
                    <p className="text-sm group-hover:text-accent duration-300">{lesson.description}</p>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default SectionPanel;