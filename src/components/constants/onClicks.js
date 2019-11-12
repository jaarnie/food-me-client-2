export const toggleFavoriteClick = (restaurant, state, dispatch) => {
  const restaurantInFavorites = state.favorites.includes(restaurant)
  let dispatchObject = {
    type: "ADD_FAVORITE",
    payload: restaurant
  }
  if (restaurantInFavorites) {
    const favoritesWithoutRestaurant = state.favorites.filter(
      fav => fav.R.res_id !== restaurant.R.res_id
    )
    dispatchObject = {
      type: "REMOVE_FAVORITE",
      payload: favoritesWithoutRestaurant
    }
  }
  return dispatch(dispatchObject)
}

