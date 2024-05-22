
import { Box } from '@chakra-ui/react';
import React from 'react';
import { controller, headset, laptopgame, nintendo, oculus, playstation, xbox } from '../../assets';
import FirstSecCard from '../cards/FirstSecCard';
import ReusableCarousel from '../carousels/ResuableCarousel';

const FirstSection: React.FC = () => {
  const items = [
    { id: "Xbox", image: xbox, label: "Xbox" },
    { id: "laptopgame", image: laptopgame, label: "Laptop Game" },
    { id: "oculus", image: oculus, label: "Oculus" },
    { id: "playstation", image: playstation, label: "PlayStation" },
    { id: "nintendo", image: nintendo, label: "Nintendo" },
    { id: "headset", image: headset, label: "Headset" },
    { id: "controller", image: controller, label: "Controller" },
  ];

  const handleClick = (id: string) => {
    const normalizedId = id.toLowerCase();
    // Perform your case-insensitive handling here
    console.log("Clicked item ID (normalized):", normalizedId);
    // Example action: Find the clicked item
    const clickedItem = items.find(item => item.id.toLowerCase() === normalizedId);
    if (clickedItem) {
      console.log("Clicked item:", clickedItem);
      // Handle the clicked item as needed
    }
  };

  return (
    <Box p={5}>
      <ReusableCarousel 
        title="Gaming Accessories" 
        items={items.map(item => (
          <div key={item.id} onClick={() => handleClick(item.id)}>
            <FirstSecCard id={item.id} image={item.image} label={item.label} />
          </div>
        ))}
      />
    </Box>
  );
}

export default FirstSection;
