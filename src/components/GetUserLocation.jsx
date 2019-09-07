import React, { useContext, useEffect } from "react"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import NearMe from "@material-ui/icons/NearMe"

import { Store } from "../Store"

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
    await window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
        dispatch({
          type: "GET_GEOLOCATION",
          payload: position
        })
      }
    )
    // if (state.userGeoLocation === null) {
    //   console.log('no user loc data')
    // }
  }

  useEffect(() => {
    console.log('useEffect', state.userGeoLocation)
    if (state.userGeoLocation) {
      const userLat = state.userGeoLocation.coords.latitude
      const userLong = state.userGeoLocation.coords.longitude
      findLocationData(userLat, userLong)
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
  };


  const getLocationData = async (dataJSON) => {
    const data = await fetch(
      `https://developers.zomato.com/api/v2.1/location_details?entity_id=${dataJSON.location.entity_id}&entity_type=${dataJSON.location.entity_type}`,
      {
        headers: {
          "Content-Type": "application/json",
          "user-key": "87be592b7c816cd2e00737b271776b7f"
        }
      }
    )
    const locationData = await data.json()
    return dispatch({
      type: "SET_LOCATION",
      payload: locationData,
    })
  }

  useEffect(() => {
    console.log('state', state)

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
        <NearMe />
      </IconButton>
    </div>
  )
}
