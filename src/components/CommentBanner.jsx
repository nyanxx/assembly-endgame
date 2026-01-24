import { goodByes } from "../assets/goodByes";
export default function CommentBanner(props) {
  const gameLoss = props.proLanData.count === 8;

  const backgroundColor = gameLoss
    ? "#BA2A2A"
    : props.gameWon
      ? "#10A95B"
      : "#7A5EA7";

  const display =
    !props.gameOver && props.proLanData.count === 0 ? "none" : "flex";

  function getPhrase() {
    try {
      const deadName =
        props.proLanData.count &&
        props.proLanData.data[props.proLanData.count - 1].name;
      return goodByes[Math.floor(Math.random() * 12)].replace(
        "##LANG##",
        deadName,
      );
    } catch (error) {
      console.error(error);
    }
  }

  const farewell = getPhrase();
  return (
    <div
      className="comment"
      style={{ backgroundColor: backgroundColor, display: display }}
    >
      {gameLoss && (
        <>
          <span>Game Over!</span>
          <span>You lose! Better start learning Assembly 😭</span>
        </>
      )}
      {props.gameWon && (
        <>
          <span>You Win!</span>
          <span>Well done!🎉</span>
        </>
      )}
      {props.proLanData.count && !props.gameOver && farewell}
    </div>
  );
}
