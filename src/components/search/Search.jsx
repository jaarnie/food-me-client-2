import React, { useContext } from "react"
import { Store } from "../../Store"
import { makeStyles } from "@material-ui/core/styles"
import { TextField, Button } from "@material-ui/core"
import { useSnackbar } from "notistack"
import Axios from "axios"

import { searchRoot, headersRoot } from "../../config/apiConfig.js"
import { MAIN_COLOUR } from "../../constants"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "2vh"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: MAIN_COLOUR
  },
  input: {
    display: "none"
  }
}))

export default function Search() {
  const { state, dispatch } = useContext(Store)
  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const axios = Axios.create({
    baseURL: searchRoot,
    headers: headersRoot
  })

  function handleChange(event) {
    let value = {
      type: "SEARCH_VALUE",
      payload: event.target.value
    }
    dispatch(value)
  }

  function clearData(event) {
    // clear search bar
    event.preventDefault()
    return dispatch({
      type: "SET_RESTARUANTS",
      payload: null
    })
  }

  const fetchData = async event => {
    event.preventDefault()
    enqueueSnackbar("thinking...", {
      variant: "info",
      persist: true
    })
    let searchValue = ""
    const value = state.searchValue
    const locationID =
      state.userLocation && state.userLocation.location.entity_id

    if (value) {
      searchValue = `/search?entity_id=61&entity_type=city&q=${value}&count=50&radius=1000`
    }

    if (locationID) {
      searchValue = `/search?entity_id=${locationID &&
        locationID}&entity_type=subzone&count=50&radius=1000`
    }

    if (value && locationID) {
      searchValue = `/search?entity_id=${locationID &&
        locationID}&entity_type=subzone&q=${value}&count=50&radius=1000`
    }

    if (!locationID && !value) {
      searchValue = "/search?entity_id=61&entity_type=city"
    }

    try {
      const response = await axios.get(searchValue)
      if (response.data.results_found !== 0 && response.status === 200) {
        console.log("RESPONSE>", response)
        dispatch({
          type: "SET_RESTARUANTS",
          payload: response.data.restaurants
        })
        closeSnackbar()
      } else if (response.data.results_found === 0) {
        enqueueSnackbar("No results found", {
          variant: "warning"
        })
        dispatch({
          type: "SET_TITLE",
          payload: "no results found :("
        })
      }
    } catch (err) {
      console.log("SEARCH ERROR >", err)
      enqueueSnackbar(err, {
        variant: "error"
      })
    }
  }

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-with-placeholder"
          label="Nom nom"
          placeholder="eg. Burgers"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          fullWidth
          type="search"
          onChange={handleChange}
        />
        <Button
          style={{ justifyContent: "center" }}
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          onClick={fetchData}
        >
          Search
        </Button>
        {state.restaurants && (
          <Button
            style={{ justifyContent: "center" }}
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            onClick={clearData}
          >
            Clear
          </Button>
        )}
      </form>
    </div>
  )
}
