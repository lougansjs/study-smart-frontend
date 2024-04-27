import { Route, Routes } from 'react-router-dom';
import {Login, Register, } from '@/pages';
import {Public, Protected, Home} from '@/layouts';
import { ChakraProvider } from '@chakra-ui/react'
import { profileRoutes } from '@/routes'

function App() {
  return (
    <>
      <ChakraProvider>
        <Routes>
          <Route element={<Public />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<Protected />}>
          <Route path='/' element={<Home />} >
            {profileRoutes()}
          </Route>

          </Route>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
