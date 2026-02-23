import type { JSX } from "react";
import type { Language } from "../assets/languages";

type ChipProps = {
  obj: Language
  lost: boolean
}

export default function Chip(props: ChipProps): JSX.Element {
  return (
    <div
      className="chip"
      style={{
        backgroundColor: props.obj.backgroundColor,
        color: props.obj.fontColor,
      }}
    >
      {props.lost ? (
        <div className="lost">{props.obj.name}</div>
      ) : (
        props.obj.name
      )}
    </div>
  );
}
