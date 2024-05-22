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
      <div className="content">{children}</div>
      <Footer />
    </Box>
  );
};

export default LayoutOne;
