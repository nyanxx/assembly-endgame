import { goodByes } from "../assets/goodByes";

export default function GameStatus(props) {
  const backgroundColor = props.isGameLost
    ? "#BA2A2A"
    : props.isGameWon
      ? "#10A95B"
      : "#7A5EA7";

  const display =
    !props.isGameOver && props.wrongGuessCount === 0 ? "none" : "flex";

  const farewell = getPhrase();

  function getPhrase() {
    try {
      const deadName =
        props.wrongGuessCount &&
        props.wrongGuessCount < 9 &&
        props.languages[props.wrongGuessCount - 1].name;
      return goodByes[Math.floor(Math.random() * 12)].replace(
        "##LANG##",
        deadName,
      );
    } catch (error) {
      console.error(error);
    }
  }

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
        {!props.isGameOver && props.wrongGuessCount && farewell}
      </div>
    </section>
  );
}
