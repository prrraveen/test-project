import React from "react"
import ReactDOM from "react-dom"
import {Search} from "./search"
import MovieCarousal from "./MovieCarousal"

const App = () => (
  <div>
    <Search/>
    <MovieCarousal />
  </div>
)


ReactDOM.render(<App/>, document.getElementById("root"))