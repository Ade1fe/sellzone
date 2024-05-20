import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

// Define prop types
interface CategoryItemCardProps {
  id: string;
  src: string;
  label: string;
}

const CategoryItemCard: React.FC<CategoryItemCardProps> = ({ id, src, label }) => {
  return (
    <Box textAlign='center' >
        <Text display='none'>{id}</Text>
        <Image 
          boxSize='100px' 
          borderRadius='50%' 
          src={src} 
          mx='auto'
          mb='0.5rem'
          alt={label} 
          objectFit='cover'
        />
        <Text fontSize={['md', ]} w='120px' textTransform='capitalize' className='subtitle'>{label}</Text>
    </Box>
  );
}

// Default props for the component
CategoryItemCard.defaultProps = {
  id: 'Default ID',
  src: 'https://via.placeholder.com/100', // Placeholder image
  label: 'Default Label'
};

export default CategoryItemCard;
