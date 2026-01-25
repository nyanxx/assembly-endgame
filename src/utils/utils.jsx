import words from "../assets/random50Words";

function getWord() {
  const word = words[Math.floor(Math.random() * words.length)];
  console.log("Got a word:", word);
  return word.toUpperCase();
}

function createWordProperty(word) {
  return Array.from(word).map((letter) => {
    return {
      letter: letter.toUpperCase(),
      isHidden: true,
    };
  });
}

export { getWord, createWordProperty };
