import { useState } from "react";
import ReactConfetti from "react-confetti";
import Alphabet from "./components/Alphabet";
import GameStatus from "./components/GameStatus";
import LanguageChip from "./components/LanguageChip";
import languages from "./assets/languages";
import { getWord } from "./utils/utils";

export default function App() {
  /**
   * Backlog:
   *
   * ✅ Farewell messages in status section
   * ✅ Disable the keyboard when the game is over
   * ✅ Fix a11y issues
   * ✅ Choose a random word from a list of word
   * - Make the New Game button reset the game❗
   * - Confetti drop when the user wins❗
   *
   * Assembly Endgame - Choose random word
   * Challenge: Choose a random word from a list of words
   *
   * 1. Create a new function in utils.js that chooses a random
   *    word from the imported array of words and returns it
   * 2. import the function into this file
   * 3. Figure out where to use that function.
   */

  // State values
  const [currentWord, setCurrentWord] = useState(() => getWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const isGameWon = Array.from(currentWord).every((letter) =>
    guessedLetters.includes(letter),
  );
  const isGameOver = isGameLost || isGameWon;

  const wordDisplay = currentWord.split("").map((letter, index) => {
    return !isGameLost ? (
      <div key={index} className={"alphabet"}>
        {guessedLetters.includes(letter) ? letter : ""}
      </div>
    ) : (
      <div
        key={index}
        className={`alphabet ${!guessedLetters.includes(letter) && "lost"}`}
      >
        {letter}
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
          isGameOver={isGameOver}
          addGuessedLetter={addGuessedLetter}
        />
      );
    });

  const recentLetter = guessedLetters[guessedLetters.length - 1];
  const isRecentLetterCorrect = currentWord.includes(recentLetter);

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
        isRecentLetterCorrect={isRecentLetterCorrect}
      />
      <section className="language-chips">{languageElements}</section>

      <section className="word">{wordDisplay}</section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {isRecentLetterCorrect
            ? `Correct! The letter ${recentLetter} is in the word.`
            : `Sorry, the letter ${recentLetter} is not in the word.`}
          You have {languages.length - 1 - wrongGuessCount} attempts left.
        </p>
        <p>
          Current word:
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank.",
            )
            .join(" ")}
        </p>
      </section>

      <section className={`keyboard`} disabled={isGameLost}>
        {alphabets}
      </section>

      {isGameWon && <ReactConfetti />}
      {isGameOver && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
