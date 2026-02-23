import type { JSX } from "react";
import ReactConfetti from "react-confetti";

export default function ConfettiContainer(props: { isGameWon: boolean }): JSX.Element | null {
    return (
        props.isGameWon ? <ReactConfetti recycle={false} numberOfPieces={1000} /> : null
    )
}