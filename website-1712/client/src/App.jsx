import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css'
import { useRecoilState } from 'recoil';
import { userState } from './recoil/userAtom';
// components for not logged in users
import ResponsiveComponent from './components/ResponsiveComponent';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './components/Home';

// protected components
const CoachesPage = lazy(() => import('./components/CoachesPage')); 
const ProfilePage = lazy(() => import('./components/ProfilePage'));
// auth components
const Logout = lazy(() => import('./components/Logout')); 
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));


// https://excalidraw.com/#json=rSo3sN2fJiBowpks8Aw-h,bYdqBNvCUjKXOchU2HEJMg


function App() {

  return (
    <>
      <ResponsiveComponent>
        {({ width, height }) => (
          <div className=' w-screen h-screen left-0 top-0 absolute'>

            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}> {/* Fallback while loading */}
              <Routes>
                {/* <Route path="/home" element={<Layout header={<NoUserHeader />} main={<Home />} />} />
              <Route path="/home/:userId" element={<Layout header={<UserHeader />} main={<Home />}  />} />
              <Route path="/home/:userId" element={<Layout header={<AdminHeader />} main={<Home />} />} />
                 */}

                <Route path="/" element={<Layout header={<Header />} main={<Home />} />} />
                <Route path="/coach" element={<Layout header={<Header />} main={<CoachesPage />} />} />
                <Route path="/profile" element={<Layout header={<Header />} main={<ProfilePage/>} />} />
                
                <Route path="/logout" element={<Layout header={<Header />} main={<Logout />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
                </Suspense>
            </BrowserRouter>

          </div>
        )}
      </ResponsiveComponent>
    </>
  )
}

export default App
