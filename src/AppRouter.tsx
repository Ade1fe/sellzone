

// AppRouter.tsx
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddItemForm, DisplayItem, Homepage, Landingpage, ListOfItems } from './pages';
import SellerDashboard from './pages/display/SellerDashboard';
import { getAuth, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const AppRouter = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserType(userData.userType || '');
          } else {
            setUserType('');
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setCurrentUser(null);
        setUserType(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const routes = [
    { path: '/', element: <Landingpage /> },
    { path: 'homepage', element: <Homepage /> },
    { path: 'listofitem', element: <ListOfItems /> },
    { path: 'admin', element: <AddItemForm /> },
    { path: 'item', element: <DisplayItem /> },
    {
      path: 'seller',
      element: currentUser && userType === 'seller'
        ? <SellerDashboard sellerId={currentUser.uid} />
        : <div>Seller Dashboard is only accessible to sellers.</div>
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRouter;
