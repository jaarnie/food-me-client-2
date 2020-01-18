import React from "react"

export const Store = React.createContext()

const initialState = {
  // user: {
  //   email: "2@2",
  //   first_name: "Adam",
  //   id: 1,
  //   last_name: "Arnold",
  //   favourites: [
  //     {
  //       id: 29,
  //       res_id: 6103211,
  //       user_id: 1,
  //       created_at: "2019-11-22T14:34:31.426Z",
  //       updated_at: "2019-11-22T14:34:31.426Z"
  //     },
  //     {
  //       id: 31,
  //       res_id: 6114829,
  //       user_id: 1,
  //       created_at: "2019-11-22T14:34:33.765Z",
  //       updated_at: "2019-11-22T14:34:33.765Z"
  //     }
  //   ]
  // },
  user: null,
  restaurants: null,
  filteredRestaurants: null,
  favorites: [],
  searchValue: "",
  userGeoLocation: null,
  userLocation: null,
  title: "hello"
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_RESTARUANTS":
      return { ...state, restaurants: action.payload }

    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] }

    case "REMOVE_FAVORITE":
      return { ...state, favorites: action.payload }

    case "SEARCH_VALUE":
      return { ...state, searchValue: action.payload }

    case "SET_USER":
      return { ...state, user: action.payload }

    case "GET_GEOLOCATION":
      return { ...state, userGeoLocation: action.payload }

    case "SET_LOCATION":
      return { ...state, userLocation: action.payload }

    case "SET_TITLE":
      return { ...state, title: action.payload }

    case "FILTERED_RESTAURANTS":
      return { ...state, filteredRestaurants: action.payload}

    default:
      return { ...state }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
