import { useState } from "react";
import ReactConfetti from "react-confetti";
import clsx from "clsx";
import Alphabet from "./components/Alphabet";
import GameStatus from "./components/GameStatus";
import LanguageChip from "./components/LanguageChip";
import languages from "./assets/programmingLanguagesData";
import { getWord } from "./utils/utils";
import programmingLanguagesData from "./assets/programmingLanguagesData";

export default function App() {
  /**
   * Assembly Endgame - Display won/lost status
   *
   * Challenge:
   * Conditionally render either the "won" or "lost" statuses
   * from the design, both the text and the styles, based on the
   * new derived variables.
   *
   * Note: We always want the surrounding `section` to be rendered,
   * so only change the content inside that section. Otherwise the
   * content on the page would jump around a bit too much.
   */

  // State values
  const [currentWord, setCurrentWord] = useState(() => getWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const isGameLost = wrongGuessCount >= programmingLanguagesData.length - 1;

  const isGameWon = Array.from(currentWord).every((letter) =>
    guessedLetters.includes(letter),
  );
  console.log(isGameWon);
  const isGameOver = isGameLost || isGameWon;

  const wordDisplay = currentWord.split("").map((letter, index) => {
    const className = clsx({
      alphabet: true,
      lost: isGameLost,
    });
    return (
      <div key={index} className={className}>
        {guessedLetters.includes(letter) ? letter : ""}
      </div>
    );
  });

  const languageElements = languages.map((obj, index) => {
    return (
      <LanguageChip
        key={obj.name}
        obj={obj}
        // lost={index < wrongGuessCount && !(wrongGuessCount > 8)}
        lost={index < wrongGuessCount}
      />
    );
  });

  const alphabets = Array.from({ length: 26 })
    .map((_, i) => String.fromCharCode(65 + i))
    .map((letter) => {
      const isGuessed = guessedLetters.includes(letter);
      const isCorrect = isGuessed && currentWord.includes(letter);
      const isWrong = isGuessed && !currentWord.includes(letter);

      return (
        <Alphabet
          key={letter}
          alphabet={letter}
          isGuessed={isGuessed}
          isCorrect={isCorrect}
          isWrong={isWrong}
          addGuessedLetter={addGuessedLetter}
        />
      );
    });

  // Functions
  function addGuessedLetter(letter) {
    setGuessedLetters((prevArray) => {
      return prevArray.includes(letter) ? prevArray : [...prevArray, letter];
    });
  }

  function startNewGame() {
    setCurrentWord(getWord());
    setGuessedLetters([]);
  }

  // console.log(currentWord);
  // console.log(languageProperty);
  // console.log(guessedLetters);

  return (
    <main>
      <header>
        <h1 className="heading">Assembly: Endgame</h1>
        <p className="sub-heading">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <GameStatus
        wrongGuessCount={wrongGuessCount}
        languages={languages}
        isGameOver={isGameOver}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
      />
      <section className="language-chips">{languageElements}</section>
      <section className="word">{wordDisplay}</section>
      <section className={`keyboard`}>{alphabets}</section>

      {isGameWon && <ReactConfetti />}
      {isGameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
