import React from "react"
import "./App.css"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"

import Navigation from "./components/Navigation"
import Home from "./components/Home"

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navigation />
      <Container maxWidth="md">
        <Home />
      </Container>
    </div>
  )
}

export default App
