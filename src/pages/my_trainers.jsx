import { gql, useMutation, useQuery } from "@apollo/client";
import { isSelectionNode } from "graphql";
import React, { useState } from "react";
import Note from "../components/note";
import ReuseableCard from "../components/reuseable_card";

const MY_TRAINERS = gql`
  query {
    myTrainers {
      trainer {
        trainerId
        name
        bio
        images
        category
      }
      forPlan {
        title
        type
      }
    }
    myReportedTrainers
  }
`;

const REPORT = gql`
  mutation Report($trainerId: String){
    reportTrainer(
      trainerId: $trainerId
    )
  }
`;

function MyTrainers() {
  const { data, error, loading } = useQuery(MY_TRAINERS);
  const [ report ] = useMutation(REPORT);

  if (loading) return <div className="center">Loading...</div>;
  if (error)
    return (
      <div className="center">
        <h6>{error.message}</h6>
      </div>
    );
  const { myTrainers, myReportedTrainers } = data;
  
  function handleReport(trainer){
    report({variables:{trainerId: trainer.trainerId}});
    window.location.reload();
  }

  return (
    <div className="padded-container">
      {/* //NOTE */}
      <Note note="Note* - If you hire the same trainer next time then it will increase there fitconnect rating as they are able to meet there customers requirements" />

      {myTrainers.map((t) => {
        const { trainer, forPlan } = t;
        {
          /* //YOUR_TRAINERS */
        }
        return (
          <ReuseableCard
            className="mb3"
            title={trainer.name}
            chipText={trainer.category}
            image={
              trainer.images[0] ??
              "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80"
            }
            heading1={`You hired him for ${forPlan.type} course on ${trainer.category}`}
            description={trainer.bio}
            button1={myReportedTrainers.includes(trainer.trainerId) ? "" : "Report"}
            onButton1Click={()=>{
              handleReport(trainer);
            }}
            button2="Rehire "
            onButton2Click={()=>{
              window.location.replace(`/trainer/${trainer.trainerId}`)
            }}
          />
        );
      })}
    </div>
  );
}

export default MyTrainers;
