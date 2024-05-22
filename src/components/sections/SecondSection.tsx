import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import LatestUpdateCard from '../cards/LatestUpdateCard';
import ReusableCarousel from '../carousels/ResuableCarousel';

interface Item {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timestamp: any; // Replace with appropriate type for your timestamp
}

const SecondSection = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const itemsCollection = collection(db, 'items');
        const q = query(itemsCollection, orderBy('timestamp', 'desc'), limit(7));
        const querySnapshot = await getDocs(q);
        const latestItems: Item[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
          title: doc.data().title,
          price: doc.data().price,
          timestamp: doc.data().timestamp,
        }));
        setItems(latestItems);
      } catch (error) {
        console.error('Error fetching latest items: ', error);
      }
    };

    fetchLatestItems();
  }, []);

  return (
    <Box>
      <ReusableCarousel
        title="Latest Updates"
        items={items.map(item => (
          <LatestUpdateCard
            key={item.id}
            id={item.id}
            image={item.imageUrl}
            title={item.title}
            price={item.price.toString()}
          />
        ))}
      />
    </Box>
  );
};

export default SecondSection;
