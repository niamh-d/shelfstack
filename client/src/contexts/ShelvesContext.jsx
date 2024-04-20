/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

import { categories } from "../data/data";
import { useAuth } from "./AuthContext";
import reducer from "../utilities/reducer";
import {
  renderItemsObjs,
  convertShelfObjectNames,
  filterShelvesForSelectedCategory,
  sortShelves,
} from "../utilities/functions";

const ShelvesContext = createContext();

const initialState = {
  currentUser: null,
  usersShelves: [],
  appsShelves: [],
  usersFavorites: [],
  categoriesArray: categories,
  displayedUsersShelves: [],
  displayedAppsShelves: [],
  displayedUsersFavorites: [],
};

function ShelvesProvider({ children }) {
  // USEREDUCER RETURNS AN ARRAY WITH TWO ITEMS – PRESENT STATE SNAPSHOT AND DISPATCH; BELOW STATE IS IMMEDIATELY DESTRUCTURED; DISPATCH IS A FUNCTION WHICH RECEIVES AN ACTION TYPE AND A DATA PAYLOAD; THE ACTION TYPE TELLS THE REDUCER WHICH MANIPULATION TO EXECUTE AND THE DATA PAYLOAD REPRESENTS THE INJECTED DATA THAT IS UTILISED DURING THE MANIPULATION OF STATE
  const [
    {
      currentUser,
      usersShelves,
      usersShelvesItems,
      usersFavorites,
      displayedUsersFavorites,
      appsShelves,
      appsShelvesItems,
      displayedAppsShelves,
      displayedUsersShelves,
      categoriesArray,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { loggedInUser } = useAuth();

  // GETS ALL SHELVES FOR THE APP UPON EVERY RENDER
  useEffect(() => {
    getAppsShelves();
  }, []);

  // THIS FUNCTION SETS LOGGED IN USER COMING FROM AUTHENTICATION CONTEXT AS THE CURRENT USER IN THE SHELVES CONTEXT. LOGGED IN USER IS SOLELY TO BE USED BY THE SHELVES CONTEXT; DO NOT USE IT IN FRONT END COMPONENTS – INSTEAD USE CURRENTUSER, WHICH IS AN EXPORT FROM THIS CONTEXT
  useEffect(() => {
    if (loggedInUser)
      dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });
    if (!loggedInUser) {
      dispatch({ type: "SET_CURRENT_USER", payload: null });
      dispatch({ type: "RESET_CURRENT_USER" });
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (!currentUser) return;

    getUsersShelves();
  }, [currentUser]);

  // TRIGGERS GETTING ALL ITEMS FOR THE USER'S SHELVES
  useEffect(() => {
    if (!usersShelves || !usersShelves.length) return;

    getItemsForUsersShelves();
    getAppsShelves();
    getUsersFavorites();
  }, [usersShelves]);

  // TRIGGERS GETTING ALL ITEMS FOR ALL APP'S PUBLIC SHELVES
  useEffect(() => {
    if (!appsShelves || !appsShelves.length) return;

    getItemsForAppsShelves();
  }, [appsShelves]);

  // GET ALL SHELVES FOR THE APP WHERE IS_PUBLIC IS SET TO 1 (TRUE)
  async function getAppsShelves() {
    try {
      const res = await axios.get("/shelves/all/app");

      const shelves = res.data;

      // if there is an array of shelves returned from the backend (we test this by checking for an item as the zero index), set the response as the user's shelves
      if (shelves[0]) {
        const shelvesWithCamelCasePropertyNames =
          convertShelfObjectNames(shelves);

        dispatch({
          type: "SET_APPS_SHELVES",
          payload: shelvesWithCamelCasePropertyNames,
        });
      }

      // if there is an error property on the response throw a new error
      const { error } = res;
      if (error) throw new Error(error);

      // if the response is undefined or the response is an empty array, throw a new error
      if (!shelves || !shelves[0])
        throw new Error("Something went wrong fetching the app's shelves.");
    } catch (err) {
      console.error(err);
    }
  }

  // loop a shelves array and get items
  async function loopShelvesArrayAndGetItems(array) {
    const items = new Array();
    for (let shelf of array) {
      const arr = await getAllItemsForOneShelf(shelf.shelfId);
      if (arr.length) items.push({ shelfId: shelf.shelfId, items: arr });
    }
    return items;
  }

  // Get all items for the app's shelves
  async function getItemsForAppsShelves() {
    const items = await loopShelvesArrayAndGetItems(appsShelves);

    dispatch({ type: "SET_APPS_SHELVES_ITEMS", payload: items });
  }

  // Get all items for the user's shelves
  async function getItemsForUsersShelves() {
    const items = await loopShelvesArrayAndGetItems(usersShelves);

    dispatch({ type: "SET_USERS_SHELVES_ITEMS", payload: items });
  }

  // GET ALL ITEMS FOR A SHELF
  async function getAllItemsForOneShelf(shelfId) {
    try {
      const res = await axios.get(`/items/shelf?shelfId=${shelfId}`);

      const items = res.data;

      if (items) return renderItemsObjs(items);

      // if there is an error property on the response throw a new error
      const { error } = res;
      if (error) throw new Error(error);
    } catch (err) {
      console.error(err);
    }
  }

  // GET ALL SHELVES FOR THE CURRENT USER
  async function getUsersFavorites() {
    try {
      const { userId } = currentUser;
      const res = await axios.get(`/favorites/all/user?userId=${userId}`);

      const shelves = res.data;

      // if there is an array of shelves returned from the backend (we test this by checking for an item as the zero index), set the response as the user's favorites
      if (shelves[0]) {
        dispatch({
          type: "SET_USERS_FAVORITES",
          payload: shelves,
        });
      }

      // if there is an error property on the response throw a new error
      const { error } = shelves;
      if (error) throw new Error(error);

      // if the response is undefined or the response is an empty array, throw a new error
      if (!shelves)
        throw new Error("Something went wrong fetching the user's favorites.");
    } catch (err) {
      console.error(err);
    }
  }

  // GET ALL SHELVES FOR THE CURRENT USER
  async function getUsersShelves() {
    try {
      const { userId } = currentUser;
      const res = await axios.get(`/shelves/all/user?userId=${userId}`);

      const shelves = res.data;

      // if there is an array of shelves returned from the backend (we test this by checking for an item as the zero index), set the response as the user's shelves
      if (shelves[0]) {
        const shelvesWithCamelCasePropertyNames =
          convertShelfObjectNames(shelves);

        dispatch({
          type: "SET_USERS_SHELVES",
          payload: shelvesWithCamelCasePropertyNames,
        });
      }

      // if there is an error property on the response throw a new error
      const { error } = shelves;
      if (error) throw new Error(error);

      // if the response is undefined or the response is an empty array, throw a new error
      if (!shelves)
        throw new Error("Something went wrong fetching the user's shelves.");
    } catch (err) {
      console.error(err);
    }
  }

  // ADDS NEW SHELF FOR CURRENT USER – receives an object of details from the front-end component that called the function

  /**
   * addShelf take one argument, an object of below shape
   * @param {obj} newShelfDetails
   * {shelfName: string,
   * shelfDescription: string,
   * category: string,
   * isPublic: bool}
   */

  async function addShelf(newShelfDetails) {
    try {
      const { userId } = currentUser;

      // in case of successful creation of a shelf, the backend returns a string
      const res = await axios.post(
        `/shelves/shelf/new?userId=${userId}`,
        newShelfDetails
      );

      const { error } = res.data;

      // if there is no error property, query backend for all shelves for the current user
      if (!error) getUsersShelves();

      // otherwise, throw new error as something has gone wrong
      if (error) throw new Error(error);
    } catch (err) {
      console.error(err);
    }
  }

  // ADDS NEW ITEM FOR GIVEN SHELF – receives an object of details from the front-end component that called the function

  /**
   * addShelf requires two arguments: an object of below shape and a number
   * @param {obj} newItemDetails {url: string}
   * @param {number} shelfId
   */

  async function addItemToShelf(newItemDetails, shelfId) {
    try {
      // in case of successful creation of an item, the backend returns a string
      const res = await axios.post(
        `/items/item/new?shelfId=${shelfId}`,
        newItemDetails
      );

      // otherwise, throw new error as something has gone wrong
      const { error } = res.data;
      if (error) throw new Error(error);

      const items = await getAllItemsForOneShelf(shelfId);

      dispatch({
        type: "SET_ITEMS_FOR_ONE_SHELF",
        payload: { items, shelfId },
      });
    } catch (err) {
      console.error(err);
    }
  }

  // FILTERING AND SORTING

  /**
   * filterAndSortShelves takes two arguments: an object of below shape and a string
   * @param {obj} criteria {category: string, sort: string}
   * @param {string} arrayType – "app" for app's shelves, "user" for user's shelves, "favor" for user's favorites
   */

  function filterAndSortShelves(criteria, arrayType) {
    const arraySelection = {
      app: {
        shelves: appsShelves,
        actionType: "APPS_SHELVES",
      },
      user: {
        shelves: usersShelves,
        actionType: "USERS_SHELVES",
      },
      favor: {
        shelves: usersFavorites,
        actionType: "USERS_FAVORITES",
      },
    };

    const { category: selectedCategory, sort: sortType } = criteria;

    const { shelves, actionType } = arraySelection[arrayType];

    let filteredShelves;

    if (selectedCategory === "all") filteredShelves = shelves;
    else
      filteredShelves = filterShelvesForSelectedCategory(
        shelves,
        selectedCategory
      );

    const displayedShelves = sortShelves(filteredShelves, sortType);

    dispatch({
      type: `SET_DISPLAYED_${actionType}`,
      payload: displayedShelves,
    });
  }

  async function getUser() {
    const { userId } = currentUser;

    try {
      const res = await axios.get(`/users/user?userId=${userId}`);

      const user = res.data;
      const { error } = res.data;

      if (error) throw new Error("Something went wrong fetching user details.");
      else dispatch({ type: "SET_CURRENT_USER", payload: user });
    } catch (err) {
      console.log(err);
    }
  }

  async function addUserAvatar(avatar) {
    const { userId } = currentUser;

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("avatar", avatar);

    try {
      // Request made to the backend api
      // Send formData object
      const res = await axios.put(
        `/users/image/add?userId=${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { error } = res.data;

      if (error)
        throw new Error("Something went wrong setting the user's avatar.");
      else getUser();
    } catch (err) {
      console.log(err);
    }
  }

  async function favorShelf(shelfId) {
    try {
      const { userId } = currentUser;

      const res = await axios.post(
        `/favorites/new?userId=${userId}&shelfId=${shelfId}`
      );

      const { error } = res.data;

      if (!error) getUsersFavorites();

      if (error) throw new Error(error);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeFavor(shelfId) {
    try {
      const { userId } = currentUser;

      const res = await axios.delete(
        `/favorites/remove?userId=${userId}&shelfId=${shelfId}`
      );

      const { error } = res.data;

      if (!error) getUsersFavorites();

      if (error) throw new Error(error);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ShelvesContext.Provider
      value={{
        // objects
        currentUser,
        // arrays with strings
        categoriesArray,
        // arrays with object items
        usersShelves,
        usersShelvesItems,
        usersFavorites,
        appsShelves,
        appsShelvesItems,
        displayedAppsShelves,
        displayedUsersShelves,
        displayedUsersFavorites,
        // functions
        addShelf,
        addItemToShelf,
        getAppsShelves,
        getUsersShelves,
        filterAndSortShelves,
        addUserAvatar,
        favorShelf,
        removeFavor,
      }}
    >
      {children}
    </ShelvesContext.Provider>
  );
}

function useShelves() {
  const context = useContext(ShelvesContext);

  if (context === undefined)
    throw new Error("ShelvesContext used outside of ShelvesProvider");
  return context;
}

export { ShelvesProvider, useShelves };
