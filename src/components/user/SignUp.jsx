import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Axios from 'axios'

import PasswordStrength from './PasswordStrength'
import { serverRoot, serverHeaders } from '../../config/apiConfig'
import { Store } from '../../Store'
import { MAIN_COLOUR } from '../../constants'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <a href="https://github.com/jaarnie/" target="_blank" rel="noopener noreferrer">
        github |
      </a>{' '}
      {new Date().getFullYear()}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: MAIN_COLOUR,
  },
  footer: {
    marginBottom: '20px',
  },
}))

const SignUp = ({ history }) => {
  const { dispatch } = React.useContext(Store)

  const classes = useStyles()

  const { enqueueSnackbar } = useSnackbar()

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    marketingCheckbox: false,
  })

  const [response, setResponse] = useState({ err: '' })

  const axios = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders,
  })

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      // eslint-disable-next-line no-shadow
      const response = await axios.post('/users', {
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
          marketing_checkbox: values.marketingCheckbox,
        },
      })
      if (response.status === 201) {
        dispatch({
          type: 'SET_USER',
          payload: response.data,
        })
        enqueueSnackbar(`Welcome, ${response.data.first_name}`, {
          variant: 'success',
        })
        history.push('/')
      }
    } catch (err) {
      console.log(err)
      setResponse({ err })

      enqueueSnackbar('Error', {
        variant: 'error',
        autoHideDuration: 3000,
      })
    }
  }

  const handleChange = useCallback(
    (event) => {
      const { name } = event.target
      const { value } = event.target
      setValues({ ...values, [name]: value })
      console.log(values)
    },
    [values]
  )

  const handleCheckbox = useCallback(
    (event) => {
      setValues({ ...values, marketingCheckbox: event })
      // console.log(values)
    },
    [values]
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                error={!!response.err.first_name}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                error={!!response.err.last_name}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={!!response.err.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={!!response.err.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordStrength password={values.password} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={response.err.password_confirmation ? true : false}
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="password-confirmation"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="marketingCheckbox"
                    color="primary"
                    onChange={(e) => {
                      const { checked } = e.currentTarget
                      handleCheckbox(checked)
                    }}
                  />
                }
                label="I want to updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleClick(e)}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/sign-in">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <div className={classes.footer}>
          <Copyright />
        </div>
      </Box>
    </Container>
  )
}

SignUp.defaultProps = {
  history: {},
}

SignUp.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}

export default React.memo(SignUp)
