import React, { useEffect } from "react"
import { Store } from "../Store"

import Search from "./search/Search"
import ListContainer from "../containers/ListContainer"
import { Loading } from "./Loading"

export default function Home() {
  const { state, dispatch } = React.useContext(Store)

  useEffect(() => {
    console.log("Home", state)
  }, [state])

  const props = {
    restaurants: state.restaurants,
    searchValue: state.searchValue
  }

  return (
    <React.Fragment>
      <Search />
      <React.Suspense fallback={Loading}>
        {state.restaurants ? (
          <ListContainer r={state.restaurants} {...props} />
        ) : null}
      </React.Suspense>
    </React.Fragment>
  )
}
