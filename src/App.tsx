
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChakraBaseProvider, ChakraProvider } from '@chakra-ui/react';
import { auth, onAuthStateChanged } from './firebase'; 
import router from './Router';
import './index.css';

function App() {
  useEffect(() => {
    // Set up the authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', user.uid);
      } else {
        console.log('User is logged out');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
          <ChakraProvider >
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </>
  );
}

export default App;









