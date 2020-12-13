import { useQuery, gql, useLazyQuery } from "@apollo/client";
import React, { Component, useEffect, useRef, useState } from "react";
import Card from "../components/card";
import TrainerDialog from "../components/dialog/trainer_dialog";
import "../css/pages/search_page.css";
import client from "../config/client";

const RECOMMENDED_QUERY = gql`
  query {
    recommendations {
      trainerId
      images
      name
      startPrice
      fcRating
      category
    }
  }
`;

const FILTER_QUERY = gql`
  query SearchTrainers(
    $userLat: Float!
    $userLong: Float!
    $maxDistance: Int!
    $maxPrice: Int!
    $category: [String!]!
    $minRating: Int!
    $gender: String!
    $age: Int!
    $sortBy: String!
    $order: String!
    $keyword: String!
  ) {
    searchTrainer(
      userLat: $userLat
      userLong: $userLong
      maxDistance: $maxDistance
      maxPrice: $maxPrice
      category: $category
      minRating: $minRating
      gender: $gender
      age: $age
      sortBy: $sortBy
      order: $order
      keyword: $keyword
    ) {
      trainerId
      images
      name
      startPrice
      fcRating
      category
    }
  }
`;

// function SearchPage() {
//   // GRAPHQL FETCHING
//   const { loading, error, data } = useQuery(RECOMMENDED_QUERY);
//   const [
//     filterTrainers,
//     { loading: fLoading, error: fError, data: fData },
//   ] = useLazyQuery(FILTER_QUERY);

//   const [openDialog, setopenDialog] = useState(false);
//   const [hasFocus, sethasFocus] = useState(false);
//   const [isRecommended, setisRecommended] = useState(true);

//   const [search, setSearch] = useState("");

//   const inputRef = useRef();

//   useEffect(() => {
//     if (!isRecommended) {
//     }
//     // setisRecommended(false);
//   }, [isRecommended]);
//   console.log("INPUTjZ");

//   const handleInputChange = (e) => {
//     setSearch(e.target.value);

//     sethasFocus(e.target.value.length !== 0);

//     if (e.target.value.length !== 0) {
//       setisRecommended(false);

//       filterTrainers({
//         variables: {
//           userLat: 19.0222,
//           userLong: 72.8561,
//           maxDistance: -1,
//           maxPrice: -1,
//           category: ["Yoga", "Workout", "Zumba", "Meditation"],
//           minRating: -1,
//           gender: "Male",
//           age: -1,
//           sortBy: "fcRating",
//           order: "DESC",
//           keyword: search,
//         },
//       });
//     } else {
//       setisRecommended(true);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     sethasFocus(false);

//     if (search.length === 0) {
//       setisRecommended(true);
//     } else {
//       filterTrainers({
//         variables: {
//           userLat: 19.0222,
//           userLong: 72.8561,
//           maxDistance: 1000,
//           maxPrice: -1,
//           category: ["Yoga", "Workout"],
//           minRating: -1,
//           gender: "Male",
//           age: -1,
//           sortBy: "fcRating",
//           order: "DESC",
//           keyword: search,
//         },
//       });
//     }
//   };

//   const handleOnFocus = (e) => {
//     sethasFocus(true);
//   };

//   const close = (e) => setopenDialog(false);

//   // console.log(fData);

//   if (loading || fLoading) return <div className="center">Loading...</div>;
//   if (error) return <div className="center">{error}</div>;
//   if (fError) return <div className="center">{fError}</div>;

//   return (
//     <React.Fragment>
//       <div className="padded-container">
//         <form
//           className={hasFocus ? "animated-input " : "animated-input "}
//           onSubmit={handleSubmit}
//         >
//           <input
//             autoFocus
//             ref={inputRef}
//             value={search}
//             onChange={handleInputChange}
//             onFocus={handleOnFocus}
//             className={hasFocus ? "input " : "search-input"}
//             placeholder="Search"
//           />
//           <button
//             style={{
//               width: 0,
//               display: hasFocus ? "inline" : "none",
//               transition: "all 1s ease",
//             }}
//             onClick={handleSubmit}
//             className={
//               hasFocus ? "text-button button " : "text-button animated-button"
//             }
//           >
//             Search
//           </button>
//         </form>
//         <div className="spacing-6"></div>

//         <div className="spaced-between mb2">
//           <h5>
//             {isRecommended ? "Recommended Trainers" : "Results for " + search}{" "}
//           </h5>
//           <h6 onClick={() => setopenDialog(true)} className="primary">
//             Filter & Sort
//           </h6>
//           <TrainerDialog openDialog={openDialog} close={close} />
//         </div>

//         <div className="grid ">
//           {isRecommended ? (
//             data.recommendations.map((trainer) => (
//               <Card
//                 key={trainer.trainerId}
//                 image={trainer.images[0]}
//                 name={trainer.name}
//                 category={trainer.category}
//                 rating={trainer.fcRating}
//                 startPrice={trainer.startPrice}
//                 linkTo={"/trainer/" + trainer.trainerId}
//               />
//             ))
//           ) : fData === undefined ? (
//             <div className="center"> Loading... </div>
//           ) : (
//             fData.searchTrainer.map((trainer) => (
//               <Card
//                 key={trainer.trainerId}
//                 image={trainer.images[0]}
//                 name={trainer.name}
//                 category={trainer.category}
//                 rating={trainer.fcRating}
//                 startPrice={trainer.startPrice}
//                 linkTo={"/trainer/" + trainer.trainerId}
//               />
//             ))
//           )}
//           {/* <Card /> <Card />
//           <Card />
//           <Card /> */}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

