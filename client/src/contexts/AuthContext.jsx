/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import axios from "axios";

axios.defaults.baseURL = "/api";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  credentialsAreInvalid: false,
  loggedInUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_IS_NOT_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: false,
        loggedInUser: null,
      };
    case "SET_IS_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SET_LOGGEDIN_USER":
      return { ...state, loggedInUser: action.payload };
    default:
      throw new Error("Unknown action.");
  }
}

function AuthProvider({ children }) {
  const [{ loggedInUser, isAuthenticated, credentialsAreInvalid }, dispatch] =
    useReducer(reducer, initialState);

  // THESE FUNCTIONS WILL BE USED WHEN WE HAVE AUTHENTICATION SET UP IN THE BACKEND AND IS NEEDED BY THE FRONT END.

  // AT PRESENT, ISAUTHENTICATED IS TRUE AND WE ARE USING DUMMY USER DATA

  function logout() {
    dispatch({ type: "SET_IS_NOT_AUTHENTICATED" });
    localStorage.clear();
  }

  /**
   * login takes an object of user credentials
   * @param {obj} credentials {usernameOrEmail: string, password: string}
   */

  async function login(credentials) {
    try {
      const res = await axios.post("/auth/login", credentials);
      const user = res.data;

      if (user) {
        dispatch({ type: "SET_LOGGEDIN_USER", payload: user.user });
        dispatch({ type: "SET_IS_AUTHENTICATED" });
        localStorage.setItem("token", user.token);
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * checkAuthentication does not take any arguments
   */

  async function checkAuthentication() {
    try {
      const token = localStorage.getItem("token");

      if (!token) dispatch({ type: "SET_IS_NOT_AUTHENTICATED" });
      else axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (token && !isAuthenticated) {
        const res = await axios.post("/auth/check_auth");
        const user = res.data;

        if (user) {
          dispatch({ type: "SET_IS_AUTHENTICATED" });
          dispatch({ type: "SET_LOGGEDIN_USER", payload: user });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * signup takes an object of user details
   * @param {obj} details {firstName: string, lastName: string, password: string, email: string, username: string}
   */

  async function signup(details) {
    try {
      const res = await axios.post("auth/signup", details);
      const user = res.data;
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  // LOGGED IN USER IS AN EXPORT SOLELY TO BE USED BY THE SHELVES CONTEXT; DO NOT USE IT IN FRONT END COMPONENTS – INSTEAD USE CURRENTUSER, WHICH IS AN EXPORT FROM SHELVES CONTEXT
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        checkAuthentication,
        loggedInUser,
        isAuthenticated,
        credentialsAreInvalid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
