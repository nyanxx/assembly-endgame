import type { JSX } from "react";
import { getFarewellText } from "../utils/utils";
import type { Language } from "../assets/languages";

type GameStatusProps = {
  wrongGuessCount: number,
  languages: Language[],
  isGameOver: boolean,
  isGameLost: boolean,
  isGameWon: boolean,
  isRecentLetterCorrect: boolean
}

export default function GameStatus(props: GameStatusProps): JSX.Element {

  const backgroundColor: string = props.isGameLost
    ? "#BA2A2A"
    : props.isGameWon
      ? "#10A95B"
      : "#7A5EA7";

  function decideDisplay(): "flex" | "none" {
    if (!props.isGameOver) {
      if (!props.wrongGuessCount) {
        return "none";
      }
      if (props.isRecentLetterCorrect) {
        return "none";
      } else {
        return "flex";
      }
    } else {
      return "flex"
    }
  }

  const display = decideDisplay();
  const languageName = props.wrongGuessCount && props.wrongGuessCount < 9 && props.languages[props.wrongGuessCount - 1].name
  const farewell: string | null = (languageName) ? getFarewellText(languageName) : null;

  return (
    <section className="status-container" aria-live="polite" role="status">
      <div
        className="game-status"
        style={{
          backgroundColor: backgroundColor,
          display: display,
          fontStyle:
            !props.isGameOver && !props.isRecentLetterCorrect
              ? "italic"
              : "normal",
        }}
      >
        {props.isGameLost && (
          <>
            <h2>Game Over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )}
        {props.isGameWon && (
          <>
            <h2>You Win!</h2>
            <p>Well done!🎉</p>
          </>
        )}
        {!props.isGameOver && !props.isRecentLetterCorrect && farewell}
      </div>
    </section>
  );
}
