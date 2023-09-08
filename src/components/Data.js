export default function Data(props) {
  return (
    <div>
      <h1>I am an H1 title</h1>
      <p>I am an paragraph </p>
      <h1>{props.title}</h1>
    </div>
  );
}

Data.defaultProps = {
  title: "I am the default",
};
