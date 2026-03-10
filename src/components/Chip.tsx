import type { JSX } from "react";
import type { Language } from "../assets/languages";

type ChipProps = {
  obj: Language
  lost: boolean
}

export default function Chip(props: ChipProps): JSX.Element {
  return (
    <div
      className="text-[12px] rounded-[3px] p-[4.5px] relative m-[0.1px]"
      style={{
        backgroundColor: props.obj.backgroundColor,
        color: props.obj.fontColor,
      }}
    >
      {props.lost ? (
        <div className="chip-lost">{props.obj.name}</div>
      ) : (
        props.obj.name
      )}
    </div>
  );
}
