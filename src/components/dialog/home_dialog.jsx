import React, { useState, useEffect } from "react";

import Chipbox from "../chipbox";
import Dialog from "../dialog";
import Slider from "../slider";
import "../../css/components/trainer_dialog.css";

function HomeDialog({ openDialog, close, filterInfo, filter }) {
  const [minRating, setminRating] = useState(20);
  const [maxStartPrice, setmaxStartPrice] = useState(100);
  const [maxTrainersAge, setmaxTrainersAge] = useState(60);
  const [maxUsersAge, setmaxUsersAge] = useState(60);

  const [interests, setInterests] = useState([]);
  const [category, setCategory] = useState([]);

  const [tGender, settGender] = useState(["Male", "Female"]);
  const [uGender, setuGender] = useState(["Male", "Female"]);

  const addToList = (interest) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    } else if (interests.includes(interest)) {
      const filteredInterests = interests.filter((i) => i !== interest);
      setInterests(filteredInterests);
    }
  };

  const addCategoryList = (interest) => {
    if (!category.includes(interest)) {
      setCategory([...category, interest]);
    } else if (category.includes(interest)) {
      const filteredInterests = category.filter((i) => i !== interest);
      setCategory(filteredInterests);
    }
  };

  const addTGender = (currentgender) => {
    if (!tGender.includes(currentgender)) {
      settGender([...tGender, currentgender]);
    } else if (tGender.includes(currentgender)) {
      const filteredInterests = tGender.filter((i) => i !== currentgender);
      settGender(filteredInterests);
    }
  };

  const addUGender = (currentgender) => {
    if (!uGender.includes(currentgender)) {
      setuGender([...uGender, currentgender]);
    } else if (uGender.includes(currentgender)) {
      const filteredInterests = uGender.filter((i) => i !== currentgender);
      setuGender(filteredInterests);
    }
  };

  const handleFilter = () => {
    const filters = {
      minRating: parseInt(minRating),
      maxPrice: parseInt(maxStartPrice * 100),
      uAge: parseInt(maxUsersAge),
      tAge: parseInt(maxTrainersAge),
      uCategory: interests,
      tCategory: category,
      tGender: tGender.length === 2 ? "" : tGender[0],
      uGender: uGender.length === 2 ? "" : uGender[0],
    };
    filter(filters);
    close();
  };

  return (
    <Dialog open={openDialog} onClose={close} className="z-indexed">
      <div className="clickable" onClick={close}></div>
      <div className="dialog-box pt3 pb3 pl3 pr3">
        <div className="grid-view">
          <div className="">
            <h6 className="pb2">For Trainers</h6>

            <div className="spacing-2"></div>

            {/* FILTERS */}

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
              value={maxTrainersAge}
              onChange={(e) => setmaxTrainersAge(e.target.value)}
            />

            <div className="spacing-3"></div>

            <div className="spaced-between">
              <Chipbox
                text="Male"
                isSelected={tGender.includes("Male")}
                onClick={() => addTGender("Male")}
              />
              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Female"
                isSelected={tGender.includes("Female")}
                onClick={() => addTGender("Female")}
              />
            </div>

            <div className="spacing-2"></div>

            {/* CATEGORIES */}

            <h6>Category</h6>
            <div className="spacing-2"></div>

            <div className="spaced-between">
              <Chipbox
                text="Workout"
                isSelected={category.includes("Workout")}
                onClick={() => addCategoryList("Workout")}
              />
              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Yoga"
                isSelected={category.includes("Yoga")}
                onClick={() => addCategoryList("Yoga")}
              />
            </div>
            <div className="spacing-2"></div>
            <div className="spaced-between">
              <Chipbox
                text="Meditation"
                isSelected={category.includes("Meditation")}
                onClick={() => addCategoryList("Meditation")}
              />
              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Zumba"
                isSelected={category.includes("Zumba")}
                onClick={() => addCategoryList("Zumba")}
              />
            </div>
          </div>
          <div className="col-6">
            <h6 className="pb2">For Users</h6>

            {/* Filters */}

            <SliderWithTitle
              header="Max Age"
              subHeader=""
              min={0}
              max={99}
              value={maxUsersAge}
              onChange={(e) => setmaxUsersAge(e.target.value)}
            />

            <div className="spacing-3"></div>
            {/*Gender */}

            <div className="spaced-between">
              <Chipbox
                text="Male"
                isSelected={uGender.includes("Male")}
                onClick={() => addUGender("Male")}
              />
              <div style={{ width: "2rem" }}></div>
              <Chipbox
                text="Female"
                isSelected={uGender.includes("Female")}
                onClick={() => addUGender("Female")}
              />
            </div>

            {/* CATEGORIES */}

            <div className="spacing-2"></div>
            <h6>Interested In</h6>
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

export default HomeDialog;

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
