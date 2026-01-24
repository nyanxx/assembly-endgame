import { useState } from "react";
import ReactConfetti from "react-confetti";
import Alphabet from "./components/Alphabet";
import CommentBanner from "./components/CommentBanner";
import ProgrammingLanguage from "./components/ProgrammingLanguage";
import programmingLanguagesData from "./assets/programmingLanguagesData";
import { getWord, getAlphabets } from "./utils/utils";

export default function App() {
  /** Array of object containing each char data or random word */
  const [wordProperty, setWordProperty] = useState(() => getWord());

  /** Word display - above the virtual keyboard */
  const wordDisplay = wordProperty.map((obj, index) => (
    <div key={index} className="alphabet">
      {!obj.isHidden && obj.letter}
    </div>
  ));

  /** Helper function to toggle character (on word display) */
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

  const [proLanData, setProLanData] = useState(() => ({
    count: 0,
    data: programmingLanguagesData,
  }));

  const proLanElements = proLanData.data.map((obj) => {
    return <ProgrammingLanguage key={obj.name} obj={obj} />;
  });

  /** Getting Array of object with alphabet and active status (for virtual keybord) */
  const [alphabetProperty, setAlphabetProperty] = useState(() =>
    getAlphabets(),
  );

  function killLanguage(match) {
    !match &&
      setProLanData((prevObj) => {
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
      />
    );
  });

  function startNewGame() {
    setWordProperty(getWord());
    setProLanData({ count: 0, data: programmingLanguagesData });
    setAlphabetProperty(getAlphabets());
  }

  // All languages dies except assembly
  const gameLoss = proLanData.count >= proLanData.data.length - 1;

  // All letters form word are not hidden anymore
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
        <h2 className="sub-heading">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </h2>
      </header>
      <div className="comment-container">
        <CommentBanner
          proLanData={proLanData}
          gameOver={gameOver}
          gameWon={gameWon}
        />
      </div>
      <div className="programming-languages">{proLanElements}</div>
      <div className="random-name">{wordDisplay}</div>
      <div
        className={`v-keyboard`}
        // className={`v-keyboard ${gameOver && "not-allowed"}`}
        // style={gameOver && { cursor: "not-allowed" }}
        // inert={gameOver}
      >
        {alphabets}
      </div>
      {gameWon && <ReactConfetti />}

      {gameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
