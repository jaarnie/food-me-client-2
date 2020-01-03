import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography, Grid, IconButton, Divider } from "@material-ui/core"
import { Place as PlaceIcon } from "@material-ui/icons"
import GoogleMapReact from "google-map-react"
import Axios from "axios"

import { searchRoot, headersRoot } from "../../config/apiConfig"
import { googleMapDeeplink } from "../../constants/index"
import RestaurantReview from "./RestaurantReviews"
import PhotoGallery from "../PhotoGallery"
import LikeButton from "../LikeButton"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
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
  const [reviews, setReviews] = useState({
    reviewsArray: null
  })
  const restaurant = props.location.state.restaurant

  const axios = Axios.create({
    baseURL: searchRoot,
    headers: headersRoot
  })

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`/reviews?res_id=${restaurant.id}`)
      setReviews({
        reviewsArray: response.data.user_reviews
      })
    }
    fetchReviews()
  }, [])

  const header = () => {
    return (
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
    )
  }

  const picturesAndMap = () => {
    const mapWidth = restaurant.photos ? 6 : 12
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={mapWidth}>
          <Paper className={classes.paper}>{getMap()}</Paper>
        </Grid>

        {restaurant.photos && (
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} style={{ height: "100%" }}>
              <PhotoGallery photos={restaurant.photos} />
            </Paper>
          </Grid>
        )}
      </Grid>
    )
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

  const ratingsAndReviews = () => {
    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          Overall Rating
          <Typography
            variant="h4"
            style={{ color: `#${restaurant.user_rating.rating_color}` }}
          >
            {restaurant.user_rating.aggregate_rating}
          </Typography>
          {restaurant.user_rating.rating_text}
          <Divider style={{ marginTop: "2vh" }} variant="middle" />
          {reviews.reviewsArray &&
            reviews.reviewsArray.map(r => (
              <RestaurantReview key={r.review.id} review={r.review} />
            ))}
        </Paper>
      </Grid>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {header()}

        {picturesAndMap()}

        {ratingsAndReviews()}
      </Grid>
    </div>
  )
}
