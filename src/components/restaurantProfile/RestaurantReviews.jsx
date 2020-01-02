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

import RatingStars from "../RatingStars"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  ratingStars: {
    // textAlign: 'left',
    color: 'red'
  }
}))

export default function RestaurantReviews({ review }) {
  const classes = useStyles()
  // debugger

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="avatar" src={review.user.profile_image} />
        </ListItemAvatar>

        <ListItemText
          primary={
            <>
              <Typography variant="subtitle1">{review.user.name}</Typography>
              <Typography variant="subtitle2">
                {review.review_time_friendly}
              </Typography>
              <RatingStars value={review.rating} align={'left'}/>
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
                {review.review_text}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  )
}
