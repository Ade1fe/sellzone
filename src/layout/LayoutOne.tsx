import React, { ReactNode } from 'react';
import { Footer, Navbar } from '../pages';

interface LayoutOneProps {
  children: ReactNode;
}

const LayoutOne: React.FC<LayoutOneProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutOne;
