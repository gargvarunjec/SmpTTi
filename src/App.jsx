import React from 'react'
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import SignOut from './pages/SignOut';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/SignIn' element={<Signin/>} />
        <Route path='/SignOut' element={<SignOut/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App