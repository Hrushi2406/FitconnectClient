import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import React from "react";
import client from "../config/client";
import { gql } from "@apollo/client";
import Sidebar from "../components/sidebar.jsx";
import "../css/pages/home.css";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VtaXRtYWhhamFuIiwiYSI6ImNraDMzcHViMjBhdmgyeWxzZm1tc3FvNnEifQ.lX7eo_hgZuAWqUMwx3XZFg";
// ("pk.eyJ1Ijoic3VtaXRtYWhhamFuIiwiYSI6ImNraDMzcHViMjBhdmgyeWxzZm1tc3FvNnEifQ.lX7eo_hgZ");

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

class HomePage extends React.Component {
  state = {
    className: "",
    selected: null,
    userLat: 18.9984,
    userLon: 73.12,
    trainers: [],
  };

  componentDidMount = async () => {
    // Actual current location of user
    // await navigator.geolocation.getCurrentPosition(
    //   (position) =>
    //     this.setState({
    //       userLat: position.coords.latitude,
    //       userLon: position.coords.longitude,
    //     }),
    //   (err) => console.log(err)
    // );

    var data = await client.query({
      query: searchQuery,
      variables: {
        userLat: this.state.userLat,
        userLong: this.state.userLon,
        maxDistance: -1,
        maxPrice: -1,
        category: [],
        minRating: -1,
        gender: "",
        age: -1,
        sortBy: "",
        order: "",
        keyword: "",
      },
    });

    const { searchTrainer, me, filterUsers } = data.data;
    this.setState({ ...this.state, trainers: searchTrainer });

    // Creates new map instance
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      // style: "mapbox://styles/mapbox/streets-v10",
      // style: "mapbox://styles/sumitmahajan/ckh34w2wl2bq419qt74byo3bo",
      style: "mapbox://styles/sumitmahajan/ckikhmng20yeo17p96iy18cvd",
      // center: [me.lat, me.lon],
      center: [this.state.userLon, this.state.userLat],
      zoom: 14,
    });

    //Modify default onClick event on entire map except markers
    map.on("click", (e) => {
      e.preventDefault();
      this.setState({ ...this.state, selected: null, className: "" });
    });

    // Creates new directions control instance
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/walking",
      controls: { instructions: true }, // For phone screen it should be false
    });

    // Fixed starting point
    directions.setOrigin([this.state.userLon, this.state.userLat]);

    // Integrates directions control with map
    map.addControl(directions, "top-left");

    // Create trainer markers
    searchTrainer.map((trainer) => {
      var marker = new mapboxgl.Marker({
        color: "red",
      })
        .setLngLat([trainer.lon, trainer.lat])
        .addTo(map);
      marker.getElement().style.cursor = "pointer";
      marker.getElement().addEventListener("click", (e) => {
        this.setState({
          ...this.state,
          selected: { sel: trainer, type: "t" },
          className: "map-grid",
        });
        directions.setDestination([trainer.lon, trainer.lat]);
        e.stopPropagation();
      });
    });

    // Create user markers
    filterUsers.map((user) => {
      var marker = new mapboxgl.Marker()
        .setLngLat([user.lon, user.lat])
        .addTo(map);
      marker.getElement().style.cursor = "pointer";
      marker.getElement().addEventListener("click", (e) => {
        this.setState({
          ...this.state,
          selected: { sel: user, type: "u" },
          className: "map-grid",
        });
        directions.setDestination([user.lon, user.lat]);
        e.stopPropagation();
      });
    });

    //Current user's permanent location marker
    new mapboxgl.Marker({
      color: "green",
    })
      .setLngLat([me.lon, me.lat])
      .addTo(map);

    //Current user's current location marker
    new mapboxgl.Marker({
      color: "yellow",
    })
      .setLngLat([this.state.userLon, this.state.userLat])
      .addTo(map);
  };

  render() {
    return (
      <React.Fragment>
        <div className="padded-container">
          <div className="spaced-between mb2">
            <h5>People Nearby</h5>
            <h6 className="primary">Filter & Sort</h6>
          </div>
          <div className={this.state.className}>
            {/* Map Element */}
            <div ref={(el) => (this.mapWrapper = el)} className="map-img" />
            {/* SideBar */}
            {this.state.selected &&
              (this.state.selected.type == "u" ? (
                <Sidebar
                  name={this.state.selected.sel.name}
                  fcRating=""
                  imageUrl={this.state.selected.sel.imageUrl}
                  profession="User"
                  distance="10 km"
                  gender={this.state.selected.sel.gender}
                  age={this.state.selected.sel.age}
                  mobile={this.state.selected.sel.mobile}
                  button="Pair"
                  onButtonClick={
                    () => {
                      console.log(this.state);
                      this.props.history.push("/pairingRequests", {
                        data: {
                          trainers: this.state.trainers,
                          user: this.state.selected.sel,
                        },
                      });
                    }
                    // console.log(this.state);
                  }
                />
              ) : (
                <Sidebar
                  name={this.state.selected.sel.name}
                  fcRating={this.state.selected.sel.fcRating}
                  imageUrl={this.state.selected.sel.images[0]}
                  profession="Trainer"
                  distance="10 km"
                  gender={this.state.selected.sel.gender}
                  age={this.state.selected.sel.age}
                  mobile={this.state.selected.sel.mobile}
                  button="Visit Profile"
                  onButtonClick={
                    () =>
                      this.props.history.push(
                        `/trainer/${this.state.selected.sel.trainerId}`
                      )
                    // window.location.replace(
                    //   `/trainer/${this.state.selected.sel.trainerId}`
                    // )
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
