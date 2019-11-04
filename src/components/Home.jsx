import React, { useEffect } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Store } from "../Store"

import Search from "./search/Search"
import ListContainer from "../containers/ListContainer"
import SearchUserLocation from './SearchUserLocation'
// import { Loading } from "./Loading"

// const ListContainer = React.lazy(() => import('../containers/ListContainer'))


const useStyles = makeStyles({
  title: {
    color: "#235451"
  }
})

export default function Home() {
  const classes = useStyles()
  const { state } = React.useContext(Store)

  useEffect(() => {
    console.log("Home", state)
  }, [state])

  return (
    <>
    <SearchUserLocation />
      <Typography className={classes.title} variant="h3">
        {state.userLocation
          ? state.userLocation.location.title.split(", ")[0]
          : state.title}
      </Typography>
      <Search />
      {/* <React.Suspense fallback={Loading()}> */}
        {state.restaurants && <ListContainer /> }
      {/* </React.Suspense> */}
    </>
  )
}
