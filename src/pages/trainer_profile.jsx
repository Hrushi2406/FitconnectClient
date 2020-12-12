import React, { useState } from "react";
import "../css/pages/trainer_profile.css";
import Chip from "../components/chip.jsx";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Dialog from "../components/dialog";

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

const subscribe = gql`
  mutation Subscribe($price: Int, $type: String, $planId: String) {
    subscribe(price: $price, duration: $type, planId: $planId)
  }
`;

function TrainerProfile() {
  const trainerId = useParams().id;
  const { loading, error, data } = useQuery(QUERY, {
    variables: { trainerId },
  });
  const [openDialog, setopenDialog] = useState(false);
  const [selectedPlan, setselectedPlan] = useState(null);

  const [subscribePlan, sub] = useMutation(subscribe);

  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center">{error}</div>;

  const { trainer } = data;

  const handleSubscription = () => {
    console.log(selectedPlan);
    subscribePlan({
      variables: {
        price: selectedPlan.price,
        type: selectedPlan.type,
        planId: selectedPlan.planId,
      },
    });

    setopenDialog(false);
  };

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

            {/* PERSONAL INFO */}
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

            {/* BUTTON */}
            <button className="mt3 fullWidth" onClick={()=>window.location.replace('/')}>Get directions in map</button>
          </div>
        </div>
        {/* COURSES */}
        <div className="mt5">
          {/* HEADING */}
          <div className="spaced-between mb4">
            <h5>Courses</h5>
            <Chip text="Workout" background="secondary-light" />
          </div>

          {/* Dialog */}
          <Dialog open={openDialog} onClose={() => setopenDialog(false)}>
            <div
              className="clickable"
              onClick={() => setopenDialog(false)}
            ></div>
            {trainer === null ? (
              ""
            ) : (
              <div className="dialog-box pt3 pb3 pl3 pr3">
                <h4 className=" mr1">Subscribe</h4>

                {selectedPlan === null ? (
                  ""
                ) : (
                  <h6 className="mt2 mb2">
                    To Trainer {trainer.name} for a {selectedPlan.type} course
                    of price ₹{selectedPlan.price}
                  </h6>
                )}

                <div className="spaced-between fullWidth mt3">
                  <button
                    className="fullWidth secondary-btn"
                    onClick={() => setopenDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="fullWidth"
                    onClick={() => handleSubscription()}
                  >
                    Pay & Subscribe
                  </button>
                </div>
              </div>
            )}
          </Dialog>

          {/* LIST OF Course */}
          {trainer.plans.map((plan) => (
            <ListTile
              key={plan.planId}
              title={plan.title}
              type={plan.type}
              price={plan.price}
              onSelect={() => {
                setselectedPlan(plan);
                setopenDialog(true);
              }}
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
