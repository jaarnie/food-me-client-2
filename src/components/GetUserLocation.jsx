import React, { useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import NearMeIcon from "@material-ui/icons/NearMe"
import { IconButton } from "@material-ui/core"

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
    const data = await fetch(
      `https://developers.zomato.com/api/v2.1/geocode?lat=${userLat}&lon=${userLong}`,
      {
        headers: {
          "Content-Type": "application/json",
          "user-key": "87be592b7c816cd2e00737b271776b7f"
        }
      }
    )
    const dataJSON = await data.json()
    getLocationData(dataJSON)
  }

  const getLocationData = async dataJSON => {
    let entityId = ''
    let entityType = ''
    if (dataJSON.location) {
      entityId = dataJSON.location.entity_id
      entityType = dataJSON.location.entity_type
    }
    if (dataJSON.searchedLocation) {
      entityId = dataJSON.searchedLocation.entity_id
      entityType = dataJSON.searchedLocation.entity_type
    }

    debugger

    const data = await fetch(
      `https://developers.zomato.com/api/v2.1/location_details?entity_id=${entityId}&entity_type=${entityType}`,
      {
        headers: {
          "Content-Type": "application/json",
          "user-key": "87be592b7c816cd2e00737b271776b7f"
        }
      }
    )
    const locationData = await data.json()
    // debugger
    dispatch({
      type: "SET_LOCATION",
      payload: locationData
    })
    dispatch({
      type: "SET_RESTARUANTS",
      payload: locationData.best_rated_restaurant
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
