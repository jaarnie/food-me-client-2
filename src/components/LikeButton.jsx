import React, { useContext } from "react"
import Axios from "axios"
import { IconButton } from "@material-ui/core"
import { Favorite as FavoriteIcon } from "@material-ui/icons"

import { Store } from "../Store"
import { serverRoot, serverHeaders } from "../config/apiConfig"

export default function LikeButton({ restaurant }) {
  const { state, dispatch } = useContext(Store)

  const axios = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders
  })

  // const toggleLikeColor = state.favorites.includes(restaurant) ? "secondary" : "default"

  const handleLikeClick = async () => {
    const restaurantInFavorites = state.favorites.includes(restaurant)

    let dispatchObject = {
      type: "ADD_FAVORITE",
      payload: restaurant
    }
    try {
      const response = await axios.post("/favorites", {
        user_id: state.user.id,
        res_id: restaurant.R.res_id
      })
      if (response.status === 200 || 204) {
      }
    } catch (err) {
      console.log(err)
    }

    if (restaurantInFavorites) {
      const favoritesWithoutRestaurant = state.favorites.filter(
        favorite => favorite !== restaurant
      )
      dispatchObject = {
        type: "REMOVE_FAVORITE",
        payload: favoritesWithoutRestaurant
      }
      try {
        const response = await axios.delete(
          `/favorites/remove/${state.user.id}/${restaurant.R.res_id}`,
          {
            res_id: restaurant.R.res_id
          }
        )
        if (response.status === 200 || 204) {
        }
      } catch (err) {
        console.log(err)
      }
    }
    return dispatch(dispatchObject)
  }

  const toggleLikeColor = () => state.favorites.includes(restaurant) ? "red" : null


  return (
    <div>
      <IconButton aria-label="add to favorites"
          style={{ color: toggleLikeColor() }}
        >
        <FavoriteIcon
          value={restaurant.id}
          onClick={handleLikeClick}
        />
      </IconButton>
    </div>
  )
}
