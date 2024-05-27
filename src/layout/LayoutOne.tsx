import React, { ReactNode } from 'react';
import { Footer, Navbar } from '../pages';
import { Box } from '@chakra-ui/react';

interface LayoutOneProps {
  children: ReactNode;
}

const LayoutOne: React.FC<LayoutOneProps> = ({ children }) => {
  return (
    <Box >
      <Navbar />
      <Box pt={['3rem','6rem', '8rem']} className="content">{children}</Box>
      <Footer />
    </Box>
  );
};

export default LayoutOne;
