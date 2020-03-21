import React, { useContext } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Store } from '../Store'
import { MAIN_COLOUR } from '../constants/index'
import Search from './search/Search'
import SearchUserLocation from './search/SearchUserLocation'
import { Loading } from './Loading'

const ListContainer = React.lazy(() => import('../containers/ListContainer'))

const useStyles = makeStyles({
  title: {
    color: MAIN_COLOUR,
  },
  userLocation: {
    display: 'grid',
    justifyContent: 'center',
  },
  search: {
    alignContent: 'center',
  },
})

export default function Home() {
  const classes = useStyles()
  const { state } = useContext(Store)

  const getTitle = () =>
    state.userLocation ? state.userLocation.location.title.split(', ')[0] : state.title

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {getTitle()}
      </Typography>
      <div className={classes.userLocation}>
        <SearchUserLocation />
      </div>
      <div className={classes.search}>
        <Search />
      </div>
      <React.Suspense fallback={Loading()}>{state.restaurants && <ListContainer />}</React.Suspense>
    </>
  )
}
