import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface CardProps {
  id: string;
  image: string;
  label: string;
}

const FirstSecCard: React.FC<CardProps> = ({ id, image, label }) => {
  return (
    <Box id={id} boxSize="250px" m={3} textAlign="center" >
      <Image boxSize="200px" src={image} alt={label} objectFit='cover' />
      <Text mt={2} className='subtitle' w='190px' textTransform='capitalize' fontSize={['sm','md']}>{label}</Text>
    </Box>
  );
}

export default FirstSecCard
