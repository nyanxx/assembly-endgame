import type { JSX } from "react"

type NewGameButtonProps = {
    isGameOver: boolean
    startNewGame: () => void
}

export default function NewGameButton(props: NewGameButtonProps): JSX.Element | null {
    if (!props.isGameOver) {
        return null
    } else {
        return <button
            onClick={props.startNewGame}
            className="w-57 h-10 bg-[#11b5e5] text-white dark:text-[#1e1e1e] rounded-sm text-[16px] p-2.25 mb-18.25 font-bold cursor-pointer hover:bg-[#1498c0] transition ease-in-out duration-150 absolute -bottom-23"
        >
            New Game
        </button >
    }
}