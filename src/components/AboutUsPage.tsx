import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import LayoutOne from '../layout/LayoutOne';

const AboutUsPage = () => {
  return (
  <LayoutOne >
      <Box maxW="1400px" mx="auto" mt="6" p="6" borderWidth="1px" borderRadius="lg">
      <Heading as="h1" size="xl" mb="4">About SellZone</Heading>
      
      <Image src="https://www.blogtyrant.com/wp-content/uploads/2019/12/best-contact-us-pages-2.png" alt="SellZone Logo" mx="auto" mb="4" />

      <Text mb="4">
        SellZone is your one-stop destination for all your shopping needs. We offer a wide range of products from top brands at competitive prices. Our mission is to provide a seamless and enjoyable shopping experience for our customers.
      </Text>

      <Heading as="h2" size="lg" mb="2">Our Story</Heading>
      <Text mb="4">
        Founded in [April 2023], SellZone has grown from a small startup to a leading eCommerce platform with thousands of satisfied customers worldwide. Our journey began with a vision to revolutionize online shopping by offering quality products and exceptional customer service.
      </Text>

      <Heading as="h2" size="lg" mb="2">Our Team</Heading>
      <Text mb="4">
        At SellZone, we have a dedicated team of professionals who are passionate about delivering the best possible shopping experience. From our customer support representatives to our warehouse staff, every member of our team plays a vital role in our success.
      </Text>

      <Heading as="h2" size="lg" mb="2">Our Values</Heading>
      <Text mb="4">
        Integrity, transparency, and customer satisfaction are the core values that drive everything we do at SellZone. We strive to uphold the highest ethical standards in all our interactions and transactions.
      </Text>

      <Heading as="h2" size="lg" mb="2">Contact Us</Heading>
      <Text mb="4">
        If you have any questions or feedback, please don't hesitate to contact us at [contact@example.com].
      </Text>
    </Box>
  </LayoutOne>
  );
}

export default AboutUsPage;
