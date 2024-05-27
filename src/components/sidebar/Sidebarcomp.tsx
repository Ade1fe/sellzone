
import React, { useState, useEffect } from 'react';
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, List, ListItem, useDisclosure } from '@chakra-ui/react';
import { RiMenuLine, RiArrowRightSLine } from 'react-icons/ri'; // Importing icons
import { db } from '../../firebase'; // Adjust the path as necessary
import { collection, getDocs, query, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import NavbarSearch from '../NavbarSearch';
import { GiBookmarklet } from 'react-icons/gi';

interface CategoryItemCardProps {
  id: string;
  label: string;
}

const Sidebarcomp: React.FC<CategoryItemCardProps> = ({
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const itemsCollection = collection(db, 'items');
    let q = query(itemsCollection, limit(10)); 

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
    console.log("category:", category);
    navigate('/listofitem', { state: { id, categories: category } });
  };

  return (
    <>
      <Button bg='transparent' onClick={onOpen} p='0' mr='3'>
        <Icon as={RiMenuLine} boxSize={[8,9,10]} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size='lg'>

        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Categories</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Box>
              <List spacing={3}>
                {categories.map((category, index) => (
                  <ListItem key={index} onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
                    <Icon as={RiArrowRightSLine} mr={2} /> {category}
                  </ListItem>
                ))}
              </List>
            </Box>


         
        <Box w='full' mt='2rem' display={['block', 'block', 'none']}  bg='white'>
          <Box w={['100%']} className="">
            <NavbarSearch />
          </Box>
          <Box className="" mt='8'>
            <Link to='/bookmarked' className=""> <Icon as={GiBookmarklet} boxSize={[6,7,8]}  /> </Link>
          </Box>
        </Box>
    
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebarcomp;
