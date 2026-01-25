// import { clsx } from "clsx";

export default function Alphabet(props) {
  function handleAlphabetClick() {
    props.addGuessedLetter(props.alphabet);
    if (!props.isGuessed) {
      props.alphabetDisplayToggle(props.alphabet);
      props.killLanguageChip(props.alphabet);
    }
  }

  const style = props.isGuessed
    ? props.isCorrect
      ? { backgroundColor: "#10A95B" }
      : { backgroundColor: "#EC5D49" }
    : {};

  return (
    <button
      onClick={handleAlphabetClick}
      type="button"
      className="alphabet-button"
      style={style}
    >
      {props.alphabet}
    </button>
  );
}
