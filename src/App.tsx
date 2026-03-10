import type { JSX } from "react";
import { useState } from "react";
import { languages } from "./assets/languages";
import AriaLiveSection from "./components/AriaLiveSection";
import ConfettiContainer from "./components/ConfettiContainer";
import GameStatus from "./components/GameStatus";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import LanguageChips from "./components/LanguagesChips";
import NewGameButton from "./components/NewGameButton";
import ThemeToggle from "./components/ToggleTheme";
import Word from "./components/Word";
import { getWord } from "./utils/utils";

export default function App(): JSX.Element {
  // State values
  const [currentWord, setCurrentWord] = useState<string>((): string => getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // Derived values
  const wrongGuessCount: number = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const isGameLost: boolean = wrongGuessCount >= languages.length - 1;
  const isGameWon: boolean = Array.from(currentWord).every((letter) =>
    guessedLetters.includes(letter),
  );
  const isGameOver: boolean = isGameLost || isGameWon;
  const recentLetter: string = guessedLetters[guessedLetters.length - 1];
  const isRecentLetterCorrect: boolean = currentWord.includes(recentLetter);

  // Functions
  function addGuessedLetter(letter: string): void {
    setGuessedLetters((prevArray): string[] => {
      return prevArray.includes(letter) ? prevArray : [...prevArray, letter];
    });
  }

  function startNewGame(): void {
    setCurrentWord(getWord());
    setGuessedLetters([]);
  }

  return (
    <main className="flex flex-col w-full h-full items-center justify-center md:justify-start">
      <ThemeToggle />
      <ConfettiContainer isGameWon={isGameWon} />
      <Header />
      <GameStatus
        wrongGuessCount={wrongGuessCount}
        languages={languages}
        isGameOver={isGameOver}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isRecentLetterCorrect={isRecentLetterCorrect}
      />
      <LanguageChips
        wrongGuessCount={wrongGuessCount}
        languages={languages}
      />
      <Word
        currentWord={currentWord}
        isGameLost={isGameLost}
        guessedLetters={guessedLetters}
      />
      <AriaLiveSection
        isRecentLetterCorrect={isRecentLetterCorrect}
        recentLetter={recentLetter}
        languages={languages}
        wrongGuessCount={wrongGuessCount}
        currentWord={currentWord}
        guessedLetters={guessedLetters}
      />
      <div className="relative flex justify-center">
        <Keyboard
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          addGuessedLetter={addGuessedLetter}
          isGameOver={isGameOver}
        />
        <NewGameButton
          isGameOver={isGameOver}
          startNewGame={startNewGame}
        />
      </div>
    </main>
  );
}
