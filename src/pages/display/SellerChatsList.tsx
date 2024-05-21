
import React, { useEffect, useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { collection, query, where, onSnapshot, } from 'firebase/firestore';
import { db } from '../../firebase';
import SellerChatComponent from './SellerChatComponent';

const SellerChatsList: React.FC<{ sellerId: string }> = ({ sellerId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', sellerId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, [sellerId]);

  return (
    <Box display="flex">
      <Box w="30%" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text fontSize="xl" fontWeight="bold" mb={4}>Chats</Text>
        {chats.map((chat) => (
          <Box key={chat.id} mb={2}>
            <Button w="100%" onClick={() => setSelectedChatId(chat.id)}>
              Chat with {chat.participants.find((id: string) => id !== sellerId)}
            </Button>
          </Box>
        ))}
      </Box>
      <Box w="70%" p={4}>
        {selectedChatId ? (
          <SellerChatComponent chatId={selectedChatId} userId={sellerId} />
        ) : (
          <Text>Select a chat to view messages</Text>
        )}
      </Box>
    </Box>
  );
};

export default SellerChatsList;
