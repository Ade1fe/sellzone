
import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Spinner, Button, Input, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, onSnapshot, query, orderBy, updateDoc } from 'firebase/firestore';
import { auth, db, onAuthStateChanged } from '../../firebase';
import { bagImg } from '../../assets'; // Assuming you have this image in your assets folder

interface LocationState {
  id?: string;
}

const DisplayComp: React.FC = () => {
  const location = useLocation();
  const { id } = (location.state as LocationState) || {};
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>('currentUserId'); 
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [currentUserName, setCurrentUserName] = useState<string>(''); // Initialize with an empty string


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid); // Set currentUserId when user is logged in
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setCurrentUserName(userData.name || ''); // Set currentUserName from user document
          } else {
            console.log('No such user document!');
          }
        });
        return unsubscribeUser;
      } else {
        console.log('User is logged out');
      }
    });
    return unsubscribe;
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(db, 'items', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const itemData = docSnap.data();
          const userDocRef = doc(db, 'users', itemData.userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.uid === itemData.userId) {
              setData({ ...itemData, sellerInfo: userData });
            } else {
              console.log('User ID does not match UID in user document!');
            }
          } else {
            console.log('No such user document!');
          }
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStartChat = async () => {
    if (data && data.sellerInfo) {
      try {
        const chatDocRef = await addDoc(collection(db, 'chats'), {
          participants: [currentUserId, data.sellerInfo.uid],
          lastMessage: '',
          lastMessageTimestamp: new Date(),
        });
        setChatId(chatDocRef.id);
        console.log('Chat started with seller:', data.sellerInfo.name, 'Chat ID:', chatDocRef.id);
      } catch (error) {
        console.error('Error starting chat:', error);
      }
    } else {
      console.log('No seller information available to start chat.');
    }
  };

  useEffect(() => {
    if (chatId) {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs: any[] = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMessages(msgs);
      });

      return () => unsubscribe();
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (message.trim() !== '' && chatId) {
      try {
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messagesRef, {
          senderId: currentUserId,
          message: message.trim(),
          timestamp: new Date(),
        });

        // Update the last message and last message timestamp in the chat document
        const chatDocRef = doc(db, 'chats', chatId);
        await updateDoc(chatDocRef, {
          lastMessage: message.trim(),
          lastMessageTimestamp: new Date(),
        });

        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <Text>No data found</Text>;
  }

  return (
    <Box p={5}>
      <h2>Document ID: {id}</h2>
      <Box mt={4}>
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
              <Button mt={4} onClick={handleStartChat}>Start Chat</Button>
            </>
          ) : (
            <Text>No seller information available</Text>
          )}
        </Box>
        {chatId && (

        <Box mt={4}>
  <VStack spacing={4} align="stretch">
    {messages.map((msg, index) => (
      <Box key={index} p={3} bg="gray.100" borderRadius="md">
      <Text>{msg.text || msg.message}</Text>
      <Text fontSize="xs" color="gray.500">
  Sent by {msg.senderId === currentUserId ? "You" : data.sellerInfo.name}
</Text>

    </Box>
  ))}
</VStack>
<Box mt={4} display="flex">
  <Input
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Type your message..."
  />
  <Button ml={2} onClick={handleSendMessage}>Send</Button>
</Box>
</Box>

      )}
    </Box>
  </Box>
);
};

export default DisplayComp;

