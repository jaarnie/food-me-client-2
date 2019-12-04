import React from "react"
import { createBrowserHistory } from "history"
import { Router, Route, Switch } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { CssBaseline, Container } from "@material-ui/core"
// import Axios from "axios"
// import { configure } from "axios-hooks"

// import { searchRoot, headersRoot } from "./config/apiConfig"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import SignIn from "./components/user/SignIn.jsx"
import SignUp from "./components/user/SignUp.jsx"
import Profile from "./components/user/Profile.jsx"
import NotFound from "./components/NotFound"
import RestaurantProfile from "./components/RestaurantProfile"

// const axios = Axios.create({
//   baseURL: searchRoot,
//   headers: headersRoot
// })
// configure({ axios })
const browserHistory = createBrowserHistory()

browserHistory.listen((location, action) => {
  window.scrollTo(0, 0)
})

function App() {
  return (
    <div className="App">
      <Router history={browserHistory}>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          autoHideDuration={2000}
        >
          <CssBaseline />
          <Navigation />
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
        </SnackbarProvider>
      </Router>
    </div>
  )
}

export default App
