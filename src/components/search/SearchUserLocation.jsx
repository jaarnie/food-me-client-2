import React, { useState, useContext, useEffect, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { IconButton, TextField } from "@material-ui/core/"
import { Search as SearchIcon, NearMe as NearMeIcon } from "@material-ui/icons"
import Axios from "axios"
import { useSnackbar } from "notistack"
import { useHistory } from "react-router-dom"

import { Store } from "../../Store"
import { searchRoot, headersRoot, postcodeAPI } from "../../config/apiConfig"

const useStyles = makeStyles(theme => ({
  root: {
    // margin: "6px 18px",
    marginTop: "3vh",
    // display: "flex",
    alignItems: "center",
    width: 200
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}))

export default function SearchUserLocation() {
  const history = useHistory()
  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(Store)

  const [localState, setLocalState] = useState({
    locationSearchTerm: ""
  })

  const axios = Axios.create({
    baseURL: searchRoot,
    headers: headersRoot
  })

  const axiosPostcode = Axios.create({
    baseURL: postcodeAPI
  })

  const handleChange = event => {
    setLocalState({
      locationSearchTerm: event.target.value
    })
  }

  const handleFetchClick = async event => {
    event.preventDefault()
    if (/\d/.test(localState.locationSearchTerm)) {
      enqueueSnackbar("thinking...", {
        variant: "info",
        persist: true
      })
      getPostcode()
    } else if (localState.locationSearchTerm !== "") {
      enqueueSnackbar("thinking...", {
        variant: "info",
        persist: true
      })
      getLocation()
    }
  }

  const getLocation = async () => {
    try {
      const response = await axios.get(
        `locations?query=${localState.locationSearchTerm}`
      )
      if (response.status === 200) {
        const lat = response.data.location_suggestions[0].latitude
        const lon = response.data.location_suggestions[0].longitude
        findLocationData(lat, lon)
      }
    } catch (err) {
      enqueueSnackbar("Error", {
        variant: "error"
      })
    }
  }

  const getPostcode = async () => {
    try {
      const response = await axiosPostcode.get(
        `/${localState.locationSearchTerm}`
      )
      if (response.status === 200) {
        const lat = response.data.result.latitude
        const lon = response.data.result.longitude
        findLocationData(lat, lon)
      }
    } catch (err) {
      enqueueSnackbar("Error", {
        variant: "error"
      })
    }
  }

  const getGeoLocation = () => {
    enqueueSnackbar("thinking...", {
      variant: "info",
      persist: true
    })
    window.navigator.geolocation.getCurrentPosition(position => {
      if (position) {
        dispatch({
          type: "GET_GEOLOCATION",
          payload: position
        })
      } else {
        enqueueSnackbar("Error", {
          variant: "error"
        })
      }
    })
  }

  const getLocationData = useCallback(async data => {
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
    closeSnackbar()

    history.push("/")
  }, [])

  const findLocationData = useCallback(async (userLat, userLong) => {
    const response = await axios.get(`geocode?lat=${userLat}&lon=${userLong}`)
    getLocationData(response.data)
  }, [])

  useEffect(() => {
    if (state.userGeoLocation) {
      const userLat = state.userGeoLocation.coords.latitude
      const userLong = state.userGeoLocation.coords.longitude
      findLocationData(userLat, userLong)
    }
    if (state.searchedLocation) {
      getLocationData(state.searchedLocation)
    }
  }, [
    findLocationData,
    getLocationData,
    state.searchedLocation,
    state.userGeoLocation
  ])

  return (
    <div className={classes.root}>
      <TextField
        id="standard-search"
        label="Where to?"
        placeholder="Town/Area/Postcode"
        className={classes.input}
        size="medium"
        type="search"
        onChange={handleChange}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={handleFetchClick}
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={getGeoLocation}
      >
        <NearMeIcon />
      </IconButton>
    </div>
  )
}
