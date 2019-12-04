import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core/"

import RatingStars from "./RatingStars"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}))

export default function RestaurantReviews({ reviews }) {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="avatar" src={reviews.user.profile_image} />
        </ListItemAvatar>

        <ListItemText
          primary={
            <>
              <Typography variant="subtitle1">{reviews.user.name}</Typography>
              <Typography variant="subtitle2">
                {reviews.review_time_friendly}
              </Typography>
              <RatingStars value={reviews.rating} />
            </>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                {reviews.review_text}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  )
}
