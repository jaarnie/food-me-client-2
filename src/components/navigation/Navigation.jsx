import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography, Badge, MenuItem, Menu } from '@material-ui/core'
import {
  AccountCircle,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Restaurant as RestaurantIcon,
} from '@material-ui/icons'

import { Link } from 'react-router-dom'
import { Store } from '../../Store'

import { MAIN_COLOUR } from '../../constants/index'
import NavigationPopover from './NavigationPopover'

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'fixed',
    backgroundColor: MAIN_COLOUR,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  userName: {
    display: 'block',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function Navigation() {
  const { state } = useContext(Store)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  }

  function handleMenuClose() {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      />
    </>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
      <NavigationPopover />
    </Menu>
  )

  return (
    <div className={classes.grow} style={{ marginBottom: '10vh' }}>
      <AppBar className={classes.main}>
        <Toolbar>
          {/* <SearchUserLocation /> */}

          <Typography className={classes.userName} variant="h6" noWrap>
            <Link to="/">
              Food Me
              <RestaurantIcon />
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/profile">
              <IconButton aria-label="user favorite count" color="inherit">
                <Badge badgeContent={state.favorites.length} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Link>

            <NavigationPopover />

            <Typography className={classes.title} variant="h6" style={{ margin: '1vh' }}>
              {state.user && `Hi, ${state.user.first_name} `}
            </Typography>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
