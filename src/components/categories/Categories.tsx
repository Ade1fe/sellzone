import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryItemCard from '../cards/CategoryItemCard';
import ReusableCarousel from '../carousels/ResuableCarousel';

const ACCESS_KEY = '3eFu-T8CqNBo7CJcD9Ceoth7k8QVOym0H7rR4bpW8d4';
const API_URL = 'https://api.unsplash.com/search/photos';

const Categories: React.FC = () => {
  const [images, setImages] = useState<{ id: string; src: string; label: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const categories = ['shirt', 'suit', 'pants', 'shoes', 'handbags', 'perfume', 'cap', 'shorts', 'monitor', 'tv', 'Computer', 'toys'];

        const imageRequests = categories.map(category =>
          axios.get(API_URL, {
            params: {
              query: category,
              per_page: 1,
              w: 400,
              h: 400
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`
            }
          })
        );

        const responses = await Promise.all(imageRequests);
        const fetchedImages = responses.map((response, index) => ({
          id: (index + 1).toString(),
          src: response.data.results[0].urls.regular,
          label: categories[index]
        }));

        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const carouselItems = images.map(image => (
    <CategoryItemCard
      key={image.id}
      id={image.id}
      src={image.src}
      label={image.label}
    />
  ));

  return (
    <Box
      bg='white'
      w='95%'
      // py='4'
      px='10px'
      left='50%'
      transform='translateX(-50%)'
      borderTopRightRadius='50px'
      borderTopLeftRadius='50px'
      pos='absolute'
      bottom='-80px'
      shadow='md'
    >
      <ReusableCarousel  items={carouselItems} />
    </Box>
  );
}

export default Categories;
