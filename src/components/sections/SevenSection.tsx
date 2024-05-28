import  { useEffect, useState } from 'react';
import axios from 'axios';
import FirstSecCard from '../cards/FirstSecCard';
import ReusableCarousel from '../carousels/ResuableCarousel';

const ACCESS_KEY = 'qP7pqke6xGMdxY8ABFlRPslGexIuzeUYsDV79ZqYwvA';
const API_URL = 'https://api.unsplash.com/search/photos';

const SevenSection = () => {
  const [images, setImages] = useState<{ id: string; src: string; label: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const categories = [
          "Kitchen Equipment","Tools & Supplies","Cleaning Supplies","Furniture","Decor","Storage and Organizational Items","For Emergencies", 'Outdoor Essentials',
        ] ;

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
      <ReusableCarousel title="Household Items" items={carouselItems} />
    </div>
  );
}

export default SevenSection
