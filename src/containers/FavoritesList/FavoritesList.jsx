import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { Store } from '../../Store'
import { Loading } from '../../components/Loading/Loading'

const RestaurantCard = React.lazy(() => import('../../components/RestaurantCard/RestaurantCard'))

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}))

export default function ListContainer() {
  const { state } = useContext(Store)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <React.Suspense fallback={Loading()}>
        <Grid container spacing={2}>
          {state.favorites.map((restaurant) => (
            <Grid item xs={12} sm={6} key={restaurant.id}>
              <RestaurantCard r={restaurant} />
            </Grid>
          ))}
        </Grid>
      </React.Suspense>
    </div>
  )
}
