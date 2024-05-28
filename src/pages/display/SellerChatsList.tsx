

import React, { useEffect, useState } from 'react';
import { Box, Text, Button, IconButton } from '@chakra-ui/react';
import { collection, query, where, onSnapshot, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import SellerChatComponent from './SellerChatComponent';
import { BiTrash } from 'react-icons/bi';

interface Chat {
  id: string;
  participants: string[];
}

interface UserNames {
  [key: string]: string;
}

interface User {
  uid: string;
  name: string;
}

const SellerChatsList: React.FC<{ sellerId: string }> = ({ sellerId }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [userNames, setUserNames] = useState<UserNames>({});

  useEffect(() => {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', sellerId));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const chatsData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Chat, 'id'>;
        return { id: doc.id, ...data };
      });
      setChats(chatsData);

      const fetchUserNames = async () => {
        const uniqueUserIds = [...new Set(chatsData.flatMap(chat => chat.participants))];
        const names = await Promise.all(
          uniqueUserIds.map(async uid => {
            if (uid !== sellerId && !userNames[uid]) {
              const userDoc = await getDoc(doc(db, 'users', uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                return { uid, name: userData.name };
              }
            }
            return null;
          })
        );

        const validNames: User[] = names.filter((name): name is User => name !== null);

        setUserNames(prev => ({
          ...prev,
          ...Object.fromEntries(validNames.map(({ uid, name }) => [uid, name])),
        }));
      };

      fetchUserNames();
    });

    return () => unsubscribe();
  }, [sellerId, userNames]);

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteDoc(doc(db, 'chats', chatId));
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (selectedChatId === chatId) {
        setSelectedChatId(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <Box display={['block','block', "flex"]} shadow='base'>
      <Box w={['full','full', "40%"]} p={4}  overflowY='auto'  borderRadius="lg" overflow="hidden">
        <Text fontSize="xl"  noOfLines={1}  fontWeight="bold" mb={4}>Chats</Text>
        {chats.map((chat) => {
          const otherParticipantId = chat.participants.find(id => id !== sellerId);
          const otherParticipantName = otherParticipantId ? userNames[otherParticipantId] : 'Loading...';

          return (
            <Box overflowX='auto'  shadow='base' key={chat.id} mb={2} display="flex" justifyContent="space-between" alignItems="center">
              <Button w="100%" bg='white' onClick={() => setSelectedChatId(chat.id)}>
                Chat with {otherParticipantName}
              </Button>
              <IconButton
                aria-label="Delete chat"
                bg='red.700'
                color='white'
                icon={<BiTrash />}
                onClick={() => handleDeleteChat(chat.id)}
              />
            </Box>
          );
        })}
      </Box>
      <Box w={['full','full', "60%"]} p={4} minH='500px' shadow='base' overflowY='auto'  bg='white'>
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
