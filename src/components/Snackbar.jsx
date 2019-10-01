import React, { useEffect } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles } from "@material-ui/core/styles"
import { amber, green } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}))

export default function SnackbarMessage({ variant, message }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  useEffect(() => {
    setOpen(true)
  }, [message])

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      // debugger
      console.log(reason)
      return setOpen(false)
    }
    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        className={classes.variant}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "left"
        // }}
        open={open}
        autoHideDuration={2000}
        variant={variant}
        message={<span id="message-id">{message}</span>}
        onClose={handleClose}
      />
    </div>
  )
}
