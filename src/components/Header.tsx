import type { JSX } from "react";

export default function Header(): JSX.Element {
    return (
        <header>
            <h1 className="heading">Assembly: Endgame</h1>
            <p className="sub-heading">
                Guess the word in under 8 attempts to keep the programming world safe
                from Assembly!
            </p>
        </header>
    )
}