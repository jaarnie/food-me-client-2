import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { Store } from '../Store'

import { Loading } from '../components/Loading'
import Filter from '../components/filter/Filter'

const RestaurantCard = React.lazy(() => import('../components/card/RestaurantCard'))

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

export default function ListContainer() {
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
  }, [])

  const setDefaultSearch = () => {
    return (
      <Grid container spacing={2}>
        {state.restaurants.map((restaurant, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <RestaurantCard r={restaurant} />
          </Grid>
        ))}
      </Grid>
    )
  }

  const setVegetarianSearch = () => {
    return (
      <Grid container spacing={2}>
        {filter.vegetarianRestaurants.map((restaurant, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <RestaurantCard r={restaurant} />
          </Grid>
        ))}
      </Grid>
    )
  }

  const setVeganSearch = () => {
    return (
      <Grid container spacing={2}>
        {filter.veganRestaurants.map((restaurant, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <RestaurantCard r={restaurant} />
          </Grid>
        ))}
      </Grid>
    )
  }

  const ShowRestaurants = () => {
    if (checked.vegetarian) {
      return setVegetarianSearch()
    } else if (checked.vegan) {
      return setVeganSearch()
    } else {
      return setDefaultSearch()
    }
  }

  console.log(checked)
  return (
    <div className={classes.root}>
      <Filter checked={checked} setChecked={setChecked} />
      <React.Suspense fallback={Loading()}>
        <ShowRestaurants />
      </React.Suspense>
    </div>
  )
}
