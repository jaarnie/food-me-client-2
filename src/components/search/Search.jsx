import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import Axios from 'axios'
import { Store } from '../../Store'

import { searchRoot, headersRoot } from '../../config/apiConfig'
import { MAIN_COLOUR } from '../../constants'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '2vh',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: MAIN_COLOUR,
  },
  input: {
    display: 'none',
  },
}))

const Search = () => {
  const { state, dispatch } = useContext(Store)
  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [searchValue, setSearchVaue] = useState('')

  const axios = Axios.create({
    baseURL: searchRoot,
    headers: headersRoot,
  })

  const handleChange = (event) => {
    const { value } = event.target
    setSearchVaue(value)
  }

  function clearData(event) {
    event.preventDefault()
    return dispatch({
      type: 'SET_RESTARUANTS',
      payload: null,
    })
  }

  const fetchData = async (event) => {
    event.preventDefault()
    enqueueSnackbar('thinking...', {
      variant: 'info',
      persist: true,
    })

    let searchUrl = ''
    const locationID = state.userLocation && state.userLocation.location.entity_id

    if (searchValue) {
      searchUrl = `/search?entity_id=61&entity_type=city&q=${searchValue}&count=50&radius=1000`
    }

    if (locationID) {
      searchUrl = `/search?entity_id=${locationID &&
        locationID}&entity_type=subzone&count=50&radius=1000`
    }

    if (searchValue && locationID) {
      searchUrl = `/search?entity_id=${locationID &&
        locationID}&entity_type=subzone&q=${searchValue}&count=50&radius=1000`
    }

    if (!locationID && !searchValue) {
      searchUrl = '/search?entity_id=61&entity_type=city'
    }

    try {
      const response = await axios.get(searchUrl)

      if (response.data.results_found !== 0 && response.status === 200) {
        dispatch({
          type: 'SET_RESTARUANTS',
          payload: response.data.restaurants,
        })
        closeSnackbar()
      } else if (response.data.results_found === 0) {
        enqueueSnackbar('No results found', {
          variant: 'warning',
        })
        dispatch({
          type: 'SET_TITLE',
          payload: 'no results found :(',
        })
      }
    } catch (err) {
      enqueueSnackbar(err, {
        variant: 'error',
      })
    }
  }

  const SearchButtons = () => {
    return (
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          type="submit"
          onClick={fetchData}
        >
          Search
        </Button>
        {state.restaurants && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            onClick={clearData}
          >
            Clear
          </Button>
        )}
      </div>
    )
  }

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-search"
          label="Nom nom"
          placeholder="eg. Burgers"
          className={classes.textField}
          size="medium"
          type="search"
          onChange={handleChange}
        />
      </form>
      <SearchButtons />
    </div>
  )
}

export default React.memo(Search)
