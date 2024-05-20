import { Box, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiStar } from 'react-icons/bi';

interface CardProps {
  id: string;
  image: string;
  title: string;
  price: string;
}

const LatestUpdateCard: React.FC<CardProps> = ({ id, image, title, price }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Box
      id={id}
      minW='220px'
      m={3}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      textAlign="center"
    >
      <Image boxSize="220px" mx="auto" src={image} alt={title} />
      <Flex justifyContent="space-between" alignItems="center" mt={3} px={5} w='220px'>
        <Text fontSize="lg" fontWeight="bold">{title}</Text>
        <IconButton
          aria-label="Bookmark"
          icon={<BiStar />}
          isRound
          onClick={handleBookmark}
          colorScheme={isBookmarked ? 'yellow' : 'gray'}
        />
      </Flex>
      <Text mt={2} color="gray.500" w='220px' fontSize="sm" pb='3'>{price}</Text>
    </Box>
  );
};

export default LatestUpdateCard;
