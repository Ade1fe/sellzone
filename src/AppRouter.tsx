

// AppRouter.tsx
import  { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AboutUsPage, BookMarked, DisplayItem, FaqComp, Homepage, Landingpage, ListOfItems, PrivacyPolicyPage, ProfilePage, SupportPage } from './pages';
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
    { path: 'profile', element: <ProfilePage /> },
    { path: 'item', element: <DisplayItem /> },
    { path: 'faq', element: <FaqComp /> },
    { path: 'support-page', element: <SupportPage /> },
    { path: 'private-page', element: <PrivacyPolicyPage /> },
    { path: 'about-page', element: <AboutUsPage /> },
    { path: 'bookmarked', element: <BookMarked /> },
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
