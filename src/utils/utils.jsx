import words from "../assets/random50Words";

function getWord() {
  const word = words[Math.floor(Math.random() * words.length)];
  console.log("Got a word:", word);
  return Array.from(word).map((letter) => {
    return {
      letter: letter.toUpperCase(),
      isHidden: true,
    };
  });
}

function getAlphabets() {
  return Array.from({ length: 26 }).map((_, i) => {
    return {
      alphabet: String.fromCharCode(65 + i),
      isActive: true,
      match: false,
    };
  });
}

export { getWord, getAlphabets };
