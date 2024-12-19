import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css'
import ResponsiveComponent from './components/ResponsiveComponent';
// https://excalidraw.com/#json=rSo3sN2fJiBowpks8Aw-h,bYdqBNvCUjKXOchU2HEJMg

function App() {

    return (
      <>
        <ResponsiveComponent>
          {({ width, height }) => (
            <div className=' w-screen h-screen left-0 top-0 absolute'>
              {/* Header */}
              {/* Main */}
              {/* Footer */}
              
            </div>
          )}
        </ResponsiveComponent>
      </>
    )
}

export default App
