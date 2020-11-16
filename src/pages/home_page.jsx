import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
// import ReactDirections from 'react-map-gl-directions'
import { useMediaQuery } from 'react-responsive';
import { gql, useQuery } from "@apollo/client";

import Sidebar from "../components/sidebar.jsx";

import "../css/pages/home.css";

const trainerQuery = gql`
{
  searchTrainer(
    userLat: 19.0221
    userLong: 72.8456
    maxDistance: 3
    maxPrice: 3000
    category: "Zumba"
    minRating: 0
    gender: ""
    age: -1
    sortBy: "dist"
    order: "asc"
    keyword: ""
  ){
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
  }

  me {
    userId
    lat
    lon
  }

  filterUsers(
    userLat: 19.0221
    userLong: 72.8456
    maxDistance: 3
    category: []
    gender: ""
    age: 10
    sortBy: ""
    order: ""
  ){
    name
    age
    gender
    lat
    lon
    imageUrl
    email
    mobile
  }
}
`;

function HomePage() {
  var userLat;
  var userLon;
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [className, setclassName] = useState("");
  // const mapRef = React.createRef();

  // navigator.geolocation.getCurrentPosition(function(position) {
  //   userLat = parseFloat(position.coords.latitude);
  //   userLon = parseFloat(position.coords.longitude);
  //   setViewPort({
  //     latitude:userLat, //19.0221
  //     longitude:userLon, //72.8456
  //     width:"100%",
  //     height: isMobile ? "400px" : "590px",
  //     zoom:10,
  //   })
  // });

  const [viewPort, setViewPort] = useState({
    latitude: 18.974199594762585,
    longitude: 72.84271396813652,
    width: "100%",
    height: isMobile ? "400px" : "590px",
    zoom: 12,
  });

  const [selected, setSelected] = useState(null);

  const { error, loading, data } = useQuery(trainerQuery);

  if (loading)
    return (
      <div className="center">
        Loading
      </div>
    );

  if (error) return <div className="center">{error.message}</div>;

  if (data) {
    const { searchTrainer, filterUsers, me } = data;

    return (
      <React.Fragment>
        <div className="padded-container">
          <div className="spaced-between mb2">
            <h5>
              People Nearby
            </h5>
            <h6
              className="primary"
            >
              Filter & Sort
            </h6>
          </div>
          <div className={className}>
            
            <ReactMapGL
              {...viewPort}
              mapStyle="mapbox://styles/sumitmahajan/ckh34ks3r2bey19p9tmoce0rd"
              mapboxApiAccessToken={"pk.eyJ1Ijoic3VtaXRtYWhhamFuIiwiYSI6ImNraDMzcHViMjBhdmgyeWxzZm1tc3FvNnEifQ.lX7eo_hgZuAWqUMwx3XZFg"}
              onViewportChange={(viewport) => setViewPort(viewport)}
              className="map-img"
              onClick={()=>{
                setSelected(null);
                setclassName("");
                setViewPort({
                  latitude: viewPort.latitude,
                  longitude: viewPort.longitude,
                  width: "100%",
                  height: isMobile ? "400px" : "590px",
                  zoom: 12,
                });
              }}
            >
              {/* Plot filtered trainers */}
              {searchTrainer.map(trainer => (
                <Marker
                  key={trainer.trainerId}
                  latitude={trainer.lat}
                  longitude={trainer.lon}
                >
                  <button className="marker-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelected({ sel: trainer, type: "t" });
                      setclassName("map-grid");
                      setViewPort({
                        latitude: viewPort.latitude,
                        longitude: viewPort.longitude,
                        width: "100%",
                        height: isMobile ? "400px" : "590px",
                        zoom: 12,
                      });
                    }}
                  >
                    <img src="/images/trainer.svg" alt="image" className="marker-img" />
                  </button>
                </Marker>
              ))}

              {/* Plot filtered Users */}
              {filterUsers.map(user => (
                user.userId != me.userId ?
                  <Marker
                    key={user.userId}
                    latitude={user.lat}
                    longitude={user.lon}
                  >
                    <button className="marker-btn" 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected({ sel: user, type: "u" });
                        setclassName("map-grid");
                        setViewPort({
                          latitude: viewPort.latitude,
                          longitude: viewPort.longitude,
                          width: "100%",
                          height: isMobile ? "400px" : "590px",
                          zoom: 12,
                        });
                      }}
                    >
                      <img src="/images/user1.svg" alt="image" className="marker-img" />
                    </button>
                  </Marker>
                  : <div></div>
              ))}

              {/* Plots current User */}
              <Marker
                key={me.userId}
                latitude={me.lat}
                longitude={me.lon}
              >
                <button className="marker-btn" 
                >
                  <img src="/images/trainer1.svg" alt="image" className="marker-img" />
                  <br/>
                  You
                </button>
              </Marker>
              
              {/* <ReactDirections 
                mapRef={mapRef} 
                mapboxApiAccessToken={"pk.eyJ1Ijoic3VtaXRtYWhhamFuIiwiYSI6ImNraDMzcHViMjBhdmgyeWxzZm1tc3FvNnEifQ.lX7eo_hgZuAWqUMwx3XZFg"} 
              /> */}
            </ReactMapGL>

            {selected && (
              (selected.type == "u") ? (
                <Sidebar 
                  name = {selected.sel.name}
                  fcRating = ""
                  imageUrl = {selected.sel.imageUrl}
                  profession = "User"
                  distance = "10 km"
                  gender = {selected.sel.gender}
                  age = {selected.sel.age}
                  mobile = {selected.sel.mobile}
                  button = "Pair"
                  onButtonClick = {()=>"Navigate to Pairing page"}
                />
              ) :
                (
                  <Sidebar 
                    name = {selected.sel.name}
                    fcRating = {selected.sel.fcRating}
                    imageUrl = {selected.sel.images[0]}
                    profession = "Trainer"
                    distance = "10 km"
                    gender = {selected.sel.gender}
                    age = {selected.sel.age}
                    mobile = {selected.sel.mobile}
                    button = "Visit Profile"
                    onButtonClick = {()=> window.location.replace(`/trainer/${selected.sel.trainerId}`)}
                  />
                )
              )
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
