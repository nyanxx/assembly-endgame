import type { JSX } from "react";
import { clsx } from "clsx";


type KeyboardProps = {
    currentWord: string
    guessedLetters: string[]
    addGuessedLetter: (letter: string) => void
    isGameOver: boolean
}

export default function Keyboard(props: KeyboardProps): JSX.Element {
    const alphabets: string[] = Array.from({ length: 26 }).map((_, i): string => String.fromCharCode(65 + i))
    const alphabetsElements: JSX.Element[] = alphabets.map((letter: string): JSX.Element => {
        const isGuessed: boolean = props.guessedLetters.includes(letter);
        const isCorrect: boolean = isGuessed && props.currentWord.includes(letter);
        const isWrong: boolean = isGuessed && !props.currentWord.includes(letter);

        function handleAlphabetClick(): void {
            props.addGuessedLetter(letter);
        }

        const className: string = clsx(
            // {
            //     "bg-[#10a95b]": isCorrect,
            //     "bg-[#ec5d49]": isWrong,
            //     "cursor-not-allowed opacity-[0.5]": props.isGameOver,
            // },
            [
                !isCorrect && !isWrong && "bg-[#fcba29]",
                isCorrect && "bg-[#10a95b]",
                isWrong && "bg-[#ec5d49]",
                props.isGameOver ? "cursor-not-allowed opacity-[0.5]" : "cursor-pointer",
                // (index === 21) && "col-start-2",
                // (index === 20) && "md:col-start-3",
            ]
        );

        return (
            <button
                key={letter}
                onClick={handleAlphabetClick}
                type="button"
                disabled={props.isGameOver}
                className={`border-2 border-solid border-[#d7d7d7] rounded-sm text-[16px] font-semibold w-10 h-10 ${className}`}
                aria-disabled={isGuessed}
                aria-label={`Letter ${letter}`}
            >
                {letter}
            </button>
        );
    });

    return (
        //  grid-cols-7 md:grid-cols-10
        <section className="flex w-88 md:w-120 flex-wrap justify-center gap-3 md:gap-2 my-9 mx-auto">
            {alphabetsElements}
        </section>
    )
}