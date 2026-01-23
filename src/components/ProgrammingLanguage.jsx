export default function ProgrammingLanguage(props) {
  return (
    <div
      key={props.obj.name}
      className="pl-name"
      style={{
        backgroundColor: props.obj.backgroundColor,
        color: props.obj.fontColor,
      }}
    >
      {props.obj.isAlive ? props.obj.name : <strike>{props.obj.name}</strike>}
    </div>
  );
}
