import React, {useContext, useState } from "react"
import { Store } from "../../Store"
import { makeStyles } from "@material-ui/core/styles"
import { TextField, Button } from "@material-ui/core"
import { useSnackbar } from "notistack"
import Axios from "axios";

import { searchRoot, headersRoot } from '../../config/apiConfig.js'
import { Loading } from "../Loading"
import SearchTest from './SearchTest'

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
    backgroundColor: "#235451"
  },
  input: {
    display: "none"
  }
}))



export default function OutlinedTextFields() {
  const { state, dispatch } = useContext(Store)
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  
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

  function clearData(event) { // clear search bar
    event.preventDefault()
    return dispatch({
      type: "SET_RESTARUANTS",
      payload: null
    })
  }

  const fetchData = async (event) => {
    event.preventDefault()
    let searchValue = ""
    const value = state.searchValue
    if (value) {
      searchValue = `/search?entity_id=${
        state.userLocation ? state.userLocation.location.entity_id : null
      }&entity_type=subzone&q=${value}&count=50&radius=1000`
    } else {
      searchValue =
      "https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city"
    }

    const response = await axios.get(searchValue)
    handleError(response.data)
    console.log('RESPONSE>', response)
    return dispatch({
      type: "SET_RESTARUANTS",
      payload: response.data.restaurants
    })
  }

  // const fetchData = (e) => {
  //   e.preventDefault()
  //   return <SearchTest />
  // }

 

  //   const value = state.searchValue
  //   const [{ data, loading, error }, fetchData] = useAxios(
  //     `/search?entity_id=${
  //       state.userLocation ? state.userLocation.location.entity_id : null
  //     }&entity_type=subzone&q=${value}&count=50&radius=1000`,
  //     )
  //     console.log(fetchData)

  // if (loading) {
  //   return (
  //     <div className={classes.centeredContent}>
  //       <Loading />
  //     </div>
  //   )
  // }

  // debugger

  function handleError(response) {
    if (response.results_found === 0) {
      enqueueSnackbar("No results found", {
        variant: "warning"
      })
      dispatch({
        type: "SET_TITLE",
        payload: "no results found :("
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
          onClick={e => fetchData(e)}
          // onClick={fetchData}
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
        {/* <Loading /> */}
      </form>
    </div>
  )
}
