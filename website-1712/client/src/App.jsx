import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css'
import ResponsiveComponent from './components/ResponsiveComponent';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './components/Home';
import CoachesPage from './components/CoachesPage';
// import Login from './components/Login';
// import Register from './components/Register';
// https://excalidraw.com/#json=rSo3sN2fJiBowpks8Aw-h,bYdqBNvCUjKXOchU2HEJMg

function App() {

  return (
    <>
      <ResponsiveComponent>
        {({ width, height }) => (
          <div className=' w-screen h-screen left-0 top-0 absolute'>

            <BrowserRouter>
              <Routes>
                {/* <Route path="/home" element={<Layout header={<NoUserHeader />} main={<Home />} />} />
              <Route path="/home/:userId" element={<Layout header={<UserHeader />} main={<Home />}  />} />
              <Route path="/home/:userId" element={<Layout header={<AdminHeader />} main={<Home />} />} />
                 */}

                <Route path="/" element={<Layout header={<Header />} main={<Home />} />} />
                <Route path="/coach" element={<Layout header={<Header />} main={<CoachesPage />} />} />

                {/* <Route path='/' element={<Home />} /> */}
                {/* <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> */}
              </Routes>
            </BrowserRouter>

          </div>
        )}
      </ResponsiveComponent>
    </>
  )
}

export default App
