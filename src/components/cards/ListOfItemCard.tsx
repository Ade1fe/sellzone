import { Box, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiStar } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  category?: string;
  subCategory?: string;
  sellersID?: string;
}

const ListOfItemCard: React.FC<CardProps> = ({ id, image, title, price, category,subCategory, sellersID }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate(); 


  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleNavigate = () => {
    // Access document ID here (e.g., for logging or passing to another page)
    console.log("Document ID:", id);

    // Navigate to the desired page using useNavigate
    // navigate(`/item/${id}`, { state: { documentId: id } }); 
    navigate('/item', { state: { id } });
  };

  return (
    <Box
      id={id}
      w='220px'
      m={3}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      textAlign="center"
      onClick={handleNavigate}
    >
      <Image boxSize="220px" mx="auto" src={image} alt={title}  />
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
      <Text mt={2} color="gray.500" w='220px' fontSize="sm" pb='3' display='none'>{category} {subCategory} {sellersID}</Text>
    </Box>
  );
};

export default ListOfItemCard
