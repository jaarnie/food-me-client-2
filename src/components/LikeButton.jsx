import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import { IconButton } from '@material-ui/core'
import { Favorite as FavoriteIcon } from '@material-ui/icons'

import NavigationPopover from './navigation/NavigationPopover'
import { Store } from '../Store'
import { serverRoot, serverHeaders } from '../config/apiConfig'

const LikeButton = ({ restaurant }) => {
  const { state, dispatch } = useContext(Store)

  const axios = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders,
  })
  // debugger

  const handleLikeClick = async () => {
    if (state.user) {
      const restaurantInFavorites = state.favorites.includes(restaurant)

      let dispatchObject = {
        type: 'ADD_FAVORITE',
        payload: restaurant,
      }
      try {
        const response = await axios.post('/favorites', {
          user_id: state.user.id,
          res_id: restaurant.R.res_id,
        })
        if (response.status === 200 || 204) {
        }
      } catch (err) {}

      if (restaurantInFavorites) {
        const favoritesWithoutRestaurant = state.favorites.filter(
          (favorite) => favorite !== restaurant // && new arr of current user favs
        )
        dispatchObject = {
          type: 'REMOVE_FAVORITE',
          payload: favoritesWithoutRestaurant,
        }
        try {
          const response = await axios.delete(
            `/favorites/remove/${state.user.id}/${restaurant.R.res_id}`,
            {
              res_id: restaurant.R.res_id,
            }
          )
          if (response.status === 200 || 204) {
          }
        } catch (err) {}
      }
      return dispatch(dispatchObject)
    }
    return <NavigationPopover />
  }

  const toggleLikeColor = () => (state.favorites.includes(restaurant) ? 'red' : null)

  return (
    <div>
      <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
        <FavoriteIcon style={{ color: toggleLikeColor() }} value={restaurant.id} />
      </IconButton>
    </div>
  )
}

LikeButton.defaultProps = {
  restaurant: {},
}

LikeButton.propTypes = {
  restaurant: PropTypes.objectOf(PropTypes.any),
}

export default React.memo(LikeButton)
