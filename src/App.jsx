import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home"
import { CreatePost } from "./pages/CreatePost"
import { PostDetail } from "./pages/PostDetail"
import { EditPost } from "./pages/EditPost"
import { Navbar } from "./components/Navbar"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
