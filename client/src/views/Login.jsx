/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useShelves } from "../contexts/ShelvesContext";

const Login = () => {
  const { login, checkAuthentication, isAuthenticated } = useAuth();
  const { currentUser } = useShelves();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const { userId } = currentUser;
      navigate(`/profile/${userId}`, { replace: true });
    }

    checkAuthentication();
  }, [isAuthenticated, currentUser]);

  const [credentials, setCredentials] = useState({
    usernameOrEmail: null,
    password: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    login(credentials);
  };
  return (
    <div id="login">
      <form onSubmit={handlesubmit}>
        <h2>Log in</h2>
        <div>
          <input
            type="text"
            placeholder="email or username"
            required
            id="usernameOrEmail"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="Password"
            placeholder="Password"
            required
            id="password"
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons">
        <button type="submit">Log in</button>
        <button type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
