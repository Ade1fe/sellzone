import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ListOfItemCard } from '..';
import { Spinner, Box, } from '@chakra-ui/react'; // Import Chakra UI components
import LayoutOne from '../../layout/LayoutOne';

const BookMarked: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookmarkedItems, setBookmarkedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // State for loading indication

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookmarks'));
        const items = querySnapshot.docs.map(doc => doc.data());
        setBookmarkedItems(items);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching bookmarked items: ', error);
        setLoading(false); 
      }
    };
    fetchBookmarkedItems();
  }, []);

  return (
    <LayoutOne>
     <Box display='flex' flexWrap='wrap' gap='2' className="" mt='3rem' maxW='1500px' mx='auto' px='15px'>
     {loading ? ( 
        <Box textAlign="center" w='100%' display='flex' h='70vh' alignItems='center' justifyContent='center'>
          {/* <Image src="/loading.gif" alt="Loading..." /> */}
          <Spinner  thickness='8px'
  speed='0.65s'
  emptyColor='gray.200'
  color='green.500' boxSize='300' mx='auto' />
        </Box>
      ) : (
        bookmarkedItems.map(item => (
          <ListOfItemCard key={item.id} {...item} />
        ))
      )}
     </Box>
    </LayoutOne>
  );
};

export default BookMarked;
