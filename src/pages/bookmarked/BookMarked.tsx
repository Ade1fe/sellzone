import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ListOfItemCard } from '..';

const BookMarked: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookmarkedItems, setBookmarkedItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'bookmarks'));
      const items = querySnapshot.docs.map(doc => doc.data());
      setBookmarkedItems(items);
    };
    fetchBookmarkedItems();
  }, []);

  return (
    <div>
      {bookmarkedItems.map(item => (
        <ListOfItemCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default BookMarked;
