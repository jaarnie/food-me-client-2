import React, { useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import NearMeIcon from "@material-ui/icons/NearMe"
import { IconButton } from "@material-ui/core"
import Axios from "axios"

import { searchRoot, headersRoot } from "../config/apiConfig"
import { Store } from "../Store"
import { Loading } from "./Loading"

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: "#235451"
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}))

export default function GetUserLocation() {
  const { state, dispatch } = useContext(Store)

  const axios = Axios.create({
    baseURL: searchRoot,
    headers: headersRoot
  })

  const getGeoLocation = async () => {
    await window.navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      dispatch({
        type: "GET_GEOLOCATION",
        payload: position
      })
    })
    // if (state.userGeoLocation === null) {
    //   console.log('no user loc data')
    // }
  }

  useEffect(() => {
    console.log("useEffect", state.userGeoLocation)
    if (state.userGeoLocation) {
      const userLat = state.userGeoLocation.coords.latitude
      const userLong = state.userGeoLocation.coords.longitude
      findLocationData(userLat, userLong)
    }
    if (state.searchedLocation) {
      getLocationData(state.searchedLocation)
    }
  }, [state.userGeoLocation])

  const findLocationData = async (userLat, userLong) => {
    const response = await axios.get(`geocode?lat=${userLat}&lon=${userLong}`)

    getLocationData(response.data)
  }

  const getLocationData = async data => {
    let entityId = ""
    let entityType = ""
    if (data.location) {
      entityId = data.location.entity_id
      entityType = data.location.entity_type
    }
    if (data.searchedLocation) {
      entityId = data.searchedLocation.entity_id
      entityType = data.searchedLocation.entity_type
    }

    const locationData = await axios.get(
      `location_details?entity_id=${entityId}&entity_type=${entityType}`
    )
    dispatch({
      type: "SET_LOCATION",
      payload: locationData.data
    })
    dispatch({
      type: "SET_RESTARUANTS",
      payload: locationData.data.best_rated_restaurant
    })
  }

  useEffect(() => {
    console.log("state", state)
  })
  const classes = useStyles()
  return (
    <div>
      <IconButton
        edge="start"
        className={classes.icon}
        color="inherit"
        aria-label="get user location button"
        onClick={getGeoLocation}
      >
        <NearMeIcon />
      </IconButton>
    </div>
  )
}
