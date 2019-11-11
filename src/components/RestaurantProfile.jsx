import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography, Grid, IconButton } from "@material-ui/core"
import { Place as PlaceIcon } from "@material-ui/icons"

import RestaurantReview from "./RestaurantReviews"

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

export default function RestaurantProfile(props) {
  const classes = useStyles()
  const restaurant = props.location.state.restaurant
  console.log("PROFILE >", restaurant)

  const getReviews = () => {
    return restaurant.all_reviews.reviews.map(r => (
      <RestaurantReview key={r.review.id} reviews={r.review} />
    ))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3">{restaurant.name}</Typography>
            <Typography variant="h6">{restaurant.location.address}</Typography>
            <IconButton
              aria-label="place"
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${restaurant.location.address}`}
            >
              <PlaceIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>{getReviews()}</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            Overall Rating
            <Typography
              variant="h4"
              style={{ color: `#${restaurant.user_rating.rating_color}` }}
            >
              {restaurant.user_rating.aggregate_rating}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  )
}
