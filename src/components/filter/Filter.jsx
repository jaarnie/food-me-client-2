import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { MAIN_COLOUR } from '../../constants/index'

const GreenCheckbox = withStyles({
  root: {
    justifyContent: 'center',
    color: MAIN_COLOUR,
    '&$checked': {
      color: MAIN_COLOUR,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />)

// eslint-disable-next-line react/prop-types
const Filter = ({ checked, setChecked }) => {
  const handleChange = (name) => (event) => {
    setChecked({ ...checked, [name]: event.target.checked })
  }

  return (
    <FormGroup
      row
      style={{
        justifyContent: 'center',
      }}
    >
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={checked.vegetarian}
            onChange={handleChange('vegetarian')}
            value="vegetarian"
          />
        }
        label="Vegetarian Friendly"
      />
      <FormControlLabel
        control={
          <GreenCheckbox checked={checked.vegan} onChange={handleChange('vegan')} value="vegan" />
        }
        label="Vegan Friendly"
      />
    </FormGroup>
  )
}

Filter.defaultProps = {
  checked: {},
  setChecked: () => {},
}

Filter.propTypes = {
  checked: PropTypes.objectOf(PropTypes.bool),
  setChecked: PropTypes.func,
}

export default React.memo(Filter)
