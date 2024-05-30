import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box, useToast } from '@chakra-ui/react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
}

const LoginForms: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true during form submission
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully:', email);
      onSubmit({ email, password });
      toast({
        title: 'Welcome to SellZone',
        description: 'User logged in successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('homepage');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error('Error logging in:', error.message);
      toast({
        title: 'Failed',
        description: `Error logging in: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <Box w="100%" className="">
      <form onSubmit={handleSubmit}>
        <FormControl id="email">
          <FormLabel className="subtitle" fontSize={['md', 'lg']}>
            Email:
          </FormLabel>
          <Input w="full" p="2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel className="subtitle" fontSize={['md', 'lg']}>
            Password:
          </FormLabel>
          <Input w="full" p="2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </FormControl>
        <Button
          mt={['1rem']}
          fontSize={['md', 'lg']}
          fontWeight={['md']}
          color="white"
          type="submit"
          w="full"
          p="2"
          bg="green.800"
          disabled={isLoading} 
          _hover={{bg: "green.600"}}
        >
          {isLoading ? 'Loading...' : 'Login'} {/* Show "Loading..." text when loading */}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForms;
