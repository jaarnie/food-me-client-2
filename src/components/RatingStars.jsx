import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Rating from "@material-ui/lab/Rating"
import { Box, Typography } from "@material-ui/core"

import { MAIN_COLOUR } from '../constants/index'

const useStyles = makeStyles(() => ({
  content: {
    justifyContent: "center",
    color: MAIN_COLOUR
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
