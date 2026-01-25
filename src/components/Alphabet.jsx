import { clsx } from "clsx";

export default function Alphabet(props) {
  function handleAlphabetClick() {
    props.addGuessedLetter(props.alphabet);
    if (props.isActive) {
      props.alphabetDisplayToggle(props.alphabet);
      props.modifyAlphabetData(props.alphabet);
    }
  }

  let style = !props.isActive
    ? props.currentWord.includes(props.alphabet)
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
