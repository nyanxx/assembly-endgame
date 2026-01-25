import { useState } from "react";
import ReactConfetti from "react-confetti";
import Alphabet from "./components/Alphabet";
import GameStatus from "./components/GameStatus";
import ProgrammingLanguage from "./components/ProgrammingLanguage";
import programmingLanguagesData from "./assets/programmingLanguagesData";
import { getWord, createWordProperty } from "./utils/utils";
import clsx from "clsx";

export default function App() {
  /**
   * Assembly Endgame - Only display correctly guessed letters in word
   * Goal: Allow the user to start guessing the letters
   *
   * Challenge: Only display the correctly-guessed letters
   * in the word
   */

  const [currentWord, setCurrentWord] = useState(() => getWord());

  const [guessedLetters, setGuessedLetters] = useState([]);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevArray) => {
      return prevArray.includes(letter) ? prevArray : [...prevArray, letter];
    });
  }

  const [wordProperty, setWordProperty] = useState(() =>
    createWordProperty(currentWord),
  );

  // const wordDisplay = wordProperty.map((obj, index) => (
  //   <div key={index} className="alphabet">
  //     {!obj.isHidden && obj.letter}
  //   </div>
  // ));

  const [languageProperty, setLanguageProperty] = useState(() => ({
    count: 0,
    data: programmingLanguagesData,
  }));

  // All languages dies except assembly
  const gameLoss = languageProperty.count >= languageProperty.data.length - 1;

  // All letters from word are not hidden anymore
  const gameWon =
    wordProperty.filter((obj) => obj.isHidden === true).length === 0;
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

  function alphabetDisplayToggle(x) {
    setWordProperty((prevArray) => {
      return prevArray.map((obj) => {
        if (obj.letter === x) {
          return { ...obj, isHidden: false };
        } else {
          return obj;
        }
      });
    });
  }

  const languageElements = languageProperty.data.map((obj) => {
    return <ProgrammingLanguage key={obj.name} obj={obj} />;
  });

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
          alphabetDisplayToggle={alphabetDisplayToggle}
          killLanguageChip={killLanguageChip}
          addGuessedLetter={addGuessedLetter}
        />
      );
    });

  function startNewGame() {
    setCurrentWord(getWord());
    setWordProperty(createWordProperty(currentWord));
    setLanguageProperty({ count: 0, data: programmingLanguagesData });
    setGuessedLetters([]);
  }

  isGameOver(gameOver);
  function isGameOver(status) {
    if (status) {
      if (gameLoss) {
        console.log("Game Loss");
      } else {
        console.log("Game Won");
      }
    }
  }

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
