import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import { Store } from "../Store"
import { Loading } from '../components/Loading'

const RestaurantCard = React.lazy(() => import('../components/card/RestaurantCard'))

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

export default function ListContainer({ r, searchValue }) {
  const { state } = useContext(Store)
  const classes = useStyles()
// debugger
  return ( // remove suspense?
    <div className={classes.root}>
      <React.Suspense fallback={Loading()}>
        <Grid container spacing={2}>
          {state.favorites.map((restaurant, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <RestaurantCard r={restaurant} />
            </Grid>
          ))}
        </Grid>
      </React.Suspense>
    </div>
  )
}
