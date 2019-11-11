import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Rating from "@material-ui/lab/Rating"
import { Box, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  content: {
    justifyContent: "center",
    color: "#235451"
  }
}))

export default function RatingStars({ value, title, votes }) {
  const classes = useStyles()

  return (
    <div>
      <Box
        component="fieldset"
        mb={3}
        borderColor="transparent"
        textAlign={"center"}
      >
        <Typography component="legend">{title}</Typography>
        <Rating
          className={classes.content}
          value={parseInt(value)}
          readOnly
          precision={0.1}
        />
        {votes && <Typography>Votes: {votes} </Typography>}
      </Box>
    </div>
  )
}
