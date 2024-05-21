import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import SellerChatsList from './SellerChatsList';

const SellerDashboard: React.FC<{ sellerId: string }> = ({ sellerId }) => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">Seller Dashboard</Text>
      <Box mt={4}>
        <SellerChatsList sellerId={sellerId} />
      </Box>
    </Box>
  );
};

export default SellerDashboard;
