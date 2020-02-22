import Axios from 'axios'

import { searchRoot, headersRoot } from '../config/apiConfig'

const axiosAPI = Axios.create({
  baseURL: searchRoot,
  headers: headersRoot,
})

export const fetchFavorites = async (userData, dispatch) => {
  // debugger
  const resIDs = []
  userData.favorites.map((r) => resIDs.push(r.res_id))
  try {
    await Promise.all(
      resIDs.map(async (resID) => {
        const response = await axiosAPI.get(`/restaurant?res_id=${resID}`)
        if (response.status === 200) {
          console.log(response.data)
          dispatch({
            type: 'ADD_FAVORITE',
            payload: response.data,
          })
        }
      })
    )
  } catch (err) {
    console.log(err)
  }
}

