import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box, useToast, Select } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';

interface RegistrationFormProps {
  onSubmit: (userData: { [key: string]: string }) => void;
}

const RegistrationForms: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '', // Include password field here
    businessName: '', // For sellers only
    businessType: '', // For sellers only
    phoneNumber: '', // New field for phone number
    houseAddress: '', // New field for house address
    userType: 'buyer', // Default userType
  });

  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegistrationSubmit = async () => {
    try {
      const { email, password, name, businessName, businessType, phoneNumber, houseAddress, userType } = userData;

      // Basic validation for required fields
      if (!email || !password || !name || !phoneNumber || !houseAddress) {
        toast({
          title: 'Validation Error',
          description: 'All fields are required',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: 'Validation Error',
          description: 'Invalid email format',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Validate phone number format
      if (!phoneNumber.startsWith('+234')) {
        toast({
          title: 'Validation Error',
          description: 'Phone number must start with +234',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // If all validations pass, proceed with user registration
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = {
        uid: user.uid,
        name,
        email,
        userType,
        businessName: userType === 'seller' ? businessName : '',
        businessType: userType === 'seller' ? businessType : '',
        phoneNumber,
        houseAddress,
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
      console.log('User registered successfully:', userDoc);
      onSubmit(userDoc);
    
      toast({
        title: 'Welcome to SellZone',
        description: 'User registered successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('homepage');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error('Error registering user:', error.message);
      toast({
        title: 'Failed',
        description: `Error registering user: ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Box w="full" className="" mb={['2rem']} bg='white'>
      <form onSubmit={(e) => { e.preventDefault(); handleRegistrationSubmit(); }}>
        <FormControl id="name">
          <FormLabel className="subtitle" fontSize={['md', 'lg']}>
            Name:
          </FormLabel>
          <Input type="text" w="full" p="2" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
        </FormControl>
        <FormControl id="email" mt={4}>
          <FormLabel className="subtitle" fontSize={['md', 'lg']}>
            Email:
          </FormLabel>
          <Input type="email" w="full" p="2" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel className="subtitle" fontSize={['md', 'lg']}>
            Password:
          </FormLabel>
          <Input type="password" w="full" p="2" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
        </FormControl>
        <FormControl id="phoneNumber" mt={4}>
          <FormLabel className="subtitle" fontSize={['md', 'lg']}>
            Phone Number:
          </FormLabel>
          <Input type="tel" w="full" p="2" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        </FormControl>
        <FormControl id="houseAddress" mt={4}>
          <FormLabel className="subtitle" fontSize={['md', 'lg']}>
            House Address:
          </FormLabel>
          <Input type="text" w="full" p="2" name="houseAddress" value={userData.houseAddress} onChange={handleChange} placeholder="House Address" required />
        </FormControl>
        <Select name="userType" value={userData.userType} onChange={handleChange} mt={4}>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </Select>
        {userData.userType === 'seller' && (
          <Box>
            <FormControl id="businessName" mt={4}>
              <FormLabel className="subtitle" fontSize={['md', 'lg']}>
                Business Name:
              </FormLabel>
              <Input type="text" w="full" p="2" name="businessName" value={userData.businessName} onChange={handleChange} placeholder="Business Name" required />
            </FormControl>
            <FormControl id="businessType" mt={4}>
              <FormLabel className="subtitle" fontSize={['md', 'lg']}>
                Business Type:
              </FormLabel>
              <Input type="text" w="full" p="2" name="businessType" value={userData.businessType} onChange={handleChange} placeholder="Business Type" required />
            </FormControl>
          </Box>
        )}
        <Button
          mt={['1rem']}
          fontSize={['md', 'lg']}
          w="full"
          p="2"
          bg="green.800"
          fontWeight={['md']}
          color="white"
          type="submit"
          disabled={isLoading} 
          _hover={{bg: "green.600"}}
        >
          {isLoading ? 'Loading...' : 'Register'} 
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForms;
