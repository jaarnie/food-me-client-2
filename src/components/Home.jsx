import React, { useEffect, useContext } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import { Store } from "../Store"
import { MAIN_COLOUR } from '../constants/index'
import Search from "./search/Search"
import ListContainer from "../containers/ListContainer"
// import { Loading } from "./Loading"

// const ListContainer = React.lazy(() => import('../containers/ListContainer'))

const useStyles = makeStyles({
  title: {
    color: MAIN_COLOUR
  }
})

export default function Home() {
  const classes = useStyles()
  const { state } = useContext(Store)

  useEffect(() => {
    console.log("Home", state)
  }, [state])

  const getTitle = () =>
    state.userLocation
      ? state.userLocation.location.title.split(", ")[0]
      : state.title

  // const getTitle = () => {
  //   const userLocation = state.userLocation
  //   let title = ""
  //   if (userLocation.location) {
  //     title = userLocation.location.title.split(", ")[0]
  //   } else if (userLocation.title) {
  //     title = userLocation.title.split(", ")[0]
  //   } else {
  //     title = state.title
  //   }
  //   debugger
  //   return title
  // }

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
