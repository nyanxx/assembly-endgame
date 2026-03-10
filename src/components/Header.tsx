import type { JSX } from "react";

export default function Header(): JSX.Element {
    return (
        <header className="text-center max-w-88">
            <h1 className="md:mt-18.25 md:max-w-63.2 dark:text-white text-[20px] font-medium">Assembly: Endgame</h1>
            <p className="mt-1 mx-auto text-[#5c5b58] dark:text-[#8b8274] text-[14px] font-medium">
                Guess the word in under 8 attempts to keep the programming world safe
                from Assembly!
            </p>
        </header>
    )
}