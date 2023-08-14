import React, { useState, useEffect } from "react"
// import { Route, Routes } from "react-router-dom"
import { Loader } from "./components/Loader"
import { Baccarat } from "./components/Baccarat"
import "./App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Simulating an async operation
    setTimeout(() => {
      setIsLoading(false)
    }, 6000)
  }, [])
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    // </Routes>
    <div className="app">{isLoading ? <Loader /> : <Baccarat />}</div>
  )
}

export default App
