

// import React, { useState, useEffect } from 'react';
// import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Icon, useDisclosure } from '@chakra-ui/react';
// import { RiMenuLine } from 'react-icons/ri';
// import { db } from '../../firebase'; // Adjust the path as necessary
// import { collection, getDocs } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// interface CardProps {
//   id?: string;
//   image?: string;
//   label?: string;
// }

// const Sidebarcomp: React.FC<CardProps> = ({ id,  label }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [categories, setCategories] = useState<string[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const querySnapshot = await getDocs(collection(db, 'items'));
//       const categorySet = new Set<string>();

//       querySnapshot.forEach(doc => {
//         const data = doc.data();

//         if (data.categories && Array.isArray(data.categories)) {
//           data.categories.forEach((category: string) => categorySet.add(category.toLowerCase()));
//         } else {
//           categorySet.add('uncategorized');
//         }

//         if (data.subcategories && Array.isArray(data.subcategories)) {
//           data.subcategories.forEach((subCategory: string) => categorySet.add(subCategory.toLowerCase()));
//         } else {
//           categorySet.add('uncategorized');
//         }
//       });

//       setCategories(Array.from(categorySet));
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryClick = () => {
//     navigate('/listofitem', { state: { id, categories: label } });
//   };

//   return (
//     <>
//       <Button bg='transparent' onClick={onOpen}>
//         <Icon as={RiMenuLine} boxSize={[6, 7, 8]} />
//       </Button>
//       <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerHeader borderBottomWidth='1px'>Categories</DrawerHeader>
//           <DrawerBody>
//             <div>
//               <strong>Categories and Subcategories</strong>
//               <ul>
//                 {categories.map((category, index) => (
//                   <li key={index} onClick={() => handleCategoryClick()} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// };

// export default Sidebarcomp;













































import React, { useState, useEffect } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Icon, useDisclosure } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { db } from '../../firebase'; // Adjust the path as necessary
import { collection, getDocs, query, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Sidebarcomp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const itemsCollection = collection(db, 'items');
    let q = query(itemsCollection, limit(10)); // Limit to 10 documents per fetch

    if (lastVisible) {
      q = query(itemsCollection, startAfter(lastVisible), limit(10));
    }

    try {
      const querySnapshot = await getDocs(q);
      const categorySet = new Set<string>();

      querySnapshot.forEach(doc => {
        const data = doc.data();
        
        if (Array.isArray(data.categories)) {
          data.categories.forEach((category: string) => categorySet.add(category.toLowerCase()));
        } else {
          categorySet.add('uncategorized');
        }

        if (Array.isArray(data.subcategories)) {
          data.subcategories.forEach((subCategory: string) => categorySet.add(subCategory.toLowerCase()));
        } else {
          categorySet.add('uncategorized');
        }
      });

      setCategories(prevCategories => [...new Set([...prevCategories, ...Array.from(categorySet)])]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate('/listofitems', { state: { category } });
  };

  return (
    <>
      <Button bg='transparent' onClick={onOpen}>
        <Icon as={RiMenuLine} boxSize={[6, 7, 8]} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Categories</DrawerHeader>
          <DrawerBody>
            <div>
              <strong>Categories and Subcategories</strong>
              <ul>
                {categories.map((category, index) => (
                  <li key={index} onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
                    {category}
                  </li>
                ))}
              </ul>
              {loading && <p>Loading more...</p>}
              {!loading && <Button onClick={fetchCategories}>Load More</Button>}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebarcomp;
