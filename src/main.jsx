import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { HikesContextProvider } from "./context/HikeContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <HikesContextProvider>
    <App />
  </HikesContextProvider>
)
