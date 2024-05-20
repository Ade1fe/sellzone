import { Box, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { controller, headset, laptopgame, nintendo, oculus, playstation, xbox } from '../../assets';
import FirstSecCard from '../cards/FirstSecCard';

const FirstSection: React.FC = () => {
  return (
    <Box p={5} >
      <Text fontSize="2xl" mb={5} className='title' textShadow='1px 0.5px brown'>Gaming Accessories</Text>
      <Flex justifyContent="space-around" overflowX='auto' w='100%' >
        <FirstSecCard id="xbox" image={xbox} label="Xbox" />
        <FirstSecCard id="laptopgame" image={laptopgame} label="Laptop Game" />
        <FirstSecCard id="oculus" image={oculus} label="oculus" />
        <FirstSecCard id="playstation" image={playstation} label="PlayStation" />

        <FirstSecCard id="nintendo" image={nintendo} label="nintendo" />
        <FirstSecCard id="headset" image={headset} label="headset" />
        <FirstSecCard id="controller" image={controller} label="controller" />
      </Flex>
    </Box>
  );
}

export default FirstSection;
