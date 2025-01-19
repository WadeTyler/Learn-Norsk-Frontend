'use client';
import React, { useState } from 'react';
import {useWordStore} from "@/stores/wordStore";

const WordSearch = () => {

  const { searchForWord, isSearchingForWord, words, searchForWordError } = useWordStore();
  const [userInput, setUserInput] = useState("");

  const handleSearch = () => {

    if (userInput.length === 0) {
      return;
    }

    searchForWord(userInput);
  }

  return (
    <div className="w-[40rem] bg-white p-4 rounded shadow-xl text-zinc-800 flex flex-col items-center rounded gap-4">
      <h1 className="font-semibold text-xl">Search for words</h1>
      <form className="input-bar flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          className="w-full focus:outline-none"
          placeholder="Search by English or Norsk"
          disabled={isSearchingForWord}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className={`submit-btn ${userInput.length === 0 && 'disabled'}`}
          disabled={isSearchingForWord || userInput.length === 0}
        >
          Search
        </button>
      </form>

      {searchForWordError && <p className="text-red-600 font-semibold text-lg">{searchForWordError}</p>}

      {words && words.length > 0 && (
        <div className="w-full flex flex-col gap-2 items-center">
          {words.map((word) => (
            <div className="flex w-full items-center border p-2" key={word.id}>
              <p className="w-1/3">Id: {word.id}</p>
              <p className="w-full">Norsk: {word.norsk}</p>
              <p className="w-full">Eng: {word.eng}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordSearch;