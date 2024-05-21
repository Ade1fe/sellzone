

import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import { collection, addDoc, onSnapshot, query, orderBy, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface SellerChatComponentProps {
  chatId: string;
  userId: string;
}

const SellerChatComponent: React.FC<SellerChatComponentProps> = ({ chatId, userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [sellerName, setSellerName] = useState<string>('');

  useEffect(() => {
    const fetchSellerName = async () => {
      if (chatId) {
        const chatRef = doc(db, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);
        if (chatDoc.exists()) {
          const sellerId = chatDoc.data()?.participants.find((participantId: string) => participantId !== userId);
          if (sellerId) {
            const sellerDocRef = doc(db, 'users', sellerId);
            const sellerDoc = await getDoc(sellerDocRef);
            if (sellerDoc.exists()) {
              setSellerName(sellerDoc.data()?.name || '');
            } else {
              console.log('No such seller document!');
            }
          } else {
            console.log('Seller ID not found in participants list!');
          }
        } else {
          console.log('No such chat document!');
        }
      }
    };
    fetchSellerName();
  }, [chatId, userId]);

  useEffect(() => {
    if (chatId) {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });

      return () => unsubscribe();
    }
  }, [chatId]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        text: message,
        senderId: userId,
        timestamp: new Date(),
      });
      setMessage('');

      // If the seller sends a message, update the last message and its timestamp in the chat document
      const chatRef = doc(db, 'chats', chatId);
      await setDoc(chatRef, {
        lastMessage: message,
        lastMessageTimestamp: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box mb={4} overflowY="auto" maxHeight="400px">
        {messages.map((msg) => (
          <Box key={msg.id} mb={2} p={2} bg={msg.senderId === userId ? 'blue.100' : 'gray.100'} borderRadius="md">
            <Text>{msg.text || msg.message}</Text>
            <Text fontSize="xs" color="gray.500">Sent by {msg.senderId === userId ? 'You' : sellerName}</Text>
          </Box>
        ))}
      </Box>
      <Box display="flex">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button ml={2} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SellerChatComponent;
