import type { JSX } from "react";
import type { Language } from "../assets/languages";

type AriaLiveSectionProps = {
    isRecentLetterCorrect: boolean
    recentLetter: string
    languages: Language[]
    wrongGuessCount: number
    currentWord: string
    guessedLetters: string[]
}

export default function AriaLiveSection(props: AriaLiveSectionProps): JSX.Element {
    return (
        //  Combined visually-hidden aria-live region for status updates 
        <section className="sr-only" aria-live="polite" role="status">
            <p>
                {props.isRecentLetterCorrect
                    ? `Correct! The letter ${props.recentLetter} is in the word.`
                    : `Sorry, the letter ${props.recentLetter} is not in the word.`}
                You have {props.languages.length - 1 - props.wrongGuessCount} attempts left.
            </p>
            <p>
                Current word:
                {props.currentWord
                    .split("")
                    .map((letter: string): string =>
                        props.guessedLetters.includes(letter) ? letter + "." : "blank.",
                    )
                    .join(" ")}
            </p>
        </section>
    )
}