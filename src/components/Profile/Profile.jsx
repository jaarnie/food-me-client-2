import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import { Email, PermIdentity } from '@material-ui/icons'

import FavoritesList from '../../containers/FavoritesList/FavoritesList'
import SignIn from '../SignIn/SignIn'
import { Store } from '../../Store'
import { MAIN_COLOUR } from '../../constants/index'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    padding: theme.spacing(2),
    color: MAIN_COLOUR,
  },
  icon: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: MAIN_COLOUR,
  },
}))

export default function Profile() {
  const { state } = useContext(Store)
  const classes = useStyles()

  const ProfilePage = () => {
    return state.user ? (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h3">
              {state.user && state.user.first_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.icon}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                  <ListItemIcon>
                    <PermIdentity />
                  </ListItemIcon>
                  <ListItemText primary={`${state.user.first_name} ${state.user.last_name}`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary={state.user.email} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <Paper className={classes.paper}></Paper> */}
          </Grid>
        </Grid>
        <Typography className={classes.title} variant="h4">
          Favorites
        </Typography>

        <FavoritesList />
      </div>
    ) : (
      <SignIn />
    )
  }

  return <ProfilePage />
}
