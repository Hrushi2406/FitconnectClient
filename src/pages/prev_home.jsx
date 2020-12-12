import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import { useMediaQuery } from "react-responsive";
import { gql, useQuery } from "@apollo/client";

import Sidebar from "../components/sidebar.jsx";

import "../css/pages/home.css";
import { useHistory } from "react-router-dom";

const searchQuery = gql`
  query Search($userLat: Float, $userLon: Float) {
    searchTrainer(
      userLat: $userLat
      userLong: $userLon
      maxDistance: -1
      maxPrice: -1
      category: []
      minRating: -1
      gender: ""
      age: -1
      sortBy: ""
      order: ""
      keyword: ""
    ) {
      trainerId
      name
      startPrice
      age
      fcRating
      category
      gender
      lat
      lon
      images
      mobile
      plans {
        price
        type
        planId
        title
      }
    }

    me {
      userId
      lat
      lon
    }

    filterUsers(
      userLat: $userLat
      userLong: $userLon
      maxDistance: -1
      category: []
      gender: ""
      age: -1
      sortBy: ""
      order: ""
    ) {
      name
      age
      gender
      lat
      lon
      imageUrl
      email
      mobile
      userId
    }
  }
`;

function HomePage() {
  var userLat;
  var userLon;
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [className, setclassName] = useState("");
  const history = useHistory();

  const [viewPort, setViewPort] = useState({});

  navigator.geolocation.getCurrentPosition(function (position) {
    userLat = 18.9984;  //parseFloat(position.coords.latitude);
    userLon =  73.12; //parseFloat(position.coords.longitude);
    setViewPort({
      latitude: 18.9984,
      longitude: 73.12,
      width: "100%",
      height: isMobile ? "400px" : "590px",
      zoom: 14,
    });
  });

  const [selected, setSelected] = useState(null);

  const { error, loading, data } = useQuery(searchQuery, {
    variables: { userLat, userLon },
  });

  if (loading) return <div className="center">Loading</div>;

  if (error) return <div className="center">{error.message}</div>;

  if (data) {
    const { searchTrainer, filterUsers, me } = data;

    console.log(selected);
    return (
      <React.Fragment>
        <div className="padded-container">
          <div className="spaced-between mb2">
            <h5>People Nearby</h5>
            <h6 className="primary">Filter & Sort</h6>
          </div>
          <div className={className}>
            <ReactMapGL
              {...viewPort}
              mapStyle="mapbox://styles/sumitmahajan/ckh34w2wl2bq419qt74byo3bo"
              mapboxApiAccessToken={
                "pk.eyJ1Ijoic3VtaXRtYWhhamFuIiwiYSI6ImNraDMzcHViMjBhdmgyeWxzZm1tc3FvNnEifQ.lX7eo_hgZuAWqUMwx3XZFg"
              }
              onViewportChange={(viewport) => setViewPort(viewport)}
              className="map-img"
              onClick={() => {
                setSelected(null);
                setclassName("");
                setViewPort({
                  latitude: viewPort.latitude,
                  longitude: viewPort.longitude,
                  width: "100%",
                  height: isMobile ? "400px" : "590px",
                  zoom: viewPort.zoom,
                });
              }}
            >
              {/* Plot filtered trainers */}
              {searchTrainer.map((trainer) => (
                <Marker
                  key={trainer.trainerId}
                  latitude={trainer.lat}
                  longitude={trainer.lon}
                >
                  <button
                    className="marker-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected({ sel: trainer, type: "t" });
                      setclassName("map-grid");
                      setViewPort({
                        latitude: viewPort.latitude,
                        longitude: viewPort.longitude,
                        width: "100%",
                        height: isMobile ? "400px" : "590px",
                        zoom: viewPort.zoom,
                      });
                    }}
                  >
                    <img
                      src="/images/trainer.svg"
                      alt="image"
                      className="marker-img"
                    />
                  </button>
                </Marker>
              ))}

              {/* Plot filtered Users */}
              {filterUsers.map((user) =>
                user.userId != me.userId ? (
                  <Marker
                    key={user.userId}
                    latitude={user.lat}
                    longitude={user.lon}
                  >
                    <button
                      className="marker-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected({ sel: user, type: "u" });
                        setclassName("map-grid");
                        setViewPort({
                          latitude: viewPort.latitude,
                          longitude: viewPort.longitude,
                          width: "100%",
                          height: isMobile ? "400px" : "590px",
                          zoom: viewPort.zoom,
                        });
                      }}
                    >
                      <img
                        src="/images/user1.svg"
                        alt="image"
                        className="marker-img"
                      />
                    </button>
                  </Marker>
                ) : (
                  <div></div>
                )
              )}

              {/* Plots current User */}
              <Marker key={me.userId} latitude={me.lat} longitude={me.lon}>
                <button className="marker-btn">
                  <img
                    src="/images/trainer1.svg"
                    alt="image"
                    className="marker-img"
                  />
                  <br />
                  You
                </button>
              </Marker>
            </ReactMapGL>

            {selected &&
              (selected.type == "u" ? (
                <Sidebar
                  name={selected.sel.name}
                  fcRating=""
                  imageUrl={selected.sel.imageUrl}
                  profession="User"
                  distance="10 km"
                  gender={selected.sel.gender}
                  age={selected.sel.age}
                  mobile={selected.sel.mobile}
                  button="Pair"
                  onButtonClick={() =>
                    history.push({
                      pathname: "pairingRequests",
                      data: { trainers: searchTrainer, user: selected.sel },
                    })
                  }
                />
              ) : (
                <Sidebar
                  name={selected.sel.name}
                  fcRating={selected.sel.fcRating}
                  imageUrl={selected.sel.images[0]}
                  profession="Trainer"
                  distance="10 km"
                  gender={selected.sel.gender}
                  age={selected.sel.age}
                  mobile={selected.sel.mobile}
                  button="Visit Profile"
                  onButtonClick={() =>
                    window.location.replace(
                      `/trainer/${selected.sel.trainerId}`
                    )
                  }
                />
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
