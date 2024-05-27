import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase';
import { ListOfItemCard, SecondSection } from '..';
import LayoutOne from '../../layout/LayoutOne';
import { Box, Button, Image, Text, CircularProgress } from '@chakra-ui/react'; // Assuming CircularProgress is available from Chakra UI
import { notfound } from '../../assets';

interface Item {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  categories: string[];
  subcategories: string[];
  userId: string;
  sellerName: string;
}

interface LocationState {
  categories?: string;
  subcategories?: string;
}

const ListOfItems = () => {
  const location = useLocation();
  const { categories, subcategories } = (location.state as LocationState) || {};
  const [items, setItems] = useState<Item[]>([]);
  const [noItemsAvailable, setNoItemsAvailable] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, 'items');
        let q;
        if (categories) {
          const categoriesArray = categories.split(',').map((category) => category.trim());
          q = query(itemsCollection, where('categories', 'array-contains-any', categoriesArray));
        } else if (subcategories) {
          const subcategoriesArray = subcategories.split(',').map((subcategory) => subcategory.trim());
          q = query(itemsCollection, where('subcategories', 'array-contains-any', subcategoriesArray));
        } else {
          q = itemsCollection;
        }

        const querySnapshot = await getDocs(q);
        const fetchedItems: Item[] = await Promise.all(
          querySnapshot.docs.map(async (doc: QueryDocumentSnapshot<DocumentData>) => {
            const itemData = doc.data();
            const userId = itemData.userId; // Get the userId from the item data

            if (userId) {
              // Fetch the user data from the "users" collection based on the userId
              const userQuerySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', userId)));
              const userDocs = userQuerySnapshot.docs;
              console.log(" ",userDocs);
              if (userDocs.length > 0) {
                const userData = userDocs[0].data();
                const sellerName = userData.name || '';
                const sellerbusinessType = userData.businessType || '';
                const sellerbusinessName = userData.businessName || '';
                const selleremail =userData.email || "";
                console.log(" ",sellerName,sellerbusinessType,sellerbusinessName,selleremail);
                
                return {
                  id: doc.id,
                  imageUrl: itemData.imageUrl,
                  title: itemData.title,
                  price: itemData.price,
                  categories: itemData.categories || [],
                  subcategories: itemData.subcategories || [],
                  userId: itemData.userId,
                  sellerName,
                };
              }
            }

            // If seller information is not found, return the item data with an empty sellerName
            return {
              id: doc.id,
              imageUrl: itemData.imageUrl,
              title: itemData.title,
              price: itemData.price,
              categories: itemData.categories || [],
              subcategories: itemData.subcategories || [],
              userId: itemData.userId,
              sellerName: '',
            };
          })
        );

        if (fetchedItems.length === 0) {
          setNoItemsAvailable(true);
        } else {
          setItems(fetchedItems);
          setNoItemsAvailable(false);
        }
        setLoading(false); // Set loading to false after fetching items
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchItems();
  }, [categories, subcategories]);

  return (
    <LayoutOne>
      <Box display='none'>Item Details</Box>
      {loading ? ( // Check loading state
        <Box mt='2rem' textAlign='center'>
          <CircularProgress isIndeterminate color="green.300" /> {/* Show a loading indicator */}
          <Text className='title' fontSize={['lg', 'x-large', 'xx-large']} textAlign='center' mt='1rem'>Loading...</Text>
        </Box>
      ) : (
        <>
          {noItemsAvailable ? (
            <Box mt='2rem' textAlign='center'>
              <Image src={notfound} w={['250px', '270px', '300px', '400px']} mx='auto' />
              <Text className='title' fontSize={['lg', 'x-large', 'xx-large']} textAlign='center' mt='1rem'>Out of Stock "{subcategories || categories}"</Text>
              <Link to="/homepage">  <Button bg='green.800' _hover={{bg: "green.600"}} cursor='pointer' color='whitesmoke' textTransform='uppercase' mt='2rem' className='subtitle' w='200px' px='3' fontSize={['md', 'lg']} mx='auto' textAlign={'center'}>go to homepage</Button></Link>
            </Box>
          ) : (
            <>
              <Box style={{ display: 'flex', flexWrap: 'wrap' }} mt='5rem'>
                {items.map((item) => (
                  <div key={item.id} >
                    <ListOfItemCard
                      id={item.id}
                      image={item.imageUrl}
                      title={item.title}
                      price={item.price.toString()}
                      category={item.categories.join(', ')}
                      subCategory={item.subcategories.join(', ')}
                      sellersID={item.userId}
                    />
                  </div>
                ))}
              </Box>
              <Box mt='10rem' className="section" >
                <Text fontSize={['lg', 'x-large']} textAlign='center' textTransform='capitalize' className='subtitle' fontWeight='800'>   related items </Text>
                  <SecondSection />
              </Box>
            </>
          )}
        </>
      )}
    </LayoutOne>
  );
};

export default ListOfItems;
