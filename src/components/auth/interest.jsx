import React, { useState } from "react";
import Chipbox from "../chipbox";

function Interests(props) {
  const [className, setclassName] = useState("");
  const [interests, setInterests] = useState([]);

  const addToList = (interest) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    } else if (interests.includes(interest)) {
      const filteredInterests = interests.filter((i) => i !== interest);
      setInterests(filteredInterests);
    }
  };

  return (
    <div className={"add " + className}>
      <h4 className="secondary-dark"> Great, now select your interests</h4>
      <div className="spacing-4"></div>

      <div className="spaced-between">
        <Chipbox
          text="Workout"
          isSelected={interests.includes("Workout")}
          onClick={() => addToList("Workout")}
        />
        <div style={{ width: "2rem" }}></div>
        <Chipbox
          text="Yoga"
          isSelected={interests.includes("Yoga")}
          onClick={() => addToList("Yoga")}
        />
      </div>
      <div className="spacing-2"></div>
      <div className="spaced-between">
        <Chipbox
          text="Meditation"
          isSelected={interests.includes("Meditation")}
          onClick={() => addToList("Meditation")}
        />
        <div style={{ width: "2rem" }}></div>
        <Chipbox
          text="Zumba"
          isSelected={interests.includes("Zumba")}
          onClick={() => addToList("Zumba")}
        />
      </div>

      <div className="spacing-4"></div>
      <button className="fullWidth">Next</button>
      <div className="spacing-2"></div>
    </div>
  );
}

export default Interests;
