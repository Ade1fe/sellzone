import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust this path if needed

export const getOrCreateChatId = async (buyerId: string, sellerId: string) => {
  const chatsRef = collection(db, 'chats');
  const q = query(chatsRef, where('participants', 'array-contains-any', [buyerId, sellerId]));
  
  const querySnapshot = await getDocs(q);
  let chatId = null;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.participants.includes(buyerId) && data.participants.includes(sellerId)) {
      chatId = doc.id;
    }
  });

  if (!chatId) {
    const chatDocRef = await addDoc(chatsRef, {
      participants: [buyerId, sellerId],
      lastMessage: '',
      lastMessageTimestamp: new Date(),
    });
    chatId = chatDocRef.id;
  }

  return chatId;
};
