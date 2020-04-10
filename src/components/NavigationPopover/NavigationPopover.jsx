/* eslint-disable no-unused-expressions */
import React, { useEffect, useContext, useState } from 'react'
import { Popover, IconButton } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import { Store } from '../../Store'
import SignIn from '../SignIn/SignIn'

export default function NavigationPopover() {
  const history = useHistory()
  const { state } = useContext(Store)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open && 'sign-in-popover'

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    return state.user && history.push('/profile')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    state.user && handleClose()
  })

  return (
    <div>
      <IconButton style={{ color: 'white' }} onClick={handleClick}>
        <AccountCircle />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SignIn />
      </Popover>
    </div>
  )
}
