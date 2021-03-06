import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'

import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Profile from './components/Profile/Profile'
import NotFound from './components/NotFound/NotFound'
import RestaurantProfile from './components/RestaurantProfile/RestaurantProfile'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/profile" component={Profile} />
          {/* <Route path="/restaurant/:id" render={(props) => <RestaurantProfile {...props}/>}/> */}
          <Route path="/restaurant/:id" component={RestaurantProfile} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
