
import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner, Button, Input, VStack, Image, Icon } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, onSnapshot, query, orderBy, updateDoc, where, getDocs } from 'firebase/firestore';
import { auth, db, onAuthStateChanged } from '../../firebase';
import { bagImg, blobimg } from '../../assets';
import { FaLocationArrow, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SafetyFirstComp } from '..';

interface LocationState {
  id?: string;
}

const DisplayComp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = (location.state as LocationState) || {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const handleStartChat = async () => {
    try {
      if (currentUserId && data && data.sellerInfo) {
        const chatQuery = query(collection(db, 'chats'), where('participants', 'array-contains', currentUserId));
        const existingChatSnap = await getDocs(chatQuery);
        const existingChat = existingChatSnap.docs.find((doc) => {
          const chatData = doc.data();
          return chatData.participants.includes(data.sellerInfo.uid) && chatData.itemId === id;
        });

        let chatDocId: string;
        if (existingChat) {
          chatDocId = existingChat.id;
          setChatId(existingChat.id);
        } else {
          const newChatRef = await addDoc(collection(db, 'chats'), {
            participants: [currentUserId, data.sellerInfo.uid],
            itemId: id,
            itemTitle: data.title,
            itemImageUrl: data.imageUrl,
            lastMessage: '',
            lastMessageTimestamp: new Date(),
          });
          chatDocId = newChatRef.id;
          setChatId(newChatRef.id);
        }

        // Check if the document ID message has already been sent
        const messageQuery = query(collection(db, 'chats', chatDocId, 'messages'), where('message', '==', `Document ID: ${id}`));
        const messageSnap = await getDocs(messageQuery);
        if (messageSnap.empty) {
          // Send the document ID as the first message
          const messageRef = collection(db, 'chats', chatDocId, 'messages');
          await addDoc(messageRef, {
            senderId: currentUserId,
            message: `Document ID: ${id}`,
            timestamp: new Date(),
          });
        }
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      setErrorMessage('An error occurred while starting the chat.');
    }
  };

  useEffect(() => {
    if (chatId) {
      const unsubscribeMessages = onSnapshot(
        query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc')),
        (querySnapshot) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    if (message.trim() === '' || !currentUserId || !chatId) return;

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

  const formatTimestamp = (timestamp: string | number | Date) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const options = { 
      month: 'short' as const, 
      day: '2-digit' as const, 
      year: 'numeric' as const, 
      hour: '2-digit' as const, 
      minute: '2-digit' as const, 
      hour12: true 
    };
    
    return date.toLocaleString('en-US', options);
  };
  
  

  return (
    <Box p={5} display={['block', 'block', 'block', 'flex']} className='texts'  gap={['30px']} justifyContent='space-evenly' alignItems='start'>
    <Box className="" w={['100%','100%','100%', '60%']}>
    <Text display='none'>Document ID: {id}</Text>
      <Box w='full' mb={4} h={['full','450px','500px', '550px', '600px']}>
        <Image src={data.imageUrl || bagImg} w="full" h={['full','450px','500px', '550px', '600px']} objectFit="cover" />
      </Box>
      <Box>
        <Text fontSize={['md', "lg"]} fontWeight="600" className='subtitle'>{data.title || 'Smart Wristwatch For iPhones And Android Phone'}</Text>
        {/* <Text fontSize="sm" color="gray.500">{data.postedDate || 'Posted 13 04 2024 12:3am'}</Text> */}
        {/* <Text fontSize={['md', "lg"]}>Description: {data.description || 'This is a placeholder description for the product.'}</Text> */}
        <Text fontSize="sm" color="gray.500">Posted:  {formatTimestamp(data.timestamp.toDate()) || 'Posted 13 04 2024 12:3am'}</Text>
       <Text
    fontSize={["md", 'lg']}
    mb='0.5rem'
    style={{ whiteSpace: 'pre-wrap' }}
    dangerouslySetInnerHTML={{ __html: `Description: ${data.description.replace(/\.(?=\s|$)/g, '.<br>')}` }}
  />
        <Text fontSize={['md', "lg"]}>Price: # {data.price || '$99.99'}</Text>
        <Text fontSize={['md', "lg"]} display='none'>Seller ID: {data.userId || 'userId'}</Text>
      </Box>
    </Box>
   <Box mt={4} p={3}  w={['100%','100%','100%', '30%']} className="" shadow='md'>
   <Box >
        <Text fontSize="lg" fontWeight="bold">Seller's Information</Text>
        {data.sellerInfo ? (
          <Box   px='4' py='5'  display='flex' flexDir='column' zIndex='2' gap='3' pos='relative'>
            <Image src={blobimg} pos='absolute' top='0' right='0' zIndex='0' w='100px' h='100%' />
            <Text zIndex='3' fontSize={["lg", 'x-large']} fontWeight="600" mt={2} className='subtitle'> <Text as='span' fontSize='sm' color='gray.400'> posted by</Text> {data.sellerInfo.name || 'John Doe'}</Text>
            <Text zIndex='3' fontSize={["md", 'lg']}> {data.sellerInfo.businessName || 'No Business Name'}</Text>
            <Text zIndex='3' display='none'>Business Type: {data.sellerInfo.businessType || 'No Business Type'}</Text>
            <Text zIndex='3' display='flex' alignItems='center' gap='2' fontSize={["md", 'lg']}><Icon as={MdEmail} /> {data.sellerInfo.email || 'john.doe@example.com'}</Text>
            <Text zIndex='3' display='flex' alignItems='center' gap='2' fontSize={["md", 'lg']}> <Icon as={FaWhatsapp} /> {data.sellerInfo.phoneNumber || 'No PhoneNumber'}</Text>
            <Text zIndex='3' display='flex' alignItems='center' gap='2' fontSize={["md", 'lg']}> <Icon as={FaLocationArrow} /> {data.sellerInfo.houseAddress || 'No House Address'}</Text>
            <Button bg='green.800' _hover={{bg: "green.600"}} cursor='pointer' color='whitesmoke' fontSize={['md', 'lg']} zIndex='3' mt={4} onClick={handleStartChat}>
              {chatId ? 'Chat Started' : 'Start Chat'}
            </Button>
          </Box>
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
            <Button bg='green.800' _hover={{bg: "green.600"}} cursor='pointer' ml={2} onClick={handleSendMessage} disabled={!currentUserId}>
              Send
            </Button>
          </Box>
        </Box>
      )}
         <SafetyFirstComp />
   </Box>

    </Box>
  );
};

export default DisplayComp

















