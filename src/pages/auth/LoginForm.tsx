

// LoginForm.tsx
import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully:', email);
      onSubmit({ email, password });
      navigate('/homepage')
      // Redirect or show success message
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Show error message
    }
  };

  return (
   <Box w='100%' className="">
     <form onSubmit={handleSubmit}>
      <FormControl id="email">
        <FormLabel className='subtitle' fontSize={['md', 'lg']}>Email:</FormLabel>
        <Input w='full' p='2' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </FormControl>
      <FormControl id="password" mt={4}>
        <FormLabel className='subtitle' fontSize={['md', 'lg']}>Password:</FormLabel>
        <Input w='full' p='2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      </FormControl>
      <Button mt={['1rem']} fontSize={['md', 'lg']} fontWeight={['md']} color="white" type="submit" w='full' p='2' bg='green.800'>
        Login
      </Button>
    </form>
   </Box>
  );
};

export default LoginForm;
