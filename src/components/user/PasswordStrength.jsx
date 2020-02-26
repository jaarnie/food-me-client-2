import React from 'react'
import zxcvbn from 'zxcvbn'
import { makeStyles } from '@material-ui/core/styles'
import { LinearProgress, Paper } from '@material-ui/core'
// import { yellow, amber, green } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  progressBar: {
    padding: 10,
    marginBottom: 10,
  },
  textBox: {
    align: 'justify',
  },
}))

export default function PasswordStrength({ password }) {
  const classes = useStyles()
  const testedResult = zxcvbn(password)

  return (
    <div>
      <Paper className={classes.root}>
        <LinearProgress
          className={classes.progressBar}
          // color={'8BC34A'}
          variant="determinate"
          value={testedResult.score * 25}
        />
      </Paper>
    </div>
  )
}
