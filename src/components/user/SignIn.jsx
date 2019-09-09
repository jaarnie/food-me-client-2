import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { Store } from "../../Store.js"
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
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#235451"
  }
}))

export default function SignIn() {
  const { state, dispatch } = React.useContext(Store)
  const classes = useStyles()
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  })

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value })
    console.log(values)
  }

  const handleClick = async event => {
    event.preventDefault()
    const data = await fetch(
      `http://localhost:3000/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      })
      const response = await data.json()
      console.log(response)
      dispatch({
        type: "SET_USER",
        payload: response
      })
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-email-input"
        label="Email"
        className={classes.textField}
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="standard"
        onChange={handleChange}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        name="password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="standard"
        onChange={handleChange}
      />
      <Button
        style={{ justifyContent: "center" }}
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
        onClick={e => handleClick(e)}
      >
        Search
      </Button>
    </form>
  )
}
