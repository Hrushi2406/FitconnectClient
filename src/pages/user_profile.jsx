import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
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

const UPDATE = gql`
  mutation UpdateLocation($lat: Float, $lon: Float){
    updateUserLocation(
      lat: $lat,
      lon: $lon
    )
  }
`;

function UserProfile() {
  var [userLat, setLat] = useState(0.0)
  var [userLon, setLon] = useState(0.0)
  const { data, loading, error } = useQuery(USER_QUERY);
  const [ updateLocation ] = useMutation(UPDATE);

  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(parseFloat(position.coords.latitude));
    setLon(parseFloat(position.coords.longitude));
  });

  const handleUpdate = () => {
    console.log(userLat, userLon);
    updateLocation({variables: {lat: userLat,lon: userLon}});
  }

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
        onButton2Click={handleUpdate}
      />
    </div>
  );
}

export default UserProfile;
