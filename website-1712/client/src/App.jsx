import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from './recoil/userAtom';
// components for not logged in users
import ResponsiveComponent from './components/hoc/ResponsiveComponent';
import Layout from './components/layout/Layout';
import Home from './components/Home';
import Testimonials from './components/Testimonials';
import ProductsPage from './components/Products';
import SearchPage from './components/SearchPage'; // not logged in users but with restrictions
import ErrorBoundary from './components/hoc/ErrorBoundry';
import { FeedbackProvider } from './components/hoc/FeedbackContext';
import About from './components/quick links/About';
import PrivacyPolicy from './components/quick links/PrivacyPolicy';
import TermsOfUse from './components/quick links/TermsOfUse';
import Auth from './components/auth/Auth';
import ProductDetailsPage from './components/ProductDetailsPage';

// protected components
const CoachesPage = lazy(() => import('./components/CoachesPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const Diary = lazy(() => import('./components/Diary'));
// auth components
const Logout = lazy(() => import('./components/auth/Logout'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));

const Admin = lazy(() => import('./components/Admin'));
const AddProduct = lazy(() => import('./components/AddProduct'));


// https://excalidraw.com/#json=rSo3sN2fJiBowpks8Aw-h,bYdqBNvCUjKXOchU2HEJMg

function App() {
  const user = useRecoilValue(userState); // Read-only access

  useEffect(() => {
    console.log(`user`, user);
    if (user?.id) {
      console.log(`no user`);
      console.log(user?.id);
    }
  }, [user]);

  return (
    <>
      <ResponsiveComponent>
        {({ width, height }) => (
          <div className=' w-screen h-screen left-0 top-0 absolute'>
            <FeedbackProvider>
              <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}> {/* Fallback while loading */}
                  <ErrorBoundary>
                    <Routes>

                      <Route path="*" element={<Layout main={<Home />} />} />
                      <Route path="/" element={<Layout main={<Home />} />} />
                      <Route path="/coach" element={<Layout main={<CoachesPage />} />} />
                      <Route path="/profile" element={<Layout main={<ProfilePage />} />} />
                      <Route path="/testimonials" element={<Layout main={<Testimonials />} />} />
                      <Route path="/products" element={<Layout main={<ProductsPage />} />} />
                      <Route path="/products/:id" element={<Layout main={<ProductDetailsPage />} />} />
                      <Route path="/diary" element={<Layout main={<Diary />} />} />
                      {/* <Route path="/search/?q=yourSearchTerm" element={<Layout main={<SearchPage />} />} /> */}
                      {/* no need to include ?q=... in route definition. That’s handled by useLocation(). */}
                      <Route path="/search" element={<Layout main={<SearchPage />} />} />
                      <Route path="/about" element={<Layout main={<About />} />} />
                      <Route path="/privacy" element={<Layout main={<PrivacyPolicy />} />} />
                      <Route path="/terms" element={<Layout main={<TermsOfUse />} />} />

                      <Route path="/admin" element={<Layout main={<Auth><Admin /></Auth>} />} />
                      <Route path="/manage-products" element={<Auth><Layout main={<AddProduct />} /></Auth>} />

                      <Route path="/logout" element={<Layout main={<Logout />} />} />
                      <Route path="/login" element={<Layout main={<Login />} />} />
                      <Route path="/register" element={<Layout main={<Register />} />} />
                    </Routes>
                  </ErrorBoundary>
                </Suspense>
              </BrowserRouter>
            </FeedbackProvider>
          </div>
        )}
      </ResponsiveComponent>
    </>
  )
}

export default App
