import React, { useEffect, useContext } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import { Store } from "../Store"
import { MAIN_COLOUR } from '../constants/index'
import Search from "./search/Search"
import ListContainer from "../containers/ListContainer"
// import { fetchFavorites } from "./FetchFavorites"
// import { Loading } from "./Loading"

// const ListContainer = React.lazy(() => import('../containers/ListContainer'))

const useStyles = makeStyles({
  title: {
    color: MAIN_COLOUR
  }
})

export default function Home() {
  const classes = useStyles()
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    console.log("Home", state)
    // debugger
    // state.user && fetchFavorites(state.user, dispatch)
  }, [])

  const getTitle = () =>
    state.userLocation
      ? state.userLocation.location.title.split(", ")[0]
      : state.title

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {getTitle()}
      </Typography>
      <Search />
      {/* <React.Suspense fallback={Loading()}> */}
      {state.restaurants && <ListContainer />}
      {/* </React.Suspense> */}
    </>
  )
}
