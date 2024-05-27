import React, { useState, useRef } from 'react';
import { Box, Button, Input, List, ListItem, Image, Text, Spinner } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { notfound } from '../assets';

const NavbarSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        return; // Do not search if the search term is empty or contains only whitespace
      }
      setLoading(true);
      const itemsRef = collection(db, 'items');
      
      // Search by categories
      const categoryQuery = query(itemsRef, where('categories', 'array-contains', searchTerm.toLowerCase()));
      const categorySnapshot = await getDocs(categoryQuery);
      
      // Search by subcategories
      const subcategoryQuery = query(itemsRef, where('subcategories', 'array-contains', searchTerm.toLowerCase()));
      const subcategorySnapshot = await getDocs(subcategoryQuery);
      
      // Search by title
      const titleQuery = query(itemsRef, 
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff')
      );
      const titleSnapshot = await getDocs(titleQuery);
      
      // Merge the results
      const results: any[] = [];
      categorySnapshot.forEach(doc => {
        const data = doc.data();
        results.push({ id: doc.id, ...data });
      });
      subcategorySnapshot.forEach(doc => {
        const data = doc.data();
        if (!results.some(result => result.id === doc.id)) {
          results.push({ id: doc.id, ...data });
        }
      });
      titleSnapshot.forEach(doc => {
        const data = doc.data();
        if (!results.some(result => result.id === doc.id)) {
          results.push({ id: doc.id, ...data });
        }
      });
  
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (id: any) => {
    console.log("Document ID:", id);
    navigate('/item', { state: { id } });
  };

  const handleInputBlur = () => {
    setSearchResults(null);
  };

  const handleButtonClick = () => {
    setSearchResults(null);
  };

  return (
    <Box>
      <Box display={['flex', ""]} w={['100%']} justifyContent='space-between' gap='2' alignItems='center' className="">
        <Input
          placeholder='Search products, brands, and categories...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleInputBlur}
          ref={inputRef}
          bg='white'
          color='black'
          shadow='md'
          border='none'
          focusBorderColor="lime"
          mb='0.2rem'
          outlineColor='white'
        />
        <Button
          bg='green.600'
          _hover={{ bg: "green.800" }}
          cursor='pointer'
          color='white'
          onClick={handleSearch}
          onBlur={handleButtonClick}
        >
          Search
        </Button>
      </Box>
      <Box   pos='relative'>
        {loading ? (
          <Box textAlign="center" pos='absolute' top='-100%' zIndex='90' bg='white' w='full'>
            <Spinner size="lg" color="green.500" mx='auto' />
            <Text mt={2} fontWeight="semibold">Searching...</Text>
          </Box>
        ) : searchTerm.trim() && searchResults === null ? (
          <Text pos='absolute' top='-100%' bg='white' zIndex='90' textAlign="center" mt={4} fontSize="lg" fontWeight="semibold" p='2'>Enter a search term and click search button</Text>
        ) : searchResults && searchResults.length === 0 ? (
          <Box textAlign="center" bg='white' mt={4}shadow='base' pos='absolute' top='-100%' zIndex='90' w='full'>
            <Text fontSize="lg" fontWeight="semibold">Oh shoot, We looked and looked...But we couldn't find anything for "{searchTerm}".</Text>
            <Image src={notfound} alt="No Results" boxSize="200px" mt={4} mx="auto" />
          </Box>
        ) : (
          <List pos='absolute' top='-100%' pb='34px'  zIndex='90' bg='white' w='full'>
            {searchResults && searchResults.map((item, index) => (
              <ListItem key={index} my='10px' w='90%' overflow='hidden' mx='auto' borderRadius='20px' shadow='base'>
                <Box display="flex" alignItems="center" onClick={() => handleNavigate(item.id)} cursor="pointer" _hover={{ bg: "gray.100" }} p={1} borderRadius="md">
                  <Image src={item.imageUrl} alt={item.title} boxSize="90px" objectFit="cover" mr={4} />
                  <Box>
                    <Text fontSize="lg" fontWeight="semibold"> Title:{item.title}</Text>
                    <Text fontSize="md">Price:{item.price}</Text>
                    <Text fontSize="sm" color="gray.500" textTransform='uppercase' noOfLines={1}>{item.categories}</Text>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default NavbarSearch;
