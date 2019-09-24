import React from "react"
import "./App.css"
import { createBrowserHistory } from "history"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"

import Navigation from "./components/Navigation"
import Home from "./components/Home"
import SignIn from "./components/user/SignIn.jsx"
import SignUp from "./components/user/SignUp.jsx"
import Profile from "./components/user/Profile.jsx"
import NotFound from "./components/NotFound"

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
              <Route component={NotFound} />
            </Switch>
          </Container>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
