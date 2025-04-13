import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { getPosts, createPost } from './api'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import About from './Pages/About'
import Contact from './Pages/Contact'
import CreateBlog from './Pages/CreateBlog'
import Home from './Pages/Home'
import Landing from './Pages/Landing'
import Profile from './Pages/Profile'
import ReadBlog from './Pages/ReadBlog'
import Navbar from './components/navbar'
import Layout from './components/Layout'

function App() {
  // 1. Page, როდესაც იუზერი შემოვა მას უნდა შეეძლოს login, შეეძლოთ ახალი account-ის შექმნა
  // 2. Landing Page, იუზერის შემოსვლისას მას დახვდება post-ები აკონტროლებს არის თუ არა შესული იუზერი, თუ შესულია გაეხსნება home, contact და ა.შ
  // 3. Home Page, იუზერს უნდა შეეძლო რომ შემოვა recent პოსტების დაყენება
  // 4. ReadBlog იუზერს უნდა შეეძლო ბლოგების ნახვა
  // 5. CreateBlog ახალი ბოგის შექმნა
  // 6. Profile  იუზერი ხედავდეს ბლოგებს პროფილზე რასაც დებს
  // 7. About
  // 8. Contect
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/readblog/:id" element={<ReadBlog />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
