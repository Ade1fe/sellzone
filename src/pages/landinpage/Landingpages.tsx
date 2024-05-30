import React, { useState } from 'react';
import { Center, Button, Box, Heading } from "@chakra-ui/react";
import RegistrationForms from "../auth/RegistrationForms";
import LoginForms from '../auth/LoginForms';

const LandingPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (userData: any) => {
    console.log('Form submitted with data:', userData);
  };

  return (
    <Center minH="100vh" className='subtitle'>
        <div className="wave"></div>
      <Box w={['90%', '80%', '60%', '40%',   '30%']} p="6" boxShadow="lg" borderRadius="md" bg="white">
        <Heading className='title' as="h2" size="lg" mb="4" textAlign="center">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </Heading>
        {isSignUp ? (
          <RegistrationForms onSubmit={handleSubmit} />
        ) : (
          <LoginForms onSubmit={handleSubmit} />
        )}
        <Button variant="link" onClick={toggleForm} mt="4" alignSelf="center">
          {isSignUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
        </Button>
      </Box>
    </Center>
  );
};

export default LandingPage;
