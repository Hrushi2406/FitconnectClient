import React from "react";

function Note({ className, note }) {
  return (
    <div
      className={
        "primary-light-background secondary-dark p2 note mb3 " + className
      }
    >
      <p>{note}</p>
    </div>
  );
}

export default Note;
