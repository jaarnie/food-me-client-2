import React, { useContext } from "react"
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

import { Store } from '../../Store'

import RatingStars from "../../components/RatingStars"
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
  const { state, dispatch } = useContext(Store)
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

  const handleClickFav = async restaurant => {
    console.log(restaurant)
    const data = await fetch(`http://localhost:7000/api/v1/users/${state.user.id}`)
    // dispatch({
    //   type: 'ADD_FAVORITE',
    //   payload: restaurant
    // })
  }

  debugger
  return (
    <Card className={classes.card}>
      {console.log("CARD", r.restaurant)}
      <CardHeader
        avatar={
          <Avatar
            aria-label="avatar"
            className={classes.avatar}
            style={{ backgroundColor: "#235451" }}
          >
            {r.restaurant.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={r.restaurant.name}
        subheader="sub heading"
      />
      <CardMedia
        className={classes.media}
        image={r.restaurant.featured_image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {r.restaurant.location.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={() => handleClickFav(r.restaurant)}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton
          aria-label="place"
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${r.restaurant.location.address}`}
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
          <RatingStars value={r.restaurant.user_rating.aggregate_rating} />
          <Typography paragraph>
            {r.restaurant.menu_url}
            add shit here
          </Typography>
          <Typography paragraph></Typography>
          and here
          <Typography>here too</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
