import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { getToken } from "../../utils/authorization";
import { Redirect, useHistory } from "react-router-dom";
import Chipbox from "../chipbox";

function Interests(props) {
  const [className, setclassName] = useState("");
  const [interests, setInterests] = useState([]);
  const [addInterests, { data, error, loading }] = useMutation(INTEREST_QUERY);

  console.log(getToken());
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // await addInterests({
      //   variables: { interests: interests },
      // });
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation { 
              addInterests(interests: ${JSON.stringify(interests)}) 
            }`,
        }),
      };
      await fetch("http://localhost:4000/", requestOptions);

      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
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
      {loading ? (
        <button className="fullWidth">Loading</button>
      ) : (
        <button className="fullWidth" onClick={handleClick}>
          NEXT
        </button>
      )}

      {error ? (
        <React.Fragment>
          <div className="spacing-1"></div>
          <p style={{ fontSize: "1.5rem", color: "red" }}>{error.message}</p>
          <div className="spacing-1"></div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="spacing-2"></div>
        </React.Fragment>
      )}

      <div className="spacing-2"></div>
    </div>
  );
}

const INTEREST_QUERY = gql`
  mutation Interests($interests: [String]) {
    addInterests(interests: $interests)
  }
`;

export default Interests;
