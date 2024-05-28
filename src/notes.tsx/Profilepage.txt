import React, { useEffect, useState } from 'react';
import { getAuth, User } from 'firebase/auth';
import { doc, getFirestore, getDoc, updateDoc, DocumentReference } from 'firebase/firestore';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
  Image,
  Avatar,
} from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';
import LayoutOne from '../../layout/LayoutOne';
import { bioImg } from '../../assets';

const ProfilePage = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editedUserData, setEditedUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          setCurrentUser(auth.currentUser);

          const firestore = getFirestore();
          const docRef = doc(firestore, 'users', auth.currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setEditedUserData(docSnap.data());
          }
        }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
    try {
      if (auth.currentUser) {
        const docRef = doc(getFirestore(), 'users', auth.currentUser.uid);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateDoc(docRef as DocumentReference<any>, editedUserData);
        setIsEditing(false);
        setUserData(editedUserData); // Update userData with edited data
        console.log('User data updated successfully');
      }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error updating user data:', error.message);
    }
  };

  return (
  <LayoutOne>
      <Box p="4" pos='relative' className='texts'>
      {currentUser && userData && (
        <Box>
            <Box className="" w='full' h='150px'>
                <Image src={bioImg} w='full' h='full' objectFit='cover' />
            </Box>
         <Box pos='absolute' p='4' boxShadow='base' borderRadius='10px' top='100px' w='90%' bg='white' className="" zIndex='99' left='50%'
      transform='translateX(-50%)'>
         <Flex alignItems="center" mb="2">
            <Avatar borderRadius='0' src="https://via.placeholder.com/150" mr="4" />
            <Heading as="h2" size="lg">Profile</Heading>
          </Flex>
          <Text fontSize={["md", 'lg', 'x-large']} fontWeight="bold"> {userData.name}</Text>
          <Text fontSize={["md", 'lg',]}>{userData.email}</Text>
          <Text fontSize={["md", 'lg',]} textTransform='capitalize'>{userData.userType}</Text>
         
         </Box>
   
<Box display={['block', 'block', 'flex']} gap='4' mt='9rem' maxWidth='1400px' mx='auto' className="" >
<Box  className="" w={['full', 'full', '50%']}>
   {userData.businessType && (
            <Text fontSize={["md", 'lg',]} mb='0.5rem'>Bio: {userData.bio}</Text>
          )}
          <Text fontSize={["md", 'lg',]} mb='0.5rem'>House Address: {userData.houseAddress}</Text>
          <Text fontSize={["md", 'lg',]} mb='0.5rem'>Phone Number: {userData.phoneNumber}</Text>
          {userData.businessType && (
            <Text fontSize={["md", 'lg',]} mb='0.5rem'> Business Type: {userData.businessType}</Text>
          )}
          {userData.businessName && (
            <Text fontSize={["md", 'lg',]} mb='0.5rem'>Business Name: {userData.businessName}</Text>
          )}
          <Button mt="4" leftIcon={<BiEditAlt />} onClick={handleEditToggle}>Edit Profile</Button>
   </Box>
       <Box className="" w={['full','full', '50%']}>
       {isEditing ? (
            <Box mt={[ '4','6','0']} >
                  <FormControl mb="2">
                  <FormLabel>Bio</FormLabel>
                  <Input
                    type="text"
                    name="bio"
                    value={editedUserData.bio || ''}
                    onChange={handleInputChange}
                    w='full'
                  />
                </FormControl>
              <FormControl mb="2">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={editedUserData.name || ''}
                  onChange={handleInputChange}
                  w='full'
                />
              </FormControl>
              <FormControl mb="2">
                <FormLabel>Business Name</FormLabel>
                <Input
                  type="text"
                  name="businessName"
                  value={editedUserData.businessName || ''}
                  onChange={handleInputChange}
                  w='full'
                />
              </FormControl>
              <FormControl mb="2">
                <FormLabel>Business Type</FormLabel>
                <Input
                  type="text"
                  name="businessType"
                  value={editedUserData.businessType || ''}
                  onChange={handleInputChange}
                  w='full'
                />
              </FormControl>
              <FormControl mb="2">
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={editedUserData.phoneNumber || ''}
                  onChange={handleInputChange}
                  w='full'
                />
              </FormControl>
              <FormControl mb="2">
                <FormLabel>House Address</FormLabel>
                <Input
                  type="text"
                  name="houseAddress"
                  value={editedUserData.houseAddress || ''}
                  onChange={handleInputChange}
                  w='full'
                />
              </FormControl>

              <Button onClick={handleSaveChanges} mr="4">Save Changes</Button>
              <Button onClick={handleEditToggle}>Cancel</Button>
            </Box>
          ) : (
            <Button mt="4" display='none' leftIcon={<BiEditAlt />} onClick={handleEditToggle}>Edit Profile</Button>
          )}
       </Box>
</Box>


        </Box>
      )}
    </Box>

  </LayoutOne>
  );
};

export default ProfilePage;
