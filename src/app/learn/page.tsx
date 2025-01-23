'use client';
import React, {useEffect, useState} from 'react';
import {useSectionStore} from "@/stores/sectionStore";
import {useProtected} from "@/hooks/useProtected";
import {useUserStore} from "@/stores/userStore";
import {getRandomAffirmation} from "@/constants/messages";
import SectionPanel from "@/components/learn/SectionPanel";
import LoadingScreen from "@/components/util/LoadingScreen";
import {useLessonStore} from "@/stores/lessonStore";

const Page = () => {

  const {isCheckingProtection} = useProtected();

  const {sections, getAllSections, isSearchingSections} = useSectionStore();
  const {fetchCompletedLessons, isLoadingCompletedLessons, loadCompletedLessonsError} = useLessonStore();
  const {user} = useUserStore();

  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const [affirmation] = useState<string>(getRandomAffirmation());

  // Get all sectiosn on load
  useEffect(() => {
    getAllSections();
    fetchCompletedLessons();
  }, [getAllSections, fetchCompletedLessons]);

  // Check protection
  if (isCheckingProtection || isLoadingCompletedLessons || isSearchingSections) return <LoadingScreen/>

  return (
    <div className="w-full bg-background min-h-screen pt-32 p-16 flex flex-col items-center">
      <h1 className="text-primary font-semibold text-3xl">Welcome back, {user?.firstName}!</h1>
      <h2 className="mt-2">{affirmation}</h2>
      <hr className="w-full border my-4"/>

      {!loadCompletedLessonsError && sections && (
        <div className={"w-full flex flex-col gap-4 items-center"}>
          {sections && sections.map((section) => (
            <SectionPanel key={section.id} section={section} currentSection={currentSection}
                          setCurrentSection={setCurrentSection}/>
          ))}
        </div>
      )}
      {(!sections || loadCompletedLessonsError) && (
        <div className="w-full flex flex-col gap-4 items-center">
          <p className="text-red-600 font-semibold text-xl">
            Something went wrong, try again later.
          </p>
        </div>
      )}

    </div>
  );
};

export default Page;