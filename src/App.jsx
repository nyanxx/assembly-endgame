import { useState } from "react";
import ReactConfetti from "react-confetti";
import Alphabet from "./components/Alphabet";
import GameStatus from "./components/GameStatus";
import ProgrammingLanguage from "./components/ProgrammingLanguage";
import programmingLanguagesData from "./assets/programmingLanguagesData";
import { getWord, createWordProperty } from "./utils/utils";

export default function App() {
  /*
   * Goal: Allow the user to start guessing the letters
   *
   * Challenge: Update the keyboard when a letter is right
   * or wrong.
   *
   * Bonus: use the `clsx` package to easily add conditional
   * classNames to the keys of the keyboard. Check the docs
   * to learn how to use it 📖
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

  const wordDisplay = wordProperty.map((obj, index) => (
    <div key={index} className="alphabet">
      {!obj.isHidden && obj.letter}
    </div>
  ));

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

  const [languageProperty, setLanguageProperty] = useState(() => ({
    count: 0,
    data: programmingLanguagesData,
  }));

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

  // All languages dies except assembly
  const gameLoss = languageProperty.count >= languageProperty.data.length - 1;

  // All letters from word are not hidden anymore
  const gameWon =
    wordProperty.filter((obj) => obj.isHidden === true).length === 0;
  const gameOver = gameLoss || gameWon;

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
