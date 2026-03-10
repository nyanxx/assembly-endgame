import type { JSX } from "react";
import Chip from "./Chip";
import type { Language } from "../assets/languages";

type LanguageChipsProps = {
    wrongGuessCount: number
    languages: Language[]
}

export default function LanguageChips(props: LanguageChipsProps): JSX.Element {
    const languageElements: JSX.Element[] = props.languages.map((obj: Language, index: number): JSX.Element => {
        return (
            <Chip
                key={obj.name}
                obj={obj}
                lost={index < props.wrongGuessCount}
            />
        );
    });
    return (
        <section className="flex justify-center flex-wrap gap-[1.5px] mt-9 w-63.25 font-semibold">{languageElements}</section>

    )
}