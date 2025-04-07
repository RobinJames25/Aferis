import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext.jsx';

import Home  from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import NavBar from "./components/Navbar.jsx";
import Store from './pages/Store.jsx';

export default function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Toaster position='bottom-right' />
          <Routes>
            <Route 
              path='/signin' 
              element={<><NavBar /><SignIn /></>} 
            />
            <Route 
              path='/signup' 
              element={<><NavBar /><SignUp /></>} />
            <Route path='/' element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/store' element={<Store />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </ChakraProvider>
    </UserProvider>
  )
}