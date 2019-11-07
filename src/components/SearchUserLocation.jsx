import React, { useState, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import Axios from "axios"

import { Store } from "../Store"
import { searchRoot, headersRoot } from "../config/apiConfig"

import GetUserLocation from "./GetUserLocation"

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
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
  const { state, dispatch } = useContext(Store)

  const [localState, setLocalState] = useState({
    locationSearchTerm: ""
  })
  const classes = useStyles()

  const axios = Axios.create({
    baseURL: searchRoot,
    headers: headersRoot
  })

  const handleFetchClick = async event => {
    event.preventDefault()
    console.log(event.target)
    const response = await axios.get(
      `locations?query=${localState.locationSearchTerm}`
    )
    dispatch({
      type: "SEARCHED_LOCATION",
      payload: response.data.location_suggestions[0]
    })
    console.log("loc >", state)
  }

  const handleChange = event => {
    setLocalState({
      locationSearchTerm: event.target.value
    })
    console.log("LOC >", state)
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Postcode"
        inputProps={{ "aria-label": "postcode" }}
        onChange={handleChange}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={handleFetchClick}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <GetUserLocation />
    </Paper>
  )
}
