import React from "react"
import zxcvbn from "zxcvbn"
import { makeStyles } from "@material-ui/core/styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  progressBar: {
    padding: 10,
    marginBottom: 10
  },
  textBox: {
    align: "justify"
  }
}))

export default function PasswordStrength({ password }) {
  const classes = useStyles()
  const testedResult = zxcvbn(password)

  const passwordStrengthText = () => {
    switch (testedResult.score) {
      case 1:
        return "Weak"

      case 2:
        return "Meduim"

      case 3:
        return "Strong"

      case 4:
        return "Perfect"

      default:
        return null
    }
  }

  return (
    <div>
      <Paper className={classes.root}>
        <LinearProgress
          className={classes.progressBar}
          color="primary"
          variant="determinate"
          value={testedResult.score * 25}
        />
        <Typography className={classes.textBox} variant="subtitle2">
          {passwordStrengthText()}
        </Typography>
      </Paper>
    </div>
  )
}
