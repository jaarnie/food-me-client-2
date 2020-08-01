import React, { useContext, useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { Store } from '../../Store'

import { Loading } from '../../components/Loading/Loading'
import Filter from '../../components/Filter/Filter'

const RestaurantCard = React.lazy(() => import('../../components/RestaurantCard/RestaurantCard'))

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}))

const ListContainer = () => {
  const classes = useStyles()
  const { state } = useContext(Store)
  const [checked, setChecked] = useState({
    vegan: false,
    vegetarian: false,
  })
  const [filter, setFilter] = useState({
    vegetarianRestaurants: null,
    veganRestaurants: null,
  })

  useEffect(() => {
    const vegetariantArray = []
    const veganArray = []
    state.restaurants.map((r) => {
      const vegetarian = r.restaurant.highlights.includes('Vegetarian Friendly')
      const vegan = r.restaurant.highlights.includes('Vegan Options')

      if (vegetarian) {
        vegetariantArray.push(r)
      }

      if (vegan) {
        veganArray.push(r)
      }

      return setFilter({
        vegetarianRestaurants: vegetariantArray,
        veganRestaurants: veganArray,
      })
    })
  }, [state.restaurants])

  const setDefaultSearch = useCallback(() => {
    return (
      <Grid container spacing={2}>
        {state.restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} key={restaurant.restaurant.R.res_id}>
            <RestaurantCard r={restaurant} />
          </Grid>
        ))}
      </Grid>
    )
  }, [state.restaurants])

  const setVegetarianSearch = useCallback(() => {
    return (
      <Grid container spacing={2}>
        {filter.vegetarianRestaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} key={restaurant.restaurant.R.res_id}>
            <RestaurantCard r={restaurant} />
          </Grid>
        ))}
      </Grid>
    )
  }, [filter.vegetarianRestaurants])

  const setVeganSearch = useCallback(() => {
    return (
      <Grid container spacing={2}>
        {filter.veganRestaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} key={restaurant.restaurant.R.res_id}>
            <RestaurantCard r={restaurant} />
          </Grid>
        ))}
      </Grid>
    )
  }, [filter.veganRestaurants])

  const showRestaurants = useCallback(() => {
    let restaurants = setDefaultSearch()
    if (checked.vegetarian) {
      restaurants = setVegetarianSearch()
    } else if (checked.vegan) {
      restaurants = setVeganSearch()
    }
    return restaurants
  }, [checked.vegan, checked.vegetarian, setDefaultSearch, setVeganSearch, setVegetarianSearch])

  return (
    <div className={classes.root}>
      <Filter checked={checked} setChecked={setChecked} />
      <React.Suspense fallback={Loading()}>{showRestaurants()}</React.Suspense>
    </div>
  )
}

export default React.memo(ListContainer)
