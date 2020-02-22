import React, { useEffect, useContext } from 'react'
import { Popover, IconButton } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

import { Store } from '../../Store'
import SignIn from '../user/SignIn'

export default function NavigationPopover() {
  const history = useHistory()
  const { state } = useContext(Store)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    return state.user && history.push('/profile')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open && 'sign-in-popover'

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
