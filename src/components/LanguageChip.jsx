export default function LanguageChip(props) {
  return (
    <div
      key={props.obj.name}
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

// return (
//   <div
//     key={props.obj.name}
//     className="pl-name"
//     style={{
//       backgroundColor: props.obj.backgroundColor,
//       color: props.obj.fontColor,
//     }}
//   >
//     {props.obj.isAlive ? (
//       props.obj.name
//     ) : (
//       <div className="lost">{props.obj.name}</div>
//     )}
//   </div>
// );
