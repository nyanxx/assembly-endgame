import { useState } from "react";
import ReactConfetti from "react-confetti";
import Alphabet from "./components/Alphabet";
import GameStatus from "./components/GameStatus";
import LanguageChip from "./components/LanguageChip";
import programmingLanguagesData from "./assets/programmingLanguagesData";
import { getWord } from "./utils/utils";
import clsx from "clsx";

export default function App() {
  /**
   * Assembly Endgame - Lost languages
   * Goal: Add in the incorrect guesses mechanism to the game
   *
   * Challenge: When mapping over the languages, determine how
   * many of them have been "lost" and add the "lost" class if
   * so.
   *
   * Hint: use the wrongGuessCount combined with the index of
   * the item in the array while inside the languages.map code
   */

  // State values
  const [currentWord, setCurrentWord] = useState(() => getWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [languageProperty, setLanguageProperty] = useState(() => ({
    count: 0,
    data: programmingLanguagesData,
  }));

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  // const gameLoss = languageProperty.count >= languageProperty.data.length - 1; // All languages dies except assembly
  const gameLoss = wrongGuessCount == 8;

  const gameWon =
    new Set(currentWord.split("")).size ===
    guessedLetters.filter((letter) => currentWord.includes(letter)).length;
  // guessedLetter don't have redundant letters so on words like MOON it have only MON

  const gameOver = gameLoss || gameWon;

  const wordDisplay = currentWord.split("").map((letter, index) => {
    const className = clsx({
      alphabet: true,
      lost: gameLoss,
    });
    return (
      <div key={index} className={className}>
        {guessedLetters.includes(letter) ? letter : ""}
      </div>
    );
  });

  const languageElements = languageProperty.data.map((obj, index) => {
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
          killLanguageChip={killLanguageChip}
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

  function killLanguageChip(char) {
    const match = currentWord.includes(char);
    !match &&
      setLanguageProperty((prevObj) => {
        return {
          count: prevObj.count + 1,
          data: prevObj.data.map((obj, index) => {
            if (index === prevObj.count) {
              return { ...obj, isAlive: false };
            } else {
              return obj;
            }
          }),
        };
      });
  }

  function startNewGame() {
    setCurrentWord(getWord());
    setLanguageProperty({ count: 0, data: programmingLanguagesData });
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
        proLanData={languageProperty}
        gameOver={gameOver}
        gameWon={gameWon}
      />
      <section className="language-chips">{languageElements}</section>
      <section className="word">{wordDisplay}</section>
      <section className={`keyboard`}>{alphabets}</section>

      {gameWon && <ReactConfetti />}
      {gameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
