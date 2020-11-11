import React, { useState } from "react";
import Chipbox from "../chipbox";
import Input from "../input";

function Signup(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [age, setage] = useState(undefined);
  const [gender, setgender] = useState("");

  const [className, setclassName] = useState("");

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
        onChange={(e) => setage(e.target.value)}
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

      <button className="fullWidth" onClick={() => props.onSignUpSuccess()}>
        Sign up
      </button>
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

export default Signup;
