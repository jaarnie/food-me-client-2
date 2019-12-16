import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "react-image-lightbox/style.css"
import * as serviceWorker from "./serviceWorker"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"
import { SnackbarProvider } from "notistack"

import App from "./App"
import Navigation from "./components/Navigation"
import { StoreProvider } from "./Store"

const browserHistory = createBrowserHistory()

browserHistory.listen((location, action) => {
  window.scrollTo(0, 0)
})

ReactDOM.render(
  <Router history={browserHistory}>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      autoHideDuration={2000}
    >
      <StoreProvider>
        <Navigation />
        <App />
      </StoreProvider>
    </SnackbarProvider>
  </Router>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
