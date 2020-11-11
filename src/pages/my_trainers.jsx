import { gql, useQuery } from "@apollo/client";
import React from "react";
import Note from "../components/note";
import ReuseableCard from "../components/reuseable_card";

const MY_TRAINERS = gql`
  query {
    myTrainers {
      trainer {
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
  }
`;

function MyTrainers() {
  const { data, error, loading } = useQuery(MY_TRAINERS);

  if (loading) return <div className="center">Loading...</div>;
  if (error)
    return (
      <div className="center">
        <h6>{error.message}</h6>
      </div>
    );
  const { myTrainers } = data;

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
            button1="Report"
            button2="Rehire "
          />
        );
      })}
    </div>
  );
}

export default MyTrainers;
