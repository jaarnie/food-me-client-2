import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"

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

  // console.log(reviews)
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="avatar" src={reviews.user.profile_image} />
        </ListItemAvatar>
        <ListItemText
          primary={<RatingStars value={reviews.rating} />}
          secondary={
            <React.Fragment>
					<Typography variant="subtitle2">{reviews.user.name}</Typography>
					<Typography variant="subtitle2">{reviews.review_time_friendly}</Typography>


              <Typography
                component="span"
                variant="body"
                className={classes.inline}
                color="textPrimary"
              >
                {reviews.review_text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  )
}
