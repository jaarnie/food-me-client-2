import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import { Box, Typography } from '@material-ui/core'

import { MAIN_COLOUR } from '../../constants/index'

const useStyles = makeStyles(() => ({
  content: {
    justifyContent: 'center',
    color: MAIN_COLOUR,
  },
}))

const RatingStars = ({ value, title, votes }) => {
  const classes = useStyles()

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent" textAlign="center">
        <Typography component="legend">{title}</Typography>
        <Rating className={classes.content} value={value} readOnly precision={0.1} />
        {votes && <Typography>Votes: {votes} </Typography>}
      </Box>
    </div>
  )
}
RatingStars.defaultProps = {
  value: 0,
  title: '',
  votes: '',
}

RatingStars.propTypes = {
  value: PropTypes.number,
  title: PropTypes.string,
  votes: PropTypes.string,
}

export default React.memo(RatingStars)
