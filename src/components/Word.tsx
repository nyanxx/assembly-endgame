import type { JSX } from "react";

type WordProps = {
    currentWord: string
    isGameLost: boolean
    guessedLetters: string[]
}

export default function Word(props: WordProps): JSX.Element {



    const alphabet = "flex justify-center items-center dark:bg-[#323232] bg-gray-200 w-10 h-10 border-b-[1.5px] border-b-gray-500 dark:border-b-[#f5deb3]"

    const wordDisplay = props.currentWord.split("").map((letter: string, index: number) => {
        return !props.isGameLost ? (
            <div key={index} className={`${alphabet} text-black dark:text-white`}>
                {props.guessedLetters.includes(letter) ? letter : ""}
            </div>
        ) : (
            <div
                key={index}
                className={`${alphabet} ${!props.guessedLetters.includes(letter) ? "text-[#ec5d49]" : "text-black dark:text-white" }`}
            >
                {letter}
            </div>
        );
    });
    return (
        <section className="flex gap-0.5 mt-9 text-[18px] font-semibold ">{wordDisplay}</section>

    )
} 