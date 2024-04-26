import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Dashboard/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import DefaultLayout from './layouts/DefaultLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>
      <ChakraProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
