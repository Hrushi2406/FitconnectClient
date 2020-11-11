import { gql, useMutation, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ListTile from "../../components/list_tile";
import Note from "../../components/note";
import ReuseableCard from "../../components/reuseable_card";

const QUERY = gql`
  query {
    pairingRequests {
      sender {
        userId
        name
        bio
        imageUrl
      }
      forPlan {
        planId
        title
        type
      }
      trainer {
        category
      }
    }
    myPayments {
      trainer {
        name
        category
      }
      forPlan {
        title
        type
        price
      }
    }
  }
`;

const ACCEPT_REQUEST = gql`
  mutation AcceptRequest($senderId: String, $planId: String) {
    acceptRequest(senderId: $senderId, planId: $planId)
  }
`;

const DECLINE_REQUEST = gql`
  mutation DeclineRequest($senderId: String, $planId: String) {
    declineRequest(senderId: $senderId, planId: $planId)
  }
`;

function PaymentsPage() {
  const [a, { data, error, loading }] = useLazyQuery(QUERY);
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const [declineRequest] = useMutation(DECLINE_REQUEST);
  const [dummy, setdummy] = useState("");

  useEffect(async () => {
    a();
  }, [dummy]);

  const handleRequestDecline = async (userId, planId) => {
    try {
      await declineRequest({ variables: { senderId: userId, planId: planId } });
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRequestAccept = async (userId, planId) => {
    try {
      await acceptRequest({ variables: { senderId: userId, planId: planId } });
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  if (error) return <div className="center">{error.message}</div>;
  if (loading) return <div className="center">Loading...</div>;
  if (!data) return <div></div>;

  const { pairingRequests, myPayments } = data;

  return (
    <div className="padded-container">
      {/* //NOTE */}
      <Note
        note=" Note* - The plan will only start once both the users have made the
        payment. You get 10% off on pairing with other user. "
      />

      {/* PAIRING REQUESTS */}
      {pairingRequests.length != 0 ? (
        <div className="">
          <h5 className="mb2">Pairing Requests</h5>
          {pairingRequests.map((request) => {
            const { sender, forPlan, trainer } = request;
            return (
              <ReuseableCard
                key={sender.userId}
                className="mb3"
                title={sender.name}
                chipText="Maps"
                chipBackground="primary"
                image={sender.imageUrl}
                heading1={`Asking you to join for ${forPlan.type} course on ${trainer.category}`}
                description={sender.bio}
                button1="Decline"
                onButton1Click={() =>
                  handleRequestDecline(sender.userId, forPlan.planId)
                }
                button2="Accept"
                onButton2Click={() =>
                  handleRequestAccept(sender.userId, forPlan.planId)
                }
              />
            );
          })}
          <div className="h-divider secondary-special-background mt5 mb3"></div>
        </div>
      ) : (
        <div></div>
      )}

      {/* PAIRING REQUESTS */}
      <div className="mb4">
        <h5 className="mb2">Pending Payments</h5>
        <ReuseableCard
          className="mb3"
          title="Pratik Mundhe"
          chipText="Maps"
          chipBackground="primary"
          heading1="Asking you to join for 5 days course on Meditation"
          description="Hi I am Priyesh Rathi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing lectus faucibus enim libero enim, morbi nibh.Hi I am Priyesh Rathi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing lectus faucibus enim libero enim, morbi nibh.Hi I am Priyesh Rathi Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing lectus faucibus enim libero enim, morbi nibh."
          button1=""
          button2="Pay ₹2500"
        />
        <div className="h-divider secondary-special-background mt5 mb3"></div>
      </div>

      {/* //PREVIOUS PAYMENT ACTIVITIES  */}
      {myPayments.length != 0 ? (
        <div className="mb4 ">
          <h5 className="mb4">Previous Payments</h5>
          {/* //LIST TILE */}
          {myPayments.map((payment, i) => {
            const { forPlan, trainer } = payment;
            return (
              <ListTile
                key={i}
                title={"To " + trainer.name}
                type={forPlan.type + " Course"}
                price={forPlan.price}
                chipText={trainer.category}
                chipBackground="secondary-light"
              />
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PaymentsPage;
