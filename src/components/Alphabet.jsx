export default function Alphabet(props) {
  function handleAlphabetClick() {
    if (props.isActive) {
      props.alphabetDisplayToggle(props.alphabet);
      props.modifyAlphabetData(props.alphabet);
    }
  }

  /**
   * if active = yellow
   * if not active
   * is match = green
   * is not match = red
   */

  let style = !props.isActive
    ? props.match
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
