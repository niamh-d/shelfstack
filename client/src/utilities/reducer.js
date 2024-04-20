/* eslint-disable no-case-declarations */
// REDUCER FUNCTION – THIS FUNCTION MANIPULATES STATE; IT RECEIVES THE PRESENT STATE SNAPSHOT AND AN ACTION OBJECT; THE ACTION OBJECT HAS TWO PROPERTIES: TYPE AND PAYLOAD
export default function reducer(state, action) {
  switch (action.type) {
    case "RESET_CURRENT_USER":
      return {
        ...state,
        currentUser: null,
        usersShelves: [],
        usersFavorites: [],
        displayedUsersShelves: [],
        displayedUsersFavorites: [],
      };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_USERS_SHELVES":
      return {
        ...state,
        usersShelves: action.payload,
        displayedUsersShelves: action.payload,
      };
    case "SET_USERS_FAVORITES":
      return {
        ...state,
        usersFavorites: action.payload,
        displayedUsersFavorites: action.payload,
      };
    case "SET_DISPLAYED_USERS_FAVORITES":
      return {
        ...state,
        displayedUsersFavorites: action.payload,
      };
    case "SET_DISPLAYED_USERS_SHELVES":
      return { ...state, displayedUsersShelves: action.payload };
    case "SET_USERS_SHELVES_ITEMS":
      return { ...state, usersShelvesItems: action.payload };
    case "SET_ITEMS_FOR_ONE_SHELF":
      const { shelfId } = action.payload;
      const appItems = [
        ...state.appsShelvesItems.filter((shelf) => shelf.shelfId !== shelfId),
        action.payload,
      ];
      const usersItems = [
        ...state.usersShelvesItems.filter((shelf) => shelf.shelfId !== shelfId),
        action.payload,
      ];
      return {
        ...state,
        appsShelvesItems: appItems,
        usersShelvesItems: usersItems,
      };
    case "SET_APPS_SHELVES":
      return {
        ...state,
        appsShelves: action.payload,
        displayedAppsShelves: action.payload,
      };
    case "SET_DISPLAYED_APPS_SHELVES":
      return { ...state, displayedAppsShelves: action.payload };
    case "SET_APPS_SHELVES_ITEMS":
      return { ...state, appsShelvesItems: action.payload };
    default:
      throw new Error("Unknown action.");
  }
}
