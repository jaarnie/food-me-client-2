import React, { useEffect } from "react"
import { Store } from "../../Store"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'center',
    marginBottom: '2vh'
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
    backgroundColor: "#235451",
    
  },
  input: {
    display: "none"
  }
}))

export default function OutlinedTextFields() {
  const { state, dispatch } = React.useContext(Store)
  const classes = useStyles()

  function handleChange(event) {
    let value = {
      type: "SEARCH_VALUE",
      payload: event.target.value
    }
    dispatch(value)
  }

  // useEffect(() => {
  //   console.log('useEffect', state)
  // }, [state])

  const fetchData = async event => {
    event.preventDefault()

    const value = state.searchValue

    const data = await fetch(
      `https://developers.zomato.com/api/v2.1/search?entity_id=61014&entity_type=subzone&q=${value}&count=50&radius=1000`,
      {
        headers: {
          "Content-Type": "application/json",
          "user-key": "87be592b7c816cd2e00737b271776b7f" // hide me
        }
      }
    )
    const response = await data.json()

    return dispatch({
      type: "FETCH_RESTARUANTS",
      payload: response
    })
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
        style={{justifyContent: 'center'}}
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          onClick={e => fetchData(e)}
        >
          Search
        </Button>
      </form>
    </div>
  )
}
