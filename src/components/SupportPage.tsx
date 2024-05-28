
import { Box, Heading, Text, Divider, Link, UnorderedList, ListItem } from '@chakra-ui/react';
import LayoutOne from '../layout/LayoutOne';

const SupportPage = () => {
  return (
   <LayoutOne >
     <Box maxW="1300px" mx="auto" mt="6" p="6" borderWidth="1px" borderRadius="lg">
      <Heading as="h1" size="xl" mb="4">Support</Heading>
      
      <Box mb="4">
        <Heading as="h2" size="lg" mb="2">Contact Us</Heading>
        <Text>If you need assistance or have any questions, please feel free to contact our customer support team:</Text>
        <UnorderedList mt="2" ml="4">
          <ListItem>Email: <Link href="mailto:addypearl09@gmail.com">supportsellzone@gmail.com</Link></ListItem>
          <ListItem>Phone: <Link href="tel:+234-902-438-8013">1-800-123-4567</Link></ListItem>
        </UnorderedList>
      </Box>
      
      <Divider mb="4" />
      
      <Box mb="4">
        <Heading as="h2" size="lg" mb="2">FAQ</Heading>
        <Text>Check out our <Link href="/faq">FAQ page</Link> for answers to common questions.</Text>
      </Box>

      <Divider mb="4" />

      <Box mb="4">
        <Heading as="h2" size="lg" mb="2">User Guides</Heading>
        <Text>Explore our user guides for step-by-step instructions and helpful tips:</Text>
        <UnorderedList mt="2" ml="4">
          <ListItem><Link href="/user-guide/getting-started">Getting Started</Link></ListItem>
          <ListItem><Link href="/user-guide/payment">Payment Methods</Link></ListItem>
          <ListItem><Link href="/user-guide/shipping">Shipping Information</Link></ListItem>
          <ListItem><Link href="/user-guide/returns">Returns & Exchanges</Link></ListItem>
        </UnorderedList>
      </Box>

      <Divider mb="4" />

      <Box mb="4">
        <Heading as="h2" size="lg" mb="2">Community Forums</Heading>
        <Text>Join our community forums to connect with other users, share experiences, and get advice:</Text>
        <Link href="/community-forums" mt="2">Visit Forums</Link>
      </Box>
    </Box>
   </LayoutOne>
  );
}

export default SupportPage;
