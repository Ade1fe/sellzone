// landingpage
import { useState } from 'react';
import { Box, Button, Center, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { RegistrationForm } from '..';
import LoginForm from '../auth/LoginForm';

const Landingpage = () => {
  const [userType, setUserType] = useState('buyer');

  const handleRegistration = (userData: any) => {
    console.log('User registered:', userData);
  };

  const handleLogin = (credentials: any) => {
    console.log('User logged in:', credentials);
  };

  return (
    <div className="wave-container">
      <Center minH="100vh" className="texts">
        <div className="wave"></div>
        <Box p={[2, 3, 4, 5]} bg='#f1f1f1' shadow={['md']} borderWidth={1} borderRadius="lg" width={['90%', '80%', '70%', '50%']}>
          <VStack spacing={3}>
            <Heading as="h1" fontSize={['lg', "xl", 'xx-large']}>Welcome to <Text as='span' className='logo' textShadow='1px 1px green'>SellZone</Text></Heading>
            <Divider />
            <Box display='flex' gap='6' justifyContent='flex-end' w={['100%']} fontSize={['md', 'lg']} textAlign='left'>
              <Button shadow='base' borderRadius='md' bg='white' py='2' px='4' color={userType === 'buyer' ? 'green.600' : 'black'} onClick={() => setUserType('buyer')}>
                Buyer
              </Button>
              <Button shadow='base' borderRadius='md' bg='white' py='2' px='4' color={userType === 'seller' ? 'green.600' : 'black'} onClick={() => setUserType('seller')}>
                Seller
              </Button>
            </Box>
            <Divider />
            {userType === 'buyer' ? (
              <Box w={['100%']} p={['10px', '15px', '20px']}>
                <Heading className='title' as="h2" fontWeight='700' size="md" fontSize={['lg', 'lg', 'x-large']}>Buyer Registration</Heading>
                <RegistrationForm onSubmit={handleRegistration} userType={userType} />
                <Heading className='title' as="h2" fontWeight='700' size="md" fontSize={['lg', 'lg', 'x-large']} marginTop={['1rem']} mt={4}>Buyer Login</Heading>
                <LoginForm onSubmit={handleLogin} />
              </Box>
            ) : (
              <Box w={['100%']} p={['10px', '15px', '20px']}>
                <Heading className='title' as="h2" fontWeight='700' size="md" fontSize={['lg', 'lg', 'x-large']} marginTop={['1rem']} mt={4}>Seller Registration</Heading>
                <RegistrationForm onSubmit={handleRegistration} userType={userType} />
                <Heading className='title' as="h2" fontWeight='700' size="md" fontSize={['lg', 'lg', 'x-large']} marginTop={['1rem']} mt={4}>Seller Login</Heading>
                <LoginForm onSubmit={handleLogin} />
              </Box>
            )}
          </VStack>
        </Box>
      </Center>
    </div>
  );
};

export default Landingpage;
