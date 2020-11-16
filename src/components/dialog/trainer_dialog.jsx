import React, { useState, useEffect } from "react";

import Chipbox from "../chipbox";
import Dialog from "../dialog";
import Slider from "../slider";
import "../../css/components/trainer_dialog.css";

function TrainerDialog({ openDialog, close, filterInfo, filter }) {
  const [maxDistance, setmaxDistance] = useState(100);
  const [minRating, setminRating] = useState(0);
  const [maxStartPrice, setmaxStartPrice] = useState(100);
  const [maxAge, setmaxAge] = useState(60);

  const [interests, setInterests] = useState([]);

  const [type, settype] = useState("monthly");
  const [gender, setgender] = useState(["Male", "Female"]);
  const [sortBy, setsortBy] = useState("");
  const [order, setorder] = useState("asc");

  const addToList = (interest) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    } else if (interests.includes(interest)) {
      const filteredInterests = interests.filter((i) => i !== interest);
      setInterests(filteredInterests);
    }
  };

  const addGender = (currentgender) => {
    if (!gender.includes(currentgender)) {
      setgender([...gender, currentgender]);
    } else if (gender.includes(currentgender)) {
      const filteredInterests = gender.filter((i) => i !== currentgender);
      setgender(filteredInterests);
    }
  };

  const handleFilter = () => {
    const filters = {
      maxDistance: parseInt(maxDistance),
      minRating: parseInt(minRating),
      maxStartPrice: parseInt(maxStartPrice),
      maxAge: parseInt(maxAge),
      interests,
      gender: gender.length === 2 ? "" : gender[0],
      sortBy,
      order,
    };
    filter(filters);
    close();
  };

  return (
    <Dialog open={openDialog} onClose={close}>
      <div className="clickable" onClick={close}></div>
      <div className="dialog-box pt3 pb3 pl3 pr3">
        <div className="grid-view">
          <div className="">
            <h6 className="pb2">Filters</h6>

            <div className="spacing-2"></div>

            {/* FILTERS */}
            <SliderWithTitle
              header="Max Distance "
              subHeader="(in KM)"
              min={0}
              max={10}
              value={maxDistance}
              onChange={(e) => setmaxDistance(e.target.value)}
            />

            <div className="spacing-2"></div>

            <SliderWithTitle
              header="Min Rating "
              subHeader=""
              min={0}
              max={99}
              value={minRating}
              onChange={(e) => setminRating(e.target.value)}
            />

            <div className="spacing-2"></div>

            <SliderWithTitle
              header="Max Price"
              subHeader="(1 value is  ₹ 100 ) "
              min={0}
              max={99}
              value={maxStartPrice}
              onChange={(e) => setmaxStartPrice(e.target.value)}
            />

            <div className="spacing-2"></div>

            <SliderWithTitle
              header="Max Age"
              subHeader=""
              min={0}
              max={99}
              value={maxAge}
              onChange={(e) => setmaxAge(e.target.value)}
            />

            <div className="spacing-3"></div>

            <div className="spaced-between">
              <Chipbox
                text="Male"
                isSelected={gender.includes("Male")}
                onClick={() => addGender("Male")}
              />
              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Female"
                isSelected={gender.includes("Female")}
                onClick={() => addGender("Female")}
              />
            </div>

            <div className="spacing-2"></div>

            {/* TYPE */}

            <div className="spaced-between">
              <Chipbox
                text="Weekly"
                isSelected={type === "weekly"}
                onClick={() => settype("weekly")}
              />
              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Montly"
                isSelected={type === "monthly"}
                onClick={() => settype("monthly")}
              />
            </div>
          </div>
          <div className="col-6">
            <h6 className="pb2">Sort</h6>

            {/* SORT BY */}
            <div className="spaced-between">
              <Chipbox
                text="Rating"
                isSelected={sortBy === "fcRating"}
                onClick={() => setsortBy("fcRating")}
              />

              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Price"
                isSelected={sortBy === "startPrice"}
                onClick={() => setsortBy("startPrice")}
              />
            </div>

            <div className="spacing-2"></div>

            <div className="spaced-between">
              <Chipbox
                text="Age"
                isSelected={sortBy === "age"}
                onClick={() => setsortBy("age")}
              />

              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Distance"
                isSelected={sortBy === "distance"}
                onClick={() => setsortBy("distance")}
              />
            </div>

            <div className="spacing-2"></div>

            <div className=" fullWidth">
              <Chipbox
                style={{ width: "100%" }}
                text="None"
                isSelected={sortBy === ""}
                onClick={() => setsortBy("")}
              />
            </div>

            <div className="spacing-2"></div>

            {/* ORDER BY */}

            <h6>Order</h6>
            <div className="spacing-2"></div>

            <div className="spaced-between">
              <Chipbox
                text="Ascending"
                isSelected={order === "asc"}
                onClick={() => setorder("asc")}
              />

              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Descending"
                isSelected={order === "desc"}
                onClick={() => setorder("desc")}
              />
            </div>

            {/* CATEGORIES */}

            <div className="spacing-2"></div>
            <h6>Category</h6>
            <div className="spacing-2"></div>

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
          </div>
        </div>

        <div className="spaced-between fullWidth mt3">
          <button className="fullWidth secondary-btn" onClick={close}>
            Cancel
          </button>
          <button className="fullWidth" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default TrainerDialog;

function SliderWithTitle({ header, subHeader, min, max, value, onChange }) {
  return (
    <div>
      <div className="header-div">
        <h6 className="header"> {header} </h6>
        <div style={{ width: "1rem" }}></div>
        <p> {subHeader} </p>
      </div>
      <div className="spacing-1"></div>

      <Slider min={min} max={max} value={value} onChange={onChange} />
    </div>
  );
}
