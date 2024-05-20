import { useEffect, useState } from 'react';
import '../carousel-css/HeroCarouselcss.css';
import { HeelandBag, applewatch, bagImg, bedromImg, earpod, makeupkit, menshoe, monitor, pantsImg1, plentyshoe, pots, shirt, smartwatch, tops, womentops } from '../../assets';
import { Box } from '@chakra-ui/react';

const HeroCarousel = () => {
  const images = [ 
    HeelandBag, applewatch, bagImg, bedromImg, earpod, makeupkit, menshoe, monitor, pantsImg1, plentyshoe, pots, shirt, smartwatch, tops, womentops 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box className="carousel" h={['500px', '550px', '600px']}>
      {images.map((image, index) => (
        <div
          className={`carousel-image ${index === currentIndex ? 'active' : (index === (currentIndex - 1 + images.length) % images.length ? 'previous' : '')}`}
          key={index}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </Box>
  );
};

export default HeroCarousel;
