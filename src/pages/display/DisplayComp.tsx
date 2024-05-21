

import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner, Button, Input, VStack, Image } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, onSnapshot, query, orderBy, updateDoc, where, getDocs } from 'firebase/firestore';
import { auth, db, onAuthStateChanged } from '../../firebase';
import { bagImg } from '../../assets';

interface LocationState {
  id?: string;
}

const DisplayComp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = (location.state as LocationState) || {};
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        // Redirect to login if not authenticated (optional)
        // navigate('/login');
      }
    });
    return unsubscribeAuth;
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const itemDocRef = doc(db, 'items', id);
          const itemDocSnap = await getDoc(itemDocRef);
          if (itemDocSnap.exists()) {
            const itemData = itemDocSnap.data();
            const userDocRef = doc(db, 'users', itemData.userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setData({ ...itemData, sellerInfo: userData });
            } else {
              console.log('No such user document!');
            }
          } else {
            console.log('No such item document!');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setErrorMessage('An error occurred. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleChat = async () => {
      if (currentUserId && data && data.sellerInfo) {
        try {
          const chatQuery = query(collection(db, 'chats'), where('participants', 'array-contains', currentUserId));
          const existingChatSnap = await getDocs(chatQuery);
          const existingChat = existingChatSnap.docs.find((doc) => doc.data().participants.includes(data.sellerInfo.uid));
          if (existingChat) {
            setChatId(existingChat.id);
          } else {
            const newChatRef = await addDoc(collection(db, 'chats'), {
              participants: [currentUserId, data.sellerInfo.uid],
              lastMessage: '',
              lastMessageTimestamp: new Date(),
            });
            setChatId(newChatRef.id);
          }
        } catch (error) {
          console.error('Error creating or finding chat:', error);
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    };

    if (data && data.sellerInfo) {
      handleChat();
    }
  }, [currentUserId, data]);

  useEffect(() => {
    if (chatId) {
      const unsubscribeMessages = onSnapshot(
        query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc')),
        (querySnapshot) => {
          const newMessages: any[] = [];
          querySnapshot.forEach((doc) => {
            newMessages.push(doc.data());
          });
          setMessages(newMessages);
        },
        (error) => {
          console.error('Error fetching messages:', error);
          setErrorMessage('An error occurred while fetching messages.');
        }
      );

      return () => unsubscribeMessages();
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !chatId) return;

    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        senderId: currentUserId,
        message: message.trim(),
        timestamp: new Date(),
       
      });

      // Update the last message and timestamp in the chat document
      const chatDocRef = doc(db, 'chats', chatId);
      await updateDoc(chatDocRef, {
        lastMessage: message.trim(),
        lastMessageTimestamp: new Date(),
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('An error occurred while sending your message.');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return (
      <Box p={5}>
        <Text fontSize="lg" color="red.500">
          {errorMessage}
        </Text>
      </Box>
    );
  }

  if (!data) {
    return <Text>No data found</Text>;
  }

  return (
    <Box p={5}>
      <h2>Document ID: {id}</h2>
      <Box boxSize="60%" mb={4}>
        <Image src={data.imageUrl || bagImg} w="full" h="full" objectFit="cover" bg="red" />
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold">{data.title || 'Smart Wristwatch For iPhones And Android Phone'}</Text>
        <Text fontSize="sm" color="gray.500">{data.postedDate || 'Posted 13 04 2024 12:3am'}</Text>
        <Text mt={2}>Description: {data.description || 'This is a placeholder description for the product.'}</Text>
        <Text mt={2}>Price: {data.price || '$99.99'}</Text>
        <Text mt={2}>Price: {data.userId || 'userId'}</Text>
      </Box>
      <Box mt={4} p={3} shadow="md" borderWidth="1px" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold">Seller's Information</Text>
        {data.sellerInfo ? (
          <>
            <Text mt={2}>Name: {data.sellerInfo.name || 'John Doe'}</Text>
            <Text>Email: {data.sellerInfo.email || 'john.doe@example.com'}</Text>
            <Text>Business Name: {data.sellerInfo.businessName || 'No Business Name'}</Text>
            <Text>Business Type: {data.sellerInfo.businessType || 'No Business Type'}</Text>
            <Button mt={4} onClick={() => console.log('Chat logic already handled')}>
              {chatId ? 'Chat Started' : 'Start Chat'}
            </Button>
          </>
        ) : (
          <Text>No seller information available</Text>
        )}
      </Box>
      {chatId && (
        <Box>
          <VStack spacing={4} align="stretch">
          {messages.map((msg, index) => (
  <Box key={index} p={3} bg={msg.senderId === currentUserId ? 'gray.200' : 'blue.200'} borderRadius="md">
    <Text>{msg.text || msg.message}</Text>
    <Text fontSize="xs" color="gray.500">
      Sent by {msg.senderId === currentUserId ? "You" : (msg.senderId === data.sellerInfo.uid ? data.sellerInfo.name : "Unknown")}
    </Text>
  </Box>
))}

          </VStack>
          <Box mt={4} display="flex">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!currentUserId}
            />
            <Button ml={2} onClick={handleSendMessage} disabled={!currentUserId}>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DisplayComp;
