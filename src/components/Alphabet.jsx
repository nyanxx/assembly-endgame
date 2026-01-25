import { clsx } from "clsx";

export default function Alphabet(props) {
  function handleAlphabetClick() {
    props.addGuessedLetter(props.alphabet);
    if (!props.isGuessed) {
      props.alphabetDisplayToggle(props.alphabet);
      props.killLanguageChip(props.alphabet);
    }
  }

  const className = clsx({
    correct: props.isCorrect,
    // wrong: props.isGuessed && !props.isCorrect,
    wrong: props.isWrong,
  });

  return (
    <button onClick={handleAlphabetClick} type="button" className={className}>
      {props.alphabet}
    </button>
  );
}
