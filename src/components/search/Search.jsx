import React from "react"
import { Store } from "../../Store"
import { makeStyles } from "@material-ui/core/styles"
import { TextField, Button } from "@material-ui/core"
import { useSnackbar } from "notistack"

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
  const { state, dispatch } = React.useContext(Store)
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  function handleChange(event) {
    let value = {
      type: "SEARCH_VALUE",
      payload: event.target.value
    }
    dispatch(value)
  }

  function clearData(event) {
    event.preventDefault()
    return dispatch({
      type: "SET_RESTARUANTS",
      payload: null
    })
  }

  const fetchData = async event => {
    event.preventDefault()
    let searchValue = ""
    if (state.searchValue) {
      const value = state.searchValue
      searchValue = `https://developers.zomato.com/api/v2.1/search?entity_id=${
        state.userLocation ? state.userLocation.location.entity_id : null
      }&entity_type=subzone&q=${value}&count=50&radius=1000`
    } else {
      searchValue =
        "https://developers.zomato.com/api/v2.1/search?entity_id=61&entity_type=city"
    }

    const data = await fetch(searchValue, {
      headers: {
        "Content-Type": "application/json",
        "user-key": "87be592b7c816cd2e00737b271776b7f" // hide me
      }
    })
    const response = await data.json()
    console.log(response)
    handleError(response)

    return dispatch({
      type: "SET_RESTARUANTS",
      //payload: response
      payload: response.restaurants
    })
  }

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

  React.useEffect(() => {
    console.log(state)
  }, [state])

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
