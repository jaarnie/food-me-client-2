import React from 'react'

export const Store = React.createContext()

const initialState = {
  user: null,
  restaurants: null,
  favorites: [],
  searchValue: "",
  userGeoLocation: null,
  userLocation: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_RESTARUANTS":
      return { ...state, restaurants: action.payload }

    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] }

    case "REMOVE_FAVORITE":
      return { ...state, favorites: action.payload }

    case "SEARCH_VALUE":
      return { ...state, searchValue: action.payload }

    case "FETCH_USER":
      return { ...state, user: action.payload }

    case "GET_GEOLOCATION":
      return { ...state, userGeoLocation: action.payload }

    case "SET_LOCATION":
      return {...state, userLocation: action.payload }

    default:
      return { ...state, user: action.payload }
  }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = { state, dispatch }
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
