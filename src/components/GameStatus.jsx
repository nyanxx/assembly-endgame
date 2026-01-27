import { getFarewellText } from "../utils/utils";

export default function GameStatus(props) {
  const backgroundColor = props.isGameLost
    ? "#BA2A2A"
    : props.isGameWon
      ? "#10A95B"
      : "#7A5EA7";

  function decideDisplay() {
    if (!props.isGameOver) {
      if (!props.wrongGuessCount) {
        return "none";
      }

      if (props.isRecentLetterCorrect) {
        return "none";
      } else {
        return "flex";
      }
    }
  }

  const display = decideDisplay();
  // !props.isGameOver && props.wrongGuessCount === 0 ? "none" : "flex";

  // !props.isGameOver &&
  // props.wrongGuessCount !== 0 &&
  // props.isRecentLetterCorrect
  //   ? "none"
  //   : "flex";

  const farewell = getFarewellText(
    props.wrongGuessCount &&
      props.wrongGuessCount < 9 &&
      props.languages[props.wrongGuessCount - 1].name,
  );

  return (
    <section className="status-container">
      <div
        className="game-status"
        style={{ backgroundColor: backgroundColor, display: display }}
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
