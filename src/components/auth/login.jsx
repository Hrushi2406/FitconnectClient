import React, { useState } from "react";
import Input from "../input";
import { gql, useMutation } from "@apollo/client";
import { setToken } from "../../utils/authorization";

function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [className, setclassName] = useState("");
  const [login, { data, error, loading }] = useMutation(LOGIN_QUERY);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const d = await login({
        variables: { email: email, password: password },
      });
      setToken(d.data.loginAsUser);

      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div className={" add " + className}>
      <form onSubmit={handleClick}>
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
        {loading ? (
          <button className="fullWidth">Loading</button>
        ) : (
          <button onClick={handleClick} className="fullWidth">
            Login
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

        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setclassName("remove");
            setTimeout(() => {
              props.onChange();
            }, 400);
          }}
        >
          Don't have a account? Sign up
        </p>
      </form>
    </div>
  );
}

const LOGIN_QUERY = gql`
  mutation Login($email: String, $password: String) {
    loginAsUser(email: $email, password: $password)
  }
`;

export { LOGIN_QUERY };
export default Login;
