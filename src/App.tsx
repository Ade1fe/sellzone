

import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraBaseProvider,  } from '@chakra-ui/react';
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
          <ChakraBaseProvider >
        <RouterProvider router={router}></RouterProvider>
      </ChakraBaseProvider>
    </>
  );
}

export default App;









