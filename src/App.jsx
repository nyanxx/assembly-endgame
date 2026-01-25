import { useState } from "react";
import ReactConfetti from "react-confetti";
import Alphabet from "./components/Alphabet";
import GameStatus from "./components/GameStatus";
import ProgrammingLanguage from "./components/ProgrammingLanguage";
import programmingLanguagesData from "./assets/programmingLanguagesData";
import { getWord, getAlphabets } from "./utils/utils";

export default function App() {
  /**
   * Assembly Endgame - Save the guessed letters
   * Goal: Allow the user to start guessing the letters
   *
   * Challenge: Create a new array in state to hold user's
   * guessed letters. When the user chooses a letter, add
   * that letter to this state array.
   *
   * Don't worry about whether it was a right or wrong
   * guess yet.
   */

  const [guessedLetters, setGuessedLetters] = useState([]);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevArray) => {
      return prevArray.includes(letter) ? prevArray : [...prevArray, letter];
    });
  }
  // console.log(guessedLetters);

  const [wordProperty, setWordProperty] = useState(() => getWord());

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

  /** Getting Array of object with alphabet and active status (for virtual keybord) */
  const [alphabetProperty, setAlphabetProperty] = useState(() =>
    getAlphabets(),
  );

  function killLanguage(match) {
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

  /** Helper function for modifing virtual keybord button */
  function modifyAlphabetProperty(char) {
    const match = wordProperty
      .map((obj) => obj.letter)
      .join("")
      .includes(char);

    killLanguage(match);

    setAlphabetProperty((prevArray) => {
      return prevArray.map((obj) => {
        return obj.alphabet === char
          ? {
              ...obj,
              isActive: false,
              match: match,
            }
          : obj;
      });
    });
  }

  const alphabets = alphabetProperty.map((obj) => {
    return (
      <Alphabet
        key={obj.alphabet}
        alphabet={obj.alphabet}
        isActive={obj.isActive}
        match={obj.match}
        alphabetDisplayToggle={alphabetDisplayToggle}
        modifyAlphabetData={modifyAlphabetProperty}
        addGuessedLetter={addGuessedLetter}
      />
    );
  });

  function startNewGame() {
    setWordProperty(getWord());
    setLanguageProperty({ count: 0, data: programmingLanguagesData });
    setAlphabetProperty(getAlphabets());
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
      <section
        className={`keyboard`}
        // className={`v-keyboard ${gameOver && "not-allowed"}`}
        // style={gameOver && { cursor: "not-allowed" }}
        // inert={gameOver}
      >
        {alphabets}
      </section>
      {gameWon && <ReactConfetti />}

      {gameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
