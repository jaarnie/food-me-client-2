import React from "react"
import "./App.css"
import { createBrowserHistory } from "history"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { CssBaseline, Container } from "@material-ui/core"
import Axios from "axios"
import { configure } from "axios-hooks"

import { searchRoot } from "./config/apiConfig"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import SignIn from "./components/user/SignIn.jsx"
import SignUp from "./components/user/SignUp.jsx"
import Profile from "./components/user/Profile.jsx"
import NotFound from "./components/NotFound"
import RestaurantProfile from "./components/RestaurantProfile"

const axios = Axios.create({
  baseURL: searchRoot,
  headers: {
    "Content-Type": "application/json",
    "user-key": "87be592b7c816cd2e00737b271776b7f"
  }
})
configure({ axios })

function App() {
  return (
    <div className="App">
      <BrowserRouter history={createBrowserHistory()}>
        <SnackbarProvider
          maxSnack={3}
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
              <Route path="/restaurant/:id" component={RestaurantProfile}/>
              <Route component={NotFound} />
            </Switch>
          </Container>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
