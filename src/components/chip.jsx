function Chip({ text, background }) {
  if (background == undefined) {
    return (
      <div className="chip primary-background">
        <p> {text}</p>
      </div>
    );
  }
  return (
    <div className={"chip " + background + "-background"}>
      <p> {text}</p>
    </div>
  );
}

export default Chip;
