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

        const className: string = clsx({
            correct: isCorrect,
            wrong: isWrong,
            "disable-keyboard": props.isGameOver,
        });

        return (
            <button
                key={letter}
                onClick={handleAlphabetClick}
                type="button"
                disabled={props.isGameOver}
                className={className}
                aria-disabled={isGuessed}
                aria-label={`Letter ${letter}`}
            >
                {letter}
            </button>
        );
    });

    return (
        <section className={`keyboard`}>
            {alphabetsElements}
        </section>)
}