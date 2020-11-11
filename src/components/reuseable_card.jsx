import React from "react";
import "../css/components/reusable_card.css";
import Chip from "./chip";

function ReuseableCard({
  className,
  title,
  chipText,
  chipBackground,
  image,
  heading1,
  description,
  button1,
  onButton1Click,
  button2,
  onButton2Click,
}) {
  return (
    <div className={"main-div fullWidth secondary-background " + className}>
      <img
        className="user-profile-img"
        src={
          image ??
          "https://images.unsplash.com/photo-1506197061617-7f5c0b093236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1005&q=80"
        }
        alt="Profile page image"
      />
      <div className="pr3 pl3 pt2 pb2 ">
        <div className="spaced-between mb1">
          <h4>{title}</h4>
          <Chip
            text={chipText}
            background={chipBackground ?? "secondary-special"}
            on
          />
        </div>

        <h6 className="mb2 line-height">{heading1}</h6>

        <p className="description mb2">{description}</p>

        <div className="spaced-between mt3 ">
          <button
            className="secondary-btn  secondary-background padded-btn"
            onClick={onButton1Click}
          >
            {button1}
          </button>

          <button className="padded-btn" onClick={onButton2Click}>
            {button2}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReuseableCard;
