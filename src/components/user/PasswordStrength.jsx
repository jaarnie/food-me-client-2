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
  // const [state, setState] = useState({
  //   text: 'cunt',
  //   color: '',
  // })

  // const passwordStrengthText = () => {
  //   switch (testedResult.score) {
  //     case 1:
  //       return setState({ ...state, text: 'Weak', color: yellow})

  //     case 2:
  //         return setState({ ...state, text: 'Meduim', color: amber})

  //     case 3:
  //         return setState({ ...state, text: 'Strong', color: '#8BC34A'})

  //     case 4:
  //         return setState({ ...state, text: 'Strong', color: green})

  //     default:
  //       return null
  //   }
  // }

  // useEffect(() => {
  //   switch (testedResult.score) {
  //     case 1:
  //       return setState({ ...state, text: 'Weak', color: yellow})

  //     case 2:
  //         return setState({ ...state, text: 'Meduim', color: amber})

  //     case 3:
  //         return setState({ ...state, text: 'Strong', color: '#8BC34A'})

  //     case 4:
  //         return setState({ ...state, text: 'Strong', color: green})

  //     default:
  //       return null
  //   }
  // }, [null])

  // function handleColor() {}

  return (
    <div>
      {/* {console.log(state)} */}
      <Paper className={classes.root}>
        <LinearProgress
          className={classes.progressBar}
          // color={'8BC34A'}
          variant="determinate"
          value={testedResult.score * 25}
        />
        {/* <Typography className={classes.textBox} variant="subtitle2"></Typography> */}
      </Paper>
    </div>
  )
}
