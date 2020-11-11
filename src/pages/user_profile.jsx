import { gql, useQuery } from "@apollo/client";
import React from "react";
import ReuseableCard from "../components/reuseable_card";
import "../css/pages/user_profile.css";
import { setToken } from "../utils/authorization";

const USER_QUERY = gql`
  query {
    me {
      name
      userId
      email
      mobile
      age
      gender
      bio
      imageUrl
    }
  }
`;

function UserProfile() {
  const { data, loading, error } = useQuery(USER_QUERY);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loading)
    return (
      <div className="center">
        <h2>Loading...</h2>{" "}
      </div>
    );
  if (error) return <div className="center">{error}</div>;

  const { me } = data;

  return (
    <div className="padded-container">
      <ReuseableCard
        title={me.name}
        chipText={me.gender}
        image={me.imageUrl}
        heading1={"Email - " + me.email}
        description={me.bio}
        button1="Logout"
        onButton1Click={handleLogout}
        button2="Edit "
      />
    </div>
  );
}

export default UserProfile;
