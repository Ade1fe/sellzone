import React, { useEffect, useState } from 'react';
import { Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Spinner, Image, Input, Button, useDisclosure, DrawerOverlay, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, IconButton } from '@chakra-ui/react';
import { collection, query, where,  deleteDoc, doc ,updateDoc, onSnapshot} from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the import path as necessary
import SellerChatsList from './SellerChatsList';
import { BiEdit, BiPlus } from 'react-icons/bi';
import { AddItemForm, Footer } from '..';
import { Link } from 'react-router-dom';


interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  categories: string | string[];
  subcategories: string | string[];
  imageUrl: string;
}

const SellerDashboard: React.FC<{ sellerId: string }> = ({ sellerId }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Item>>({});
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsRef = collection(db, 'items');
        const q = query(itemsRef, where('userId', '==', sellerId));
  
        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const itemsList: Item[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Item[];
          setItems(itemsList);
        });
  
        // Clean up subscription on component unmount
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, [sellerId]);

  

  const handleDelete = async (itemId: string) => {
    try {
      await deleteDoc(doc(db, 'items', itemId));
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItemId(item.id);
    setEditForm({
      title: item.title,
      price: item.price,
      description: item.description
    });
  };

  const handleSave = async (itemId: string) => {
    try {
      const itemDoc = doc(db, 'items', itemId);
      await updateDoc(itemDoc, {
        title: editForm.title,
        price: editForm.price,
        description: editForm.description
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, ...editForm } : item
        )
      );
      setEditingItemId(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const filteredItems = items.filter((item) => {
    const id = item.id?.toLowerCase() || '';
    const title = item.title?.toLowerCase() || '';
    const price = item.price.toString().toLowerCase();
    const description = item.description?.toLowerCase() || '';
    const categories = Array.isArray(item.categories) ? item.categories.join(' ').toLowerCase() : item.categories?.toLowerCase() || '';
    const subcategories = Array.isArray(item.subcategories) ? item.subcategories.join(' ').toLowerCase() : item.subcategories?.toLowerCase() || '';

    const query = searchQuery.toLowerCase();
    return (
      id.includes(query) ||
      title.includes(query) ||
      price.includes(query) ||
      description.includes(query) ||
      categories.includes(query) ||
      subcategories.includes(query)
    );
  });

  return (
    <Box className='texts'>
      <Box display='flex' w='full' justifyContent='space-evenly' alignItems='center' py='4' px='5'>
       <Link to="/homepage">
       <Text as='span' fontSize={['lg', 'x-large', 'xx-large']} textShadow='1px 1px green' className='title'>
          SellZone
        </Text>
       </Link>
        <Box w={['50%']}>
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Button leftIcon={<BiPlus />} colorScheme='teal' onClick={onOpen}>
          Add Item
        </Button>
      </Box>
      <Drawer isOpen={isOpen} placement='right' size='xl' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new Item
          </DrawerHeader>
          <DrawerBody>
            <AddItemForm />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box mt={6} mx='auto' maxWidth='1500px'>
        <SellerChatsList sellerId={sellerId} />
        <TableContainer mt='8rem' px='15px' overflowY='auto' maxHeight="calc(100vh - 200px)">
          <Text fontSize={['lg', 'x-large', 'xx-large']} mb='2rem' textAlign='center' className='subtitle'>
            Products by seller
          </Text>
          <Table variant='striped' colorScheme='green'>
            <TableCaption>Items by seller</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize={['sm', 'md']}>Title</Th>
                <Th isNumeric fontSize={['sm', 'md']}>Price</Th>
                <Th fontSize={['sm', 'md']}>Description</Th>
                <Th fontSize={['sm', 'md']}>Categories</Th>
                <Th fontSize={['sm', 'md']}>Subcategories</Th>
                <Th fontSize={['sm', 'md']}>Image</Th>
                <Th fontSize={['sm', 'md']}>Document Id</Th>
                <Th fontSize={['sm', 'md']}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    <Spinner />
                  </Td>
                </Tr>
              ) : (
                filteredItems.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      {editingItemId === item.id ? (
                        <Input
                          value={editForm.title || ''}
                          bg='white' shadow='md'
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                      ) : (
                        item.title
                      )}
                    </Td>
                    <Td isNumeric>
                      {editingItemId === item.id ? (
                        <Input
                          type="number"
                          value={editForm.price || ''}
                          bg='white' shadow='md'
                          onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        />
                      ) : (
                        item.price
                      )}
                    </Td>
                    <Td>
                      {editingItemId === item.id ? (
                        <Input
                          value={editForm.description || ''}
                          bg='white' shadow='md'
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        />
                      ) : (
                        item.description
                      )}
                    </Td>
                    <Td>{Array.isArray(item.categories) ? item.categories.join(', ') : item.categories}</Td>
                    <Td>{Array.isArray(item.subcategories) ? item.subcategories.join(', ') : item.subcategories}</Td>
                    <Td>
                      <Image src={item.imageUrl} alt={item.title} boxSize="50px" objectFit="cover" />
                    </Td>
                    <Td>{item.id}</Td>
                    <Td>
                      {editingItemId === item.id ? (
                        <Button colorScheme="blue" onClick={() => handleSave(item.id)}>
                          Save
                        </Button>
                      ) : (
                        <IconButton
                          icon={<BiEdit />}
                          aria-label="Edit"
                          onClick={() => handleEdit(item)}
                        />
                      )}
                      <Button colorScheme="red" onClick={() => handleDelete(item.id)} ml={2}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Box>
  );
};

export default SellerDashboard;
