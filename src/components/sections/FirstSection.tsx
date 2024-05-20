import { Box, } from '@chakra-ui/react';
import React from 'react';
import { controller, headset, laptopgame, nintendo, oculus, playstation, xbox } from '../../assets';
import FirstSecCard from '../cards/FirstSecCard';
import ReusableCarousel from '../carousels/ResuableCarousel';

const FirstSection: React.FC = () => {
  const items = [
    <FirstSecCard key="xbox1" id="xbox" image={xbox} label="Xbox" />,
    <FirstSecCard key="laptopgame" id="laptopgame" image={laptopgame} label="Laptop Game" />,
    <FirstSecCard key="" id="oculus" image={oculus} label="oculus" />,
    <FirstSecCard key="" id="playstation" image={playstation} label="PlayStation" />,

    <FirstSecCard key="" id="nintendo" image={nintendo} label="nintendo" />,
    <FirstSecCard key= "" id="headset" image={headset} label="headset" />,
    <FirstSecCard key= "" id="controller" image={controller} label="controller" />,
  ]
  return (
    <Box p={5} >
      <ReusableCarousel title="Gaming Accessories" items={items} />
    </Box>
  );
}

export default FirstSection;
