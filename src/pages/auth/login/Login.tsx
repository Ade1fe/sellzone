import React, { useState } from 'react';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  useToast,
} from '@chakra-ui/react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Login Failed',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Login
      </Text>
      <form onSubmit={handleLogin}>
        <FormControl id="email" isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="password" mt="4" isRequired>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button mt="4" colorScheme="blue" type="submit">
          Login
        </Button>
        {error && (
          <Text mt="4" color="red.500">
            {error}
          </Text>
        )}
      </form>
    </Box>
  );
};

export default Login;
