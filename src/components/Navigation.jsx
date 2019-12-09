import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu
} from "@material-ui/core"
import {
  AccountCircle,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon
} from "@material-ui/icons"

import { Store } from "../Store.js"
import { Link } from "react-router-dom"

import { MAIN_COLOUR } from "../constants/index"
import SearchUserLocation from "./SearchUserLocation"
import NavigationPopover from "./NavigationPopover"

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: MAIN_COLOUR,
    marginBottom: "4.5vh"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  userName: {
    display: "block"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
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

  const userSignInOrProfile = () => {
    let MenuItems = null
    if (state.user) {
      MenuItems = (
        <Link to="/profile">
          <MenuItem component="p" onClick={handleMenuClose}>Profile</MenuItem>
        </Link>
      )
    } else {
      MenuItems = (
        <div>
          <Link to="/sign-in">
            <MenuItem component="p" onClick={handleMenuClose}>
              Sign In
            </MenuItem>
          </Link>
          <Link to="/sign-up">
            <MenuItem component="p" onClick={handleMenuClose}>
              Sign Up
            </MenuItem>
          </Link>
        </div>
      )
    }
    return MenuItems
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {userSignInOrProfile()}
      </Menu>
    </>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
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

        {userSignInOrProfile()}
      </MenuItem>
       <NavigationPopover />

    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar className={classes.main} position="static">
        <Toolbar>
          <SearchUserLocation />

          <Typography className={classes.userName} variant="h6" noWrap>
            <Link to="/">Food Me</Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <NavigationPopover />

            <Link to='/profile'>
            <IconButton aria-label="user favorite count" color="inherit">
              <Badge badgeContent={state.favorites.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
              </Link>
            <Typography
              className={classes.title}
              variant="h6"
              style={{ margin: "1vh" }}
            >
              {state.user && `Hi, ${state.user.first_name} `}
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
