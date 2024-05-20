import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';


interface CategoryItemCardProps {
  id: string;
  src: string;
  label: string;
}

const CategoryItemCard: React.FC<CategoryItemCardProps> = ({
  id,
  src = 'default_image_url', // Default parameter
  label = 'Default Label',  // Default parameter
}) => {
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


export default CategoryItemCard;
