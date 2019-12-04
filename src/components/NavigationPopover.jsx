import React, { useEffect, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Popover, Typography, Button } from "@material-ui/core"

import { Store } from "../Store"
import SignIn from "./user/SignIn"

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}))

export default function NavigationPopover() {
  const classes = useStyles()
  const { state } = useContext(Store)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  useEffect(() => {
    state.user && handleClose()
  })

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Sign In Test
      </Button>
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
