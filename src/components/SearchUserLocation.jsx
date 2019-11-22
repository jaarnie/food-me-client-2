import React, { useState, useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import NearMeIcon from "@material-ui/icons/NearMe"
import Axios from "axios"
import { useSnackbar } from "notistack"

import { Store } from "../Store"
import { searchRoot, headersRoot } from "../config/apiConfig"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "6px 18px",
    display: "flex",
    alignItems: "center",
		width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}))

export default function SearchUserLocation() {
	const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(Store)
  const [localState, setLocalState] = useState({
    locationSearchTerm: ""
  })

  const axios = Axios.create({
    baseURL: searchRoot,
    headers: headersRoot
  })

  const handleChange = event => {
    setLocalState({
      locationSearchTerm: event.target.value
    })
  }

  const handleFetchClick = async event => {
		event.preventDefault()
		enqueueSnackbar("thinking...", {
			variant: "info"
		})
		try {
			const response = await axios.get(
				`locations?query=${localState.locationSearchTerm}`
			)
			if (response.status === 200) {
				const lat = response.data.location_suggestions[0].latitude
				const lon = response.data.location_suggestions[0].longitude
				findLocationData(lat, lon)
			}
		}
		catch(err) {
			enqueueSnackbar("Error", {
        variant: "error"
      })
		}
  }

  const getGeoLocation = () => {
    window.navigator.geolocation.getCurrentPosition(position => {
			enqueueSnackbar("thinking...", {
				variant: "info"
			}) // try catch
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

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Where you goin'?"
        inputProps={{ "aria-label": "postcode" }}
        onChange={handleChange}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={handleFetchClick}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="search" onClick={getGeoLocation} >
        <NearMeIcon />
      </IconButton>
    </Paper>
  )
}