export default class SearchPage extends Component {
  state = {
    openDialog: false,
    hasFocus: false,
    isRecommended: true,
    search: "",
    filterInfo: {
      maxDistance: 10,
      minRating: -1,
      maxStartPrice: -1,
      maxAge: -1,
      interests: [],
      gender: "Male",
      sortBy: "",
      order: "DESC",
    },
    recommendations: [],
    trainers: [],
  };

  getTrainersData = async (s) =>
    await client.query({
      query: FILTER_QUERY,
      variables: {
        userLat: 18.9984,
        userLong: 73.12,
        maxDistance: this.state.filterInfo.maxDistance,
        maxPrice: this.state.filterInfo.maxStartPrice,
        category: this.state.filterInfo.interests,
        minRating: this.state.filterInfo.minRating,
        gender: this.state.filterInfo.gender,
        age: this.state.filterInfo.maxAge,
        sortBy: this.state.filterInfo.sortBy,
        order: this.state.filterInfo.order,
        keyword: s,
      },
    });

  handleInputChange = async (e) => {
    this.setState({
      ...this.state,
      search: e.target.value,
      hasFocus: e.target.value.length !== 0,
      isRecommended: e.target.value.length === 0,
      // trainers: fDta,
    });
    var fData = await this.getTrainersData(e.target.value);

    this.setState({ ...this.state, trainers: fData.data.searchTrainer });
  };

  handleSubmit = (e) => {
    this.setState({
      ...this.state,
      hasFocus: false,
      isRecommended: this.state.search.length !== 0,
      hasFocus: false,
      search: "",
    });
  };

  handleOnFocus = (e) => {
    this.setState({ ...this.state, hasFocus: true });
  };

  close = (e) => this.setState({ ...this.state, openDialog: false });

  filter = async (filters) => {
    console.log(filters);
    const data = await client.query({
      query: FILTER_QUERY,
      variables: {
        userLat: 18.9984,
        userLong: 73.12,
        maxDistance: parseInt(filters.maxDistance),
        maxPrice: parseInt(filters.maxStartPrice) * 100,
        category: filters.interests,
        minRating: parseInt(filters.minRating),
        gender: filters.gender,
        age: parseInt(filters.maxAge),
        sortBy: filters.sortBy,
        order: filters.order,
        keyword: this.state.search,
      },
    });

    console.log(data);
    this.setState({
      ...this.state,
      trainers: data.data.searchTrainer,
      isRecommended: false,
      filterInfo: filters,
    });
  };

  componentDidMount = async () => {
    var data = await client.query({
      query: gql`
        {
          recommendations {
            trainerId
            images
            name
            startPrice
            fcRating
            category
          }
        }
      `,
    });

    var fData = await client.query({
      query: FILTER_QUERY,
      variables: {
        userLat: 18.9984,
        userLong: 73.12,
        maxDistance: 1000,
        maxPrice: -1,
        category: ["Yoga", "Workout"],
        minRating: -1,
        gender: "Male",
        age: -1,
        sortBy: "fcRating",
        order: "DESC",
        keyword: this.state.search,
      },
    });

    this.setState({
      ...this.state,
      recommendations: data.data.recommendations,
      trainers: fData.data.searchTrainer,
    });
  };

  render() {
    console.log(this.state);
    const {
      hasFocus,
      isRecommended,
      search,
      openDialog,
      recommendations,
      trainers,
    } = this.state;
    // const inputRef = useRef();
    return (
      <React.Fragment>
        <div className="padded-container">
          <div
            className={hasFocus ? "animated-input " : "animated-input "}
            // onSubmit={this.handleSubmit}
          >
            <input
              autoFocus
              value={search}
              onChange={(e) => this.handleInputChange(e)}
              onFocus={this.handleOnFocus}
              className={hasFocus ? "input " : "search-input"}
              placeholder="Search"
            />
            <button
              style={{
                width: 0,
                display: hasFocus ? "inline" : "none",
                transition: "all 1s ease",
              }}
              onClick={this.handleSubmit}
              className={
                hasFocus ? "text-button button " : "text-button animated-button"
              }
            >
              Cancel
            </button>
          </div>
          <div className="spacing-6"></div>

          <div className="spaced-between mb2">
            <h5>
              {isRecommended ? "Recommended Trainers" : "Results for " + search}{" "}
            </h5>
            <h6
              onClick={() => this.setState({ ...this.state, openDialog: true })}
              className="primary"
            >
              Filter & Sort
            </h6>
            <TrainerDialog
              filter={(filters) => this.filter(filters)}
              openDialog={openDialog}
              close={(e) => this.close(e)}
            />
          </div>

          <div className="grid ">
            {isRecommended ? (
              recommendations === undefined ? (
                <div> Loadng</div>
              ) : (
                recommendations.map((trainer) => (
                  <Card
                    key={trainer.trainerId}
                    image={trainer.images[0]}
                    name={trainer.name}
                    category={trainer.category}
                    rating={trainer.fcRating}
                    startPrice={trainer.startPrice}
                    linkTo={"/trainer/" + trainer.trainerId}
                  />
                ))
              )
            ) : trainers == undefined ? (
              <div> Loadng</div>
            ) : (
              trainers.map((trainer) => (
                <Card
                  key={trainer.trainerId}
                  image={trainer.images[0]}
                  name={trainer.name}
                  category={trainer.category}
                  rating={trainer.fcRating}
                  startPrice={trainer.startPrice}
                  linkTo={"/trainer/" + trainer.trainerId}
                />
              ))
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// export default SearchPage;
