import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography, Grid, IconButton } from "@material-ui/core"
import { Place as PlaceIcon } from "@material-ui/icons"
import GoogleMapReact from "google-map-react"

import { googleMapDeeplink } from "../constants/index"
import RestaurantReview from "./RestaurantReviews"
import PhotoGallery from "./PhotoGallery"
import LikeButton from "./LikeButton"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
    // list: {
    //   marginbottom: '200px'
    // }
  },
  icon: {
    flexGrow: 1,

    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "row wrap",
    justifyContent: "center"
  }
}))

export default function RestaurantProfile(props) {
  const classes = useStyles()
  const restaurant = props.location.state.restaurant

  const getReviews = () => {
    //sort me out
    return !!restaurant.all_reviews.reviews[0] &&
      restaurant.all_reviews.reviews[0].review.length !== 0 ? (
      restaurant.all_reviews.reviews.map(r => (
        <RestaurantReview key={r.review.id} reviews={r.review} />
      ))
    ) : (
      <Typography variant="subtitle1">reviews offline :/</Typography>
    )
  }

  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: {
        lat: parseFloat(restaurant.location.latitude),
        lng: parseFloat(restaurant.location.longitude)
      },
      map,
      title: "Hello World!"
    })
    return marker
  }

  const getMap = () => {
    return (
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBStIe0h0kWHmY-GvIsdMXA-JuJ34SnmXU" }}
          defaultCenter={[
            parseFloat(restaurant.location.latitude),
            parseFloat(restaurant.location.longitude)
          ]}
          defaultZoom={16}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
          {/* <PlaceIcon /> */}
        </GoogleMapReact>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      {console.log(restaurant)}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <Paper className={classes.paper} style={{backgroundImage: `url(${restaurant.featured_image})`}} > */}
          {/* <Paper className={classes.paper} style={{background: MAIN_COLOUR}} > */}
          <Paper className={classes.paper}>
            <Typography variant="h3">{restaurant.name}</Typography>
            <Typography variant="h6">{restaurant.location.address}</Typography>

            <div className={classes.icon}>
              <LikeButton restaurant={restaurant} />
              <IconButton
                aria-label="place"
                target="_blank"
                href={googleMapDeeplink(restaurant)}
              >
                <PlaceIcon />
              </IconButton>
            </div>
          </Paper>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>{getMap()}</Paper>
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
            {restaurant.user_rating.rating_text}
          </Paper>
          {restaurant.photos && (
            <Paper className={classes.paper}>
              <PhotoGallery photos={restaurant.photos} />
            </Paper>
          )}
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
