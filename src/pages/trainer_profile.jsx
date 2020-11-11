import React from "react";
import "../css/pages/trainer_profile.css";
import Chip from "../components/chip.jsx";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const QUERY = gql`
  query Trainer($trainerId: String!) {
    trainer(trainerId: $trainerId) {
      trainerId
      name
      images
      email
      age
      mobile
      gender
      address
      bio
      fcRating
      plans {
        price
        type
        planId
        title
      }
    }
  }
`;

function TrainerProfile() {
  const trainerId = useParams().id;
  const { loading, error, data } = useQuery(QUERY, {
    variables: { trainerId },
  });

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center">{error}</div>;

  const { trainer } = data;

  return (
    <React.Fragment>
      <div className="padded-container">
        {/* GRID VIEW */}
        <div className="profile-grid">
          {/* IMAGE SECTION */}
          <img
            className="profile-img"
            // src="https://images.unsplash.com/photo-1528720208104-3d9bd03cc9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            src={
              trainer.images[0] ??
              "https://images.unsplash.com/photo-1528720208104-3d9bd03cc9d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            }
            alt="Fitconnect images"
          />

          {/* INFO SECTION */}
          <div>
            {/* HEADING */}
            <div className="spaced-between">
              <h5>{trainer.name}</h5>
              <Chip text={trainer.fcRating} />
            </div>

            {/* SUBTITLE */}
            <h4 className="secondary-dark mt1"> {trainer.category}</h4>

            <p className="mt2 description">{trainer.bio}</p>

            {/* PERSONAL INGO */}
            <div className="container mt4 pl4 pr4 pt3 pb3 secondary-background ">
              <div className="spaced-between mb3">
                <h6>Gender</h6>
                <p>{trainer.gender}</p>
              </div>

              <div className="spaced-between mb3">
                <h6>Age</h6>
                <p>{trainer.age}</p>
              </div>

              <div className="spaced-between mb3">
                <h6>Profession</h6>
                <p>Trainer</p>
              </div>

              <div className="spaced-between mb3">
                <h6>Address</h6>
                <p>{trainer.address}</p>
              </div>

              <div className="spaced-between">
                <h6>Mobile</h6>
                <p>{trainer.mobile}</p>
              </div>
            </div>

            {/* BUTTOn */}
            <button className="mt3 fullWidth">Get directions in map</button>
          </div>
        </div>
        {/* COURSES */}
        <div className="mt5">
          {/* HEADING */}
          <div className="spaced-between mb4">
            <h5>Courses</h5>
            <Chip text="Workout" background="secondary-light" />
          </div>

          {/* LIST OF Course */}
          {trainer.plans.map((plan) => (
            <ListTile
              key={plan.planId}
              title={plan.title}
              type={plan.type}
              price={plan.price}
              onSelect={() => {}}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default TrainerProfile;

function ListTile({ title, type, price, onSelect }) {
  return (
    <div className="list-tile mb4">
      <h6>{title}</h6>
      <div className="spaced-between">
        <p> {type}</p>
        <p>₹ {price}</p>
      </div>

      <div className="select-chip" onClick={onSelect}>
        <Chip text="Select" background="primary-light" />
      </div>
    </div>
  );
}
