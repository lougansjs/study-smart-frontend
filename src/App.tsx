import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import {Login, Register, Public, Protected, Home} from '@/presentations';
import { profileRoutes } from '@/routes'
import { theme } from "@/config"

function App() {
  return (
    <>
      <ChakraProvider
        theme={theme}
      >
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
