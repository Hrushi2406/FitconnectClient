import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

import React from "react";
import client from "../config/client";
import { gql } from "@apollo/client";
import Sidebar from "../components/sidebar.jsx";
import "../css/pages/home.css";
import SliderWithTitle from "../components/slider";
import Chipbox from "../components/chipbox";
import Dialog from "../components/dialog";
import HomeDialog from "../components/dialog/home_dialog";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VtaXRtYWhhamFuIiwiYSI6ImNraDMzcHViMjBhdmgyeWxzZm1tc3FvNnEifQ.lX7eo_hgZuAWqUMwx3XZFg";
// ("pk.eyJ1Ijoic3VtaXRtYWhhamFuIiwiYSI6ImNraDMzcHViMjBhdmgyeWxzZm1tc3FvNnEifQ.lX7eo_hgZ");

const searchQuery = gql`
  query Search(
    $userLat: Float
    $userLon: Float
    $maxDistance: Int
    $maxPrice: Int
    $minRating: Int
    $tCategory: [String]
    $tGender: String
    $tAge: Int
    $uCategory: [String]
    $uGender: String
    $uAge: Int
  ) {
    searchTrainer(
      userLat: $userLat
      userLong: $userLon
      maxDistance: $maxDistance
      maxPrice: $maxPrice
      category: $tCategory
      minRating: $minRating
      gender: $tGender
      age: $tAge
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
      maxDistance: $maxDistance
      category: $uCategory
      gender: $uGender
      age: $uAge
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
    showInstructions: true,
    userLat: 18.9984,
    userLon: 73.12,
    // userLat: 19.0222,
    // userLon: 72.85,
    trainers: [],
    maxDistance: -1,
    filters: {
      maxPrice: -1,
      minRating: 0,
      tCategory: [],
      tGender: "",
      tAge: -1,
      uCategory: [],
      uGender: "",
      uAge: -1,
    },
    trainerMarkers: [],
    userMarkers: [],
    map: null,
    directions: null,

    openDialog: false,
  };

  componentDidMount = async () => {
    const { filters } = this.state;
    var data = await client.query({
      query: searchQuery,
      variables: {
        userLat: this.state.userLat,
        userLon: this.state.userLon,
        maxDistance: this.state.maxDistance,
        maxPrice: filters.maxPrice,
        minRating: filters.minRating,
        tCategory: filters.tCategory,
        tGender: filters.tGender,
        tAge: filters.tAge,
        uCategory: filters.uCategory,
        uGender: filters.uGender,
        uAge: filters.uAge,
      },
    });

    const { searchTrainer, me, filterUsers } = data.data;

    // Creates new map instance
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      pitch: 90,
      // style: "mapbox://styles/mapbox/streets-v10",
      // style: "mapbox://styles/sumitmahajan/ckh34w2wl2bq419qt74byo3bo",
      style: "mapbox://styles/sumitmahajan/ckikhmng20yeo17p96iy18cvd",
      // center: [me.lat, me.lon],
      center: [this.state.userLon - 0.0055, this.state.userLat],
      zoom: 14.4,
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

    this.setState({
      ...this.state,
      trainers: searchTrainer,
      map,
      directions,
    });

    // Fixed starting point
    directions.setOrigin([this.state.userLon, this.state.userLat]);

    // Integrates directions control with map
    map.addControl(directions, "top-left");

    // Create trainer markers
    this.createTrainerMarkers(searchTrainer);
    // Create user markers
    this.createUserMarkers(filterUsers);

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

    //HIDE INST AND INPUT IN MOBILE
    let instructions = document.getElementsByClassName(
      "directions-control-instructions"
    );

    let input = document.getElementsByClassName("directions-control-inputs");

    const mql = window.matchMedia("(max-width: 960px)");
    if (mql.matches) {
      instructions[0].hidden = true;
      input[0].hidden = true;
      this.setState({ ...this.state, showInstructions: false });
    }
  };

  createTrainerMarkers(searchTrainer) {
    const { map, directions } = this.state;
    this.setState({ ...this.state, trainerMarkers: [] });

    searchTrainer.map((trainer) => {
      let el = document.createElement("div");
      el.className = "trainer-marker";
      el.style.backgroundImage = `url(${trainer.images[0]})`;

      //Generate new marker
      var marker = new mapboxgl.Marker(el, {
        color: "red",
      })
        .setLngLat([trainer.lon, trainer.lat])
        .addTo(map);

      //store trainer Markers
      this.setState({
        ...this.state,
        trainerMarkers: [...this.state.trainerMarkers, marker],
      });

      //style
      marker.getElement().style.cursor = "pointer";

      //on click
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
  }

  createUserMarkers(filterUsers) {
    const { map, directions } = this.state;
    this.setState({ ...this.state, userMarkers: [] });

    filterUsers.map((user) => {
      //Generate a new marker
      var marker = new mapboxgl.Marker()
        .setLngLat([user.lon, user.lat])
        .addTo(map);

      //store user marker
      this.setState({
        ...this.state,
        userMarkers: [...this.state.userMarkers, marker],
      });

      //styling marker
      marker.getElement().style.cursor = "pointer";

      //on Marker Click
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
  }

  handleShowInstructions = (e) => {
    this.setState({
      ...this.state,
      showInstructions: !this.state.showInstructions,
    });

    //HIDE INST AND INPUT IN MOBILE
    let instructions = document.getElementsByClassName(
      "directions-control-instructions"
    );

    let input = document.getElementsByClassName("directions-control-inputs");

    const mql = window.matchMedia("(max-width: 960px)");
    if (mql.matches) {
      instructions[0].hidden = true;
    } else {
      instructions[0].hidden = this.state.showInstructions;
    }
    input[0].hidden = this.state.showInstructions;
  };

  handleDistanceChange = async (e) => {
    this.setState({
      ...this.state,
      maxDistance: parseInt(e.target.value),
    });

    const { filters } = this.state;

    try {
      var data = await client.query({
        query: searchQuery,
        variables: {
          userLat: this.state.userLat,
          userLon: this.state.userLon,
          maxDistance: parseInt(e.target.value),
          maxPrice: filters.maxPrice,
          minRating: filters.minRating,
          tCategory: filters.tCategory,
          tGender: filters.tGender,
          tAge: filters.tAge,
          uCategory: filters.uCategory,
          uGender: filters.uGender,
          uAge: filters.uAge,
        },
      });

      const { searchTrainer, me, filterUsers } = data.data;

      //Remove previous Markers
      this.state.trainerMarkers.forEach((marker) => marker.remove());
      this.state.userMarkers.forEach((marker) => marker.remove());

      //Create new markers
      this.createTrainerMarkers(searchTrainer);
      this.createUserMarkers(filterUsers);

      this.setState({
        ...this.state,
        trainers: searchTrainer,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleDialogClose = (e) => {
    this.setState({
      ...this.state,
      openDialog: false,
    });
  };

  handleFilter = async (filters) => {
    // console.log(filters);
    try {
      var data = await client.query({
        query: searchQuery,
        variables: {
          userLat: this.state.userLat,
          userLon: this.state.userLon,
          maxDistance: this.state.maxDistance,
          maxPrice: filters.maxPrice,
          minRating: filters.minRating,
          tCategory: filters.tCategory,
          tGender: filters.tGender,
          tAge: filters.tAge,
          uCategory: filters.uCategory,
          uGender: filters.uGender,
          uAge: filters.uAge,
        },
      });

      const { searchTrainer, me, filterUsers } = data.data;

      //Remove previous Markers
      this.state.trainerMarkers.forEach((marker) => marker.remove());
      this.state.userMarkers.forEach((marker) => marker.remove());

      //Create new markers
      this.createTrainerMarkers(searchTrainer);
      this.createUserMarkers(filterUsers);

      this.setState({
        ...this.state,
        trainers: searchTrainer,
        filters,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        <HomeDialog
          openDialog={this.state.openDialog}
          close={this.handleDialogClose}
          filter={this.handleFilter}
        />
        <div className="padded-container">
          <div className="filter-grid mb2">
            <Chipbox
              className="instructions"
              text="Show instructions"
              isSelected={this.state.showInstructions}
              onClick={this.handleShowInstructions}
            />
            {/* <h5>People Nearby</h5> */}
            <SliderWithTitle
              className="distance-slider"
              header="Max Distance"
              subHeader="HRushi"
              min={0}
              max={10}
              value={this.state.maxDistance}
              onChange={this.handleDistanceChange}
            />
            <Chipbox
              className="filter-options"
              text="Filters"
              // isSelected={this.state.showInstructions}
              onClick={() => this.setState({ ...this.state, openDialog: true })}
            />

            {/* <h6 className="primary filter-options">Filter </h6> */}
          </div>
          <div className="spacing-1"></div>
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
