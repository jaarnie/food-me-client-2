import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(theme => ({
  content: {
    justifyContent: "center"
  },
  progress: {
    margin: theme.spacing(2),
    alignItems: "center"
  }
}))

export const Loading = () => {
  const classes = useStyles()

  return (
    <div className={classes.content}>
      <CircularProgress className={classes.progress} />
    </div>
  )
}

//  position me center
