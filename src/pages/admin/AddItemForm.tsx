
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Spinner, // Import Spinner component from Chakra UI
} from "@chakra-ui/react";
import { getAuth } from "../../firebase";

interface Item {
  title: string;
  price: number;
  description: string;
  image: File | null;
  categories: string[];
  subcategories: string[];
  userId: string;
}

const AddItemForm: React.FC = () => {
  const { currentUser } = getAuth();
  const [item, setItem] = useState<Item>({
    title: "",
    price: 0,
    description: "",
    image: null,
    categories: [],
    subcategories: [],
    userId: currentUser?.uid || "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setItem(prevItem => ({ ...prevItem, image: file || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!item.image) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true); // Set loading to true before starting the upload

    try {
      const imageRef = ref(storage, `images/${item.image.name}`);
      await uploadBytes(imageRef, item.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Set the userId in the item object before adding it to the Firebase collection
      const newItem = {
        title: item.title,
        price: item.price,
        description: item.description,
        imageUrl,
        categories: item.categories,
        subcategories: item.subcategories,
        userId: currentUser?.uid || '',
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "items"), newItem);

      // Reset the item state after adding the item
      setItem({
        title: "",
        price: 0,
        description: "",
        image: null,
        categories: [],
        subcategories: [],
        userId: currentUser?.uid || "",
      });

      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("An error occurred while adding the item. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the upload is done
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="lg" className='texts'>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" value={item.title} onChange={handleChange} />
        </FormControl>
        <FormControl id="price" mb={4} isRequired>
          <FormLabel>Price</FormLabel>
          <NumberInput>
            <NumberInputField name="price" value={item.price} onChange={handleChange} />
          </NumberInput>
        </FormControl>
        <FormControl id="description" mb={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={item.description} onChange={handleChange} />
        </FormControl>
        <FormControl id="categories" mb={4} isRequired>
          <FormLabel>Categories</FormLabel>
          <Input type="text" name="categories" value={item.categories.join(',')} onChange={(e) => setItem(prevItem => ({ ...prevItem, categories: e.target.value.split(',') }))} />
        </FormControl>
        <FormControl id="subcategories" mb={4} isRequired>
          <FormLabel>Subcategories</FormLabel>
          <Input type="text" name="subcategories" value={item.subcategories.join(',')} onChange={(e) => setItem(prevItem => ({ ...prevItem, subcategories: e.target.value.split(',') }))} />
        </FormControl>
        <FormControl id="image" mb={4} isRequired>
          <FormLabel>Image</FormLabel>
          <Input type="file" onChange={handleImageChange} />
        </FormControl>
        {/* This input can be hidden if the userId is obtained from the authentication state */}
        <Input type="hidden" name="userId" value={item.userId} />
        <Button type="submit" colorScheme="blue" width="full" disabled={loading}>
          {loading ? <Spinner /> : "Add Item"}
        </Button>
      </form>
    </Box>
  );
};

export default AddItemForm;
