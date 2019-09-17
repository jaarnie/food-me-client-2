import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { Link } from "react-router-dom"
import { useSnackbar } from "notistack"

import PasswordStrength from "./PasswordStrength"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://www.github.com/jaarnie">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#235451"
  }
}))

export default function SignUp() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    marketingCheckbox: false
  })
  const [response, setResponse] = useState({ err: "" })

  const handleClick = async event => {
    event.preventDefault()
    const data = await fetch("http://localhost:7000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {

          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
          marketing_checkbox: values.marketingCheckbox
        }
      })
    })
    const resp = await data.json()
    if (resp.error) {
      setResponse({ err: resp.error })
    } else {
      console.log('yah')
    }
  }

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setValues({ ...values, [name]: value })
    console.log(values)
  }

  const handleCheckbox = event => {
    setValues({ ...values, marketingCheckbox: event })
    console.log(values)
  }


  useEffect(() => {
    if (response.err) {
      enqueueSnackbar(
        "Error", {
          variant: "error",
          autoHideDuration: 3000,
      })
    }
  }, [enqueueSnackbar, response])

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
                    onChange={e => {
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
            onClick={e => handleClick(e)}
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
        <Copyright />
      </Box>
    </Container>
  )
}
