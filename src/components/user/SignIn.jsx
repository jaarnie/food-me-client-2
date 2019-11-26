import React, { useState, useContext } from "react"
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { Link } from "react-router-dom"
import { useSnackbar } from "notistack"
import Axios from "axios"
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'

import {
  serverRoot,
  serverHeaders,
  searchRoot,
  headersRoot
} from "../../config/apiConfig"
import { Store } from "../../Store.js"
import { MAIN_COLOUR } from "../../constants"
import { fetchFavorites } from "../FetchFavorites"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" to="https://github.com/jaarnie/">
        github |
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
    backgroundColor: MAIN_COLOUR
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: MAIN_COLOUR
  }
}))

// const USER_QUERY = gql`
//   query {
//     query($id: String!) {
//       user(id: $id) {
//         email
//         password
//       }
//     }
//   }
// `

export default function SignIn({ history }) {
  const { dispatch } = useContext(Store)
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  const axiosServer = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders
  })

  // const axiosAPI = Axios.create({
  //   baseURL: searchRoot,
  //   headers: headersRoot
  // })

  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value })
    console.log(values)
  }

  // debugger

  // const fetchFavorites = async userData => {
  //   const resIDs = []
  //   userData.favorites.map(r => resIDs.push(r.res_id))
  //   try {
  //     await Promise.all(
  //       resIDs.map(async resID => {
  //         const response = await axiosAPI.get(`/restaurant?res_id=${resID}`)
  //         if (response.status === 200) {
  //           console.log(response.data)
  //           dispatch({
  //             type: "ADD_FAVORITE",
  //             payload: response.data
  //           })
  //         }
  //       })
  //     )
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleClick = async event => {
    event.preventDefault()
    try {
      const response = await axiosServer.post("/login", {
        email: values.email,
        password: values.password
      })
      if (response.status === 200) {
        debugger
        fetchFavorites(response.data, dispatch)

        dispatch({
          type: "SET_USER",
          payload: response.data
        })
        history.push("/")
        enqueueSnackbar(`Welcome, ${response.data.first_name}`, {
          variant: "success"
        })
      }
      // return <FetchFavorites  props={response.data} />
    } catch (err) {
      console.log(err)
      enqueueSnackbar("Error", {
        variant: "error"
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item xs>
              <Link to="/sign-up">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
