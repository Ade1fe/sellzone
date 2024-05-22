
// RegistrationForm.tsx
import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormProps {
  userType: string;
  onSubmit: (userData: { [key: string]: string }) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ userType, onSubmit }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '', // For sellers only
    businessType: '', // For sellers only
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password, name, businessName, businessType } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = {
        uid: user.uid,
        name,
        email,
        userType,
        businessName: userType === 'seller' ? businessName : '',
        businessType: userType === 'seller' ? businessType : '',
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
      console.log('User registered successfully:', userDoc);
      onSubmit(userDoc);
      // Redirect or show success message
      navigate('/homepage')
    } catch (error) {
      console.error('Error registering user:', error.message);
      // Show error message
    }
  };

  return (
    <Box w='full' className="" mb={['2rem']}>
      <form onSubmit={handleSubmit}>
        <FormControl id="name">
          <FormLabel className='subtitle' fontSize={['md', 'lg']}>Name:</FormLabel>
          <Input type="text" w='full' p='2' name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
        </FormControl>
        <FormControl id="email" mt={4}>
          <FormLabel className='subtitle' fontSize={['md', 'lg']}>Email:</FormLabel>
          <Input type="email" w='full' p='2' name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel className='subtitle' fontSize={['md', 'lg']}>Password:</FormLabel>
          <Input type="password" w='full' p='2' name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
        </FormControl>
        {userType === 'seller' && (
          <Box>
            <FormControl id="businessName" mt={4}>
              <FormLabel className='subtitle' fontSize={['md', 'lg']}>Business Name:</FormLabel>
              <Input type="text" w='full' p='2' name="businessName" value={userData.businessName} onChange={handleChange} placeholder="Business Name" required />
            </FormControl>
            <FormControl id="businessType" mt={4}>
              <FormLabel className='subtitle' fontSize={['md', 'lg']}>Business Type:</FormLabel>
              <Input type="text" w='full' p='2' name="businessType" value={userData.businessType} onChange={handleChange} placeholder="Business Type" required />
            </FormControl>
          </Box>
        )}
        <Button mt={['1rem']} fontSize={['md', 'lg']} w='full' p='2' bg='green.800' fontWeight={['md']} color="white" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegistrationForm;
