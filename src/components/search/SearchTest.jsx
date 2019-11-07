import React from 'react'
import useAxios from "axios-hooks"

import { Loading } from '../Loading'
import { Store } from '../../Store'

export default function SearchTest() {
  const {state} = React.useContext(Store)

  const value = state.searchValue
  const [{ data, loading, error }, fetchData] = useAxios(
    `/search?entity_id=${
      state.userLocation ? state.userLocation.location.entity_id : null
    }&entity_type=subzone&q=${value}&count=50&radius=1000`,
    )
    console.log(fetchData)

if (loading) {
  return (
    <div className='hi'>
      <Loading />
    </div>
  )
}
  return (
    <div>
      <SearchTest />
    </div>
  )
}
