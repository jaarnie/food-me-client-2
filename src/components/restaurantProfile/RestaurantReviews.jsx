import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core/'

import RatingStars from '../RatingStars'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  ratingStars: {
    color: 'red',
  },
}))

const RestaurantReviews = ({ review }) => {
  const classes = useStyles()

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
              <Typography variant="subtitle2">{review.review_time_friendly}</Typography>
              <RatingStars value={review.rating} align="left" />
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

RestaurantReviews.defaultProps = {
  review: {},
}

RestaurantReviews.propTypes = {
  review: PropTypes.objectOf(PropTypes.any),
}

export default React.memo(RestaurantReviews)
