
import React, { useState, useEffect } from 'react';
import { Box, Button, Icon, Input, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { getAuth, signOut, User } from 'firebase/auth';
import { getDoc, doc, getFirestore } from 'firebase/firestore'; // Import Firestore functions
import { Link } from 'react-router-dom';
import { Sidebarcomp } from '../pages';

const Navbar: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const docRef = doc(getFirestore(), 'users', auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(auth.currentUser);
            const userData = docSnap.data();
            setUserType(userData.userType); // Set userType from user data
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        setError(error.message);
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      setError(error.message);
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <Box display={['flex', ""]} py='4' justifyContent='center' gap={['3','4','5', '6','8']} alignItems='center'>
      <Sidebarcomp />
      <Link to='/homepage'> 
        <Text as='span' className='logo' fontSize={['lg', 'x-large', 'xx-large']} textShadow='1px 1px green'>SellZone</Text>
      </Link>
      <Box display={['flex', ""]} w={['50%']} justifyContent='space-between' gap='2' alignItems='center' className="">
        <Input placeholder='search products, brands and categories' />
        <Button bg='green.600' _hover={{bg: "green.800"}} cursor='pointer' color='white'>Search</Button>
      </Box>
      
      <div className="">
        <Menu>
          <MenuButton bg='green.600' _hover={{bg: "green.800"}} cursor='pointer' color='white' as={Button} rightIcon={<IoIosArrowDown />}>
            Account
          </MenuButton>
          <MenuList shadow='md' bg="white" zIndex='9'>
            {userType === 'seller' && <Link to="/seller">  <MenuItem>Sell</MenuItem></Link>}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            {userType !== 'seller' &&
            <div className="">
    <MenuItem >Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
            </div>
            }
          </MenuList>
        </Menu>
      </div>

      <div className=""> <Icon as={HiOutlineShoppingCart} boxSize={[6,7,8]} /> </div>
    </Box>
  );
}

export default Navbar;
