import React, { useEffect, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Popover, Typography, IconButton, MenuItem } from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import { Link } from "react-router-dom"

import { Store } from "../../Store"
import SignIn from "../user/SignIn"

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}))

export default function NavigationPopover({ history }) {
  const classes = useStyles()
  const { state } = useContext(Store)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    // return state.user && <Route path="/profile" />
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "sign-in-popover" : undefined

  useEffect(() => {
    state.user && handleClose()
  })

  return (
    <div>
      <IconButton style={{ color: "white" }} onClick={handleClick}>
        <AccountCircle />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <SignIn />
        <Typography className={classes.typography}>TEST</Typography>
      </Popover>
    </div>
  )
}
