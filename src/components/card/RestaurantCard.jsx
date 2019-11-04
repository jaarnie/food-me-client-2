import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core"
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Place as PlaceIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons"
import { red } from "@material-ui/core/colors"

import RatingStars from "../../components/RatingStars"
import PhotoGallery from './PhotoGallery'
// import { Link } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  card: {
    margin: "1vh 4vw 1vh 4vw"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

export default function RestaurantCard({ r }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  function handleExpandClick() {
    setExpanded(!expanded)
  }

  const ShowTimes = () => {
    // debugger
    return r.restaurant.timings
    // let times = r.restaurant.timings.split(', ')
    // times.map((time, key) => (
    //   <span key={key}>{time}</span>
    // ))
  }

  // debugger
  const restaurant = r.restaurant
  return (
    <Card className={classes.card}>
      {console.log("CARD", restaurant)}
      <CardHeader
        avatar={
          <Avatar
            aria-label="avatar"
            className={classes.avatar}
            style={{ backgroundColor: "#235451" }}
          >
            {restaurant.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={restaurant.name}
        subheader={restaurant.establishment[0]}
      />
      <CardMedia
        className={classes.media}
        image={restaurant.featured_image}
        title="featured image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {restaurant.location.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton
          aria-label="place"
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${restaurant.location.address}`}
        >
          <PlaceIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
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
          <RatingStars value={restaurant.user_rating.aggregate_rating} votes={restaurant.user_rating.votes} />
          <Typography paragraph>
            {/* {restaurant.menu_url} */}
            Average cost for two: {restaurant.average_cost_for_two}
          </Typography>
          <Typography paragraph></Typography>
          and here
          <Typography>here too</Typography>
          <PhotoGallery photos={restaurant.photos} />
        </CardContent>
      </Collapse>
    </Card>
  )
}
