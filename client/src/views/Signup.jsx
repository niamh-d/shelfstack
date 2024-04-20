/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useShelves } from "../contexts/ShelvesContext";

export default function SignUp() {
  const { signup, isAuthenticated } = useAuth();
  const { currentUser } = useShelves();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const { userId } = currentUser;
      navigate(`/profile/${userId}`, { replace: true });
    }
  }, [isAuthenticated, currentUser]);

  // add textarea for bio if needed

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    userBio: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    signup(signUpData);
    navigate("/");
  };

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <h2>I want in!</h2>

            <input
              name="firstName"
              placeholder="First name"
              onChange={(e) => handleInputChange(e)}
            />

            <input
              name="lastName"
              placeholder="Last name"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              name="email"
              placeholder="Email"
              onChange={(e) => handleInputChange(e)}
            />

            <input
              name="username"
              placeholder="Username"
              onChange={(e) => handleInputChange(e)}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleInputChange(e)}
            />

            <textarea
              name="userBio"
              placeholder="Say something cool here!"
              onChange={(e) => handleInputChange(e)}
            />

            <button type="submit">Submit</button>
            <button type="button" id="secondary" onClick={() => navigate(-1)}>
              Go back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
