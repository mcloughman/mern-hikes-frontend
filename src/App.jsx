import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// pages, components
import Home from "./pages/Home"

import SingleHike from "./components/SingleHike"

import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<SingleHike />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
