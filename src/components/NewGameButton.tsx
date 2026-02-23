import type { JSX } from "react"

type NewGameButtonProps = {
    isGameOver: boolean
    startNewGame: () => void
}

export default function NewGameButton(props: NewGameButtonProps): JSX.Element | null {
    if (!props.isGameOver) {
        return null
    } else {
        return <button onClick={props.startNewGame} className="new-game" > New Game</button >
    }
}