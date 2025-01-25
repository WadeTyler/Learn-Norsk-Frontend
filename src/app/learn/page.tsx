'use client';
import React, {useEffect, useState} from 'react';
import {useSectionStore} from "@/stores/sectionStore";
import {useProtected} from "@/hooks/useProtected";
import {useUserStore} from "@/stores/userStore";
import {getRandomAffirmation} from "@/constants/messages";
import SectionPanel from "@/components/learn/SectionPanel";
import LoadingScreen from "@/components/util/LoadingScreen";
import {useLessonStore} from "@/stores/lessonStore";
import {useSearchParams} from "next/navigation";

const Page = () => {

  // Protection
  const {isCheckingProtection} = useProtected();

  // Store data
  const {sections, getAllSections, isSearchingSections} = useSectionStore();
  const {fetchCompletedLessons, isLoadingCompletedLessons, loadCompletedLessonsError, completedLessons} = useLessonStore();
  const {user} = useUserStore();

  // Navigation
  const searchParams = useSearchParams();

  // States
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const [affirmation] = useState<string>(getRandomAffirmation());

  // Get all sections on load
  useEffect(() => {
    if (user) {
      getAllSections();
      fetchCompletedLessons();
    }
  }, [getAllSections, fetchCompletedLessons, user]);

  useEffect(() => {
    if (sections) {
      const sectionIdStr = searchParams.get("sectionId");
      if (typeof sectionIdStr === "string") {
        setCurrentSection(parseInt(sectionIdStr));
        scrollToSection(parseInt(sectionIdStr));
      }
    }

  }, [sections]);

  function scrollToSection(sectionId: number) {
    const sectionElement = document.getElementById(`section-${sectionId}`);

    if (sectionElement) {
      // Scroll so the section is in the middle of the screen
      sectionElement.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }

  const totalLessons = sections.reduce((total, section) => total += section.lessons.length, 0);
  const totalProgress = Math.floor((completedLessons.length/totalLessons) * 100);


  // Check Loading fields
  if (isCheckingProtection || isLoadingCompletedLessons || isSearchingSections || !user) return <LoadingScreen/>

  return (
    <div className="w-full bg-background min-h-screen pt-32 p-16 flex flex-col items-center">
      <h1 className="text-primary font-semibold text-3xl">Welcome back, {user?.firstName}!</h1>
      <h2 className="mt-2">{affirmation}</h2>

      <p className="mt-2 mb-1">Total Completion</p>
      <div className="w-[35rem] h-4 rounded-full bg-white shadow-xl overflow-hidden">
        <div className="bg-accent h-full duration-300" style={{
          width: `${totalProgress}%`
        }} />
      </div>

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