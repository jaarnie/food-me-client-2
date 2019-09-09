import React from "react"
import "./App.css"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"

import Navigation from "./components/Navigation"
import Home from "./components/Home"
import SignIn from "./components/user/SignIn.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Navigation />
        <Container maxWidth="md">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={SignIn} />
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
