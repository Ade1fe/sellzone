// AddItemForm.tsx
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
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
} from "@chakra-ui/react";

interface Item {
  name: string;
  title: string;
  price: number;
  description: string;
  image: File | null;
}

const AddItemForm: React.FC = () => {
  const [item, setItem] = useState<Item>({
    name: "",
    title: "",
    price: 0,
    description: "",
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setItem({ ...item, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clcike");
    if (!item.image) {
      alert("Please upload an image.");
      return;
    }

    const imageRef = ref(storage, `images/${item.image.name}`);
    await uploadBytes(imageRef, item.image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "items"), {
      name: item.name,
      title: item.title,
      price: item.price,
      description: item.description,
      imageUrl,
    });

    setItem({
      name: "",
      title: "",
      price: 0,
      description: "",
      image: null,
    });

    alert("Item added successfully!");
  };

  return (
    <Box maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={item.name} onChange={handleChange} />
        </FormControl>
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
        <FormControl id="image" mb={4} isRequired>
          <FormLabel>Image</FormLabel>
          <Input type="file" onChange={handleImageChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default AddItemForm;