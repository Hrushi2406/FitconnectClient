import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { setToken } from "../../utils/authorization";

import Chipbox from "../chipbox";
import Input from "../input";
import { useHistory } from "react-router-dom";

function Signup(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState(undefined);
  const [gender, setgender] = useState("");
  var userLat = 0;
  var userLon = 0;

  const history = useHistory();

  const [className, setclassName] = useState("");
  const [signup, { data, error, loading }] = useMutation(SIGNUP_QUERY);

  navigator.geolocation.getCurrentPosition(function (position) {
    userLat = parseFloat(position.coords.latitude);
    userLon = parseFloat(position.coords.longitude);
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const d = await signup({
        variables: {
          email: email,
          password: password,
          name: name,
          age: age,
          gender: gender,
          address: address,
          lat: userLat == 0 ? 19.0 : userLat,
          lon: userLon == 0 ? 73.125 : userLon,
        },
      });
      setToken(d.data.registerAsUser);
      history.push("/auth", { data: { showInterest: true } });

      props.onSignUpSuccess();
    } catch (err) {}
  };

  return (
    <div className={"add " + className}>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <div className="spacing-2"></div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <div className="spacing-2"></div>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <div className="spacing-2"></div>
      <Input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setage(parseInt(e.target.value))}
      />
      <div className="spacing-2"></div>
      <Input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setaddress(e.target.value)}
      />

      <div className="spacing-2"></div>
      <div className="spaced-between">
        <Chipbox
          text="Male"
          isSelected={gender === "male"}
          onClick={() => setgender("male")}
        />
        <div style={{ width: "2rem" }}></div>
        <Chipbox
          text="Female"
          isSelected={gender === "female"}
          onClick={() => setgender("female")}
        />
      </div>

      <div className="spacing-2"></div>

      {loading ? (
        <button className="fullWidth">Loading</button>
      ) : (
        <button
          className="fullWidth"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Sign up
        </button>
      )}

      {error ? (
        <React.Fragment>
          <div className="spacing-1"></div>
          <p style={{ fontSize: "1.5rem", color: "red" }}>{error.message}</p>
          <div className="spacing-1"></div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="spacing-2"></div>
        </React.Fragment>
      )}

      <div className="spacing-2"></div>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          setclassName("remove");
          setTimeout(() => {
            props.onChange();
          }, 400);
        }}
      >
        Have a account? Login
      </p>
    </div>
  );
}

const SIGNUP_QUERY = gql`
  mutation Signup(
    $name: String
    $email: String
    $password: String
    $gender: String
    $age: Int
    $address: String
    $lat: Float
    $lon: Float
  ) {
    registerAsUser(
      name: $name
      email: $email
      password: $password
      gender: $gender
      age: $age
      mobile: "3076589245"
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
      address: $address
      imageUrl: "https://images.unsplash.com/photo-1506197061617-7f5c0b093236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1005&q=80"
      lat: $lat
      lon: $lon
    )
  }
`;

export default Signup;
