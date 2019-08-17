import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import RestaurantCard from "../components/card/RestaurantCard"
import { Loading } from "../components/Loading"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}))

export default function ListContainer({ r, searchValue }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <React.Suspense fallback={Loading}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {r.restaurants.map(restaurant => {
              return <RestaurantCard r={restaurant} />
            })}
          </Grid>
        </Grid>
      </React.Suspense>
    </div>
  )
}
