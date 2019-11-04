import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import GetUserLocation from './GetUserLocation';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
	const classes = useStyles();

	const handleClick = event => {
		event.preventDefault()
		console.log(event.target)
	}

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Postcode"
        inputProps={{ 'aria-label': 'postcode' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon onClick={handleClick}/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
        <GetUserLocation />
    </Paper>
  );
}
