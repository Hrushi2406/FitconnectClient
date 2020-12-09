import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Chip from "../components/chip";
import ListTile from "../components/list_tile";
import Dialog from "../components/dialog";
// import "../css/pages/pairing_requests.css";

import "../css/pages/pairing_request.css";
import { gql, useMutation } from "@apollo/client";
// import "../css/pages/pairing_requests.css";

const query = gql`
  mutation SendRequest($receiverId: String, $planId: String) {
    sendRequest(receiverId: $receiverId, planId: $planId)
  }
`;

function PairingRequests() {
  const history = useHistory();
  const [sendRequest, { error, loading, data }] = useMutation(query);
  const {
    data: { trainers, user },
  } = useLocation();
  const [selectedOption, setselectedOption] = useState({
    trainer: null,
    plan: null,
  });

  const handleSendRequest = () => {
    sendRequest({
      variables: {
        receiverId: user.userId,
        planId: selectedOption.plan.planId,
      },
    });
    setopenDialog(false);
  };

  const [openDialog, setopenDialog] = useState(false);
  return (
    <div className="padded-container">
      <div className="mt0">
        {/* HEADING */}
        <div className="mb4">
          <h5 style={{ textAlign: "center" }}>Pick your plan </h5>
        </div>

        {/* LIST OF Trainers */}
        <Dialog open={openDialog} onClose={() => setopenDialog(false)}>
          <div className="clickable" onClick={() => setopenDialog(false)}></div>
          {selectedOption.trainer === null ? (
            ""
          ) : (
            <div className="dialog-box pt3 pb3 pl3 pr3">
              <h4 className=" mr1">Send request to {user.name}</h4>

              <h6 className="mt2 mb2">
                To pair on Trainer {selectedOption.trainer.name} for a{" "}
                {selectedOption.plan.type} course of price ₹
                {selectedOption.plan.price}
              </h6>

              <div className="spaced-between fullWidth mt3">
                <button
                  className="fullWidth secondary-btn"
                  onClick={() => setopenDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="fullWidth"
                  onClick={() => handleSendRequest()}
                >
                  Send Request
                </button>
              </div>
            </div>
          )}
        </Dialog>

        {trainers.map((t) => {
          return (
            <React.Fragment>
              <div className="spaced-between mb4">
                <h3>{t.name}</h3>
                <Chip text={t.category} background="primary-light" />
              </div>
              {t.plans.map((p) => (
                <ListTile
                  title={p.title}
                  type={p.type}
                  price={p.price}
                  chipText="Select"
                  chipBackground="secondary-light"
                  onChipClick={() => {
                    setselectedOption({ trainer: t, plan: p });

                    setopenDialog(true);
                  }}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PairingRequests;
