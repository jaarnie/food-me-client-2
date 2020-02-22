import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'
import {
  // Share as ShareIcon,
  Place as PlaceIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons'
import { red } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'

import RatingStars from '../RatingStars'
import PhotoGallery from '../PhotoGallery'
import { googleMapDeeplink, MAIN_COLOUR } from '../../constants/index'
import LikeButton from '../LikeButton'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '1vh 4vw 1vh 4vw',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    backgroundColor: MAIN_COLOUR,
    marginBottom: '2.5vh',
  },
}))

export default function RestaurantCard({ r }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const restaurant = r.restaurant || r

  function handleExpandClick() {
    setExpanded(!expanded)
  }

  const ShowTimes = () => {
    return restaurant.timings
  }

  const restaurantLocation = () => {
    const address = restaurant.location.address.split(', ')
    const postcode = address.pop()
    // debugger

    return (
      <>
        <Typography variant="body2" color="textSecondary" component="p">
          {address.join(', ')}
          <br />
          {postcode}
        </Typography>
      </>
    )
  }

  return (
    <Card className={classes.card}>
      {console.log('CARD >>>>>', restaurant)}
      <CardHeader
        avatar={(
          <Avatar
            aria-label="avatar"
            className={classes.avatar}
            style={{ backgroundColor: MAIN_COLOUR }}
          >
            {restaurant.name[0]}
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={restaurant.name}
        subheader={`${restaurant.establishment[0]}`}
        // subheader={`${restaurant.cuisines}`}
      />

      <CardMedia
        className={classes.media}
        image={restaurant.featured_image}
        // image={restaurant.featured_image || 'https://dummyimage.com/300x200/ffffff/000.png&text=No+image'}
        title="featured image"
      />
      <CardContent>
        {restaurantLocation()}
        <RatingStars
          value={restaurant.user_rating.aggregate_rating}
          votes={restaurant.user_rating.votes}
        />
        {restaurant.cuisines}
      </CardContent>
      <CardActions disableSpacing>
        <LikeButton restaurant={restaurant} />

        {/* ToDo - add share */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}

        <IconButton aria-label="place" target="_blank" href={googleMapDeeplink(restaurant)}>
          <PlaceIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Opening Times:</Typography>
          <ShowTimes />
          <Typography paragraph>
            {/* {restaurant.menu_url} */}
            Average cost for two: {restaurant.currency + restaurant.average_cost_for_two}
          </Typography>
          <Link
            to={{
              pathname: `/restaurant/${restaurant.id}`,
              state: { restaurant },
            }}
          >
            <Button variant="contained" color="primary" className={classes.button}>
              more info
            </Button>
          </Link>

          {restaurant.photos && <PhotoGallery photos={restaurant.photos} />}
        </CardContent>
      </Collapse>
    </Card>
  )
}
