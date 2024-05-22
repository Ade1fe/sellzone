
import { Box, Image, Text, IconButton, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { BiStar } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

interface CardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  category?: string;
  subCategory?: string;
  sellersID?: string;
}

const LatestUpdateCard: React.FC<CardProps> = ({ id, image, title, price, category, subCategory, sellersID }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the item is already bookmarked
    const checkBookmark = async () => {
      const q = query(collection(db, 'bookmarks'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      setIsBookmarked(!querySnapshot.empty);
    };
    checkBookmark();
  }, [id]);

  const handleBookmark = async () => {
    if (isBookmarked) {
      // Remove from bookmarks
      const q = query(collection(db, 'bookmarks'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (bookmark) => {
        await deleteDoc(doc(db, 'bookmarks', bookmark.id));
      });
      setIsBookmarked(false);
    } else {
      // Add to bookmarks
      await addDoc(collection(db, 'bookmarks'), {
        id,
        image,
        title,
        price,
        category: category || '',
        subCategory: subCategory || '',
        sellersID: sellersID || '',
      });
      setIsBookmarked(true);
    }
  };

  const handleNavigate = () => {
    console.log('Document ID:', id);
    navigate('/item', { state: { id } });
  };

  return (
    <Box
      id={id}
      minW='220px'
      m={3}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
      textAlign='center'
    >
      <Image boxSize='220px' mx='auto' src={image} alt={title} onClick={handleNavigate} />
      <Flex justifyContent='space-between' alignItems='center' mt={3} px={5} w='220px'>
        <Text fontSize='lg' fontWeight='bold'>{title}</Text>
        <IconButton
          aria-label='Bookmark'
          icon={<BiStar />}
          isRound
          onClick={handleBookmark}
          colorScheme={isBookmarked ? 'yellow' : 'gray'}
        />
      </Flex>
      <Text mt={2} color='gray.500' w='220px' fontSize='sm' pb='3'>{price}</Text>
      <Box>
        <Text mt={2} color='gray.500' w='220px' fontSize='sm' pb='3'>category: {category}</Text>
        <Text mt={2} color='gray.500' w='220px' fontSize='sm' pb='3'>subCategory: {subCategory}</Text>
        <Text mt={2} color='gray.500' w='220px' fontSize='sm' pb='3'>sellersID: {sellersID}</Text>
      </Box>
    </Box>
  );
};

export default LatestUpdateCard;
