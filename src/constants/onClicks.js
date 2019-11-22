import Axios from "axios"
import { serverRoot, serverHeaders } from '../config/apiConfig'
// import { useSnackbar } from "notistack"

export const toggleFavoriteClick = async (restaurant, state, dispatch) => {
  const axios = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders
  })
  // const { enqueueSnackbar } = useSnackbar()
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
      //   enqueueSnackbar(`Saved`, {
      //     variant: "success"
      //   })
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
        // enqueueSnackbar(`Deleted`, {
        //   variant: "success"
        // })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return dispatch(dispatchObject)
}

export const toggleLikeColor = (state, restaurant) =>
  state.favorites.includes(restaurant) ? "red" : null
