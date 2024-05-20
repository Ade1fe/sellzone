import { Box, Text, IconButton } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface CarouselProps {
  title?: string;
  items: React.ReactNode[];
  marginTop?: number;
}

const ReusableCarousel: React.FC<CarouselProps> = ({ title, items,marginTop }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Box mt={marginTop} p={5}>
      <Text fontSize="2xl" mb={5} className='title' textShadow='1px 0.5px brown'>
        {title}
      </Text>

      <Box position="relative" w='100%'>
        <IconButton
          aria-label="Scroll Left"
          icon={<BiChevronLeft />}
          position="absolute"
          left={1}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={() => scroll(-200)}
          bg="white"
          boxShadow="md"
          fontSize="4xl" 
        />
        <Box
          display='flex'
          justifyContent="start"
          w='100%'
          overflowX='auto'
          p={2}
          ref={scrollRef}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none', 
            'scrollbar-width': 'none', 
          }}
        >
          {items}
        </Box>
        <IconButton
          aria-label="Scroll Right"
          icon={<BiChevronRight />}
          position="absolute"
          right={1}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={() => scroll(200)}
          bg="white"
          boxShadow="md"
          fontSize="4xl" 
        />
      </Box>
    </Box>
  );
};

export default ReusableCarousel;
