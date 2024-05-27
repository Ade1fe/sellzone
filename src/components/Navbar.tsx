import React, { useState, useEffect } from 'react';
import { Box, Button, Icon, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { IoIosArrowDown } from "react-icons/io";
import { getAuth, signOut, User } from 'firebase/auth';
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import { GiBookmarklet } from 'react-icons/gi';
import { Sidebarcomp } from '../pages';

const Navbar: React.FC = () => {
  const auth = getAuth();
  const [, setUser] = useState<User | null>(null);
  const [, setError] = useState<string | null>(null);
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
            setUserType(userData.userType);
          }
        }
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
    } catch (error:any) {
      setError(error.message);
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <Box pt='6' px='15px' pb={['3','5', '10']} className='texts' pos='fixed' top='0' bg='white' w='full' zIndex='999' justifyContent='center' gap={['3','4','5', '6','8']} alignItems='center' display={['flex']}>
      <Box> 
        <Sidebarcomp id={''} label={''} /> 
      </Box>
      <Link to='/homepage'> 
        <Text w={['']} as='span' className='logo' fontSize={[ 'x-large', 'xx-large', '31px']} textShadow='1px 1px green'>SellZone</Text>
      </Link>
     
      <Box w={['50%']}  display={['none','none', 'block']}>
        <NavbarSearch />
      </Box>
      <Box className="" display={['']} ml={['1rem', '8rem', '0',  '0','0']}>
        <Menu>
          <MenuButton bg='transparent' _hover={{bg: "transparent", color: "black"}} fontSize={[ 'md', 'lg', ]} cursor='pointer' color='black' as={Button} rightIcon={<IoIosArrowDown />}>
            Account
          </MenuButton>
          <MenuList shadow='md' bg="white" zIndex='9'>
            {userType === 'seller' && 
            <div className="">
              <Link to="/seller">  <MenuItem>Seller Dashboard</MenuItem></Link>
              <Link to="/profile">  <MenuItem>Profile Page</MenuItem></Link>
            </div>
            }
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            {userType !== 'seller' &&
            <div>
              <MenuItem >Profile Page</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </div>
            }
          </MenuList>
        </Menu>
      </Box>

      <Box className="" display={['none','none', 'block']}>
        <Link to='/bookmarked' className=""> <Icon as={GiBookmarklet} boxSize={[6,7,8]} mt='1rem' /> </Link>
      </Box>
   
    </Box>
  );
}

export default Navbar;
