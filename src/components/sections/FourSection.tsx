import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FirstSecCard from '../cards/FirstSecCard';
import ReusableCarousel from '../carousels/ResuableCarousel';

const ACCESS_KEY = '3eFu-T8CqNBo7CJcD9Ceoth7k8QVOym0H7rR4bpW8d4';
const API_URL = 'https://api.unsplash.com/search/photos';

const FourSection = () => {
  const [images, setImages] = useState<{ id: string; src: string; label: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const categories = ['gift cards', 'Sephora', 'Walmart', 'Nordstrom', 'iTunes', 'eBay', 'Nike Gift Card ', 'Vanilla'] ;

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
          src: response.data.results[0]?.urls?.regular || 'default_image_url',
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
    <FirstSecCard
      key={image.id}
      id={image.id}
      image={image.src}
      label={image.label}
    />
  ));

  return (
    <div>
      <ReusableCarousel title="Gift Cards" items={carouselItems} />
    </div>
  );
}

export default FourSection;
