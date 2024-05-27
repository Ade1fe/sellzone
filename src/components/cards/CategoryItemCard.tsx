import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


interface CategoryItemCardProps {
  id: string;
  src: string;
  label: string;
}

const CategoryItemCard: React.FC<CategoryItemCardProps> = ({
  id,
  src = 'default_image_url', 
  label = 'Default Label',  
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/listofitem', { state: { id, categories: label } });
  };


  return (
    <Box textAlign='center'onClick={handleClick} cursor='pointer' mx='auto'>
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

export default CategoryItemCard;
