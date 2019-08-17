import React from 'react'

export const Store = React.createContext()

const initialState = {
    restaurants: null,
    searchValue: "burgers",
}

function reducer(state, action) {
    switch(action.type) {
        case "FETCH_RESTARUANTS":
            return { ...state, restaurants: action.payload }
        case "SEARCH_VALUE":
            return { ...state, searchValue: action.payload}
        
        default:
            return { ...state }
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = { state, dispatch }
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
