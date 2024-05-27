import React from 'react';
import { Box, Flex, Text, Link, Stack, Divider, IconButton, useColorMode, useColorModeValue, SimpleGrid, Heading } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter, FaSun, FaMoon, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('green.800', 'gray.900');
  const color = useColorModeValue('white', 'gray.200');

  return (
    <Box bg={bg} color={color} py={10} mt='6rem'>
      <Flex direction="column" maxW='1400px' mx='auto' px={6}>
        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={8} mb={10}>
          <Box>
            <Heading as="h4" size="md" mb={4}>About Us</Heading>
            <Text>We are a company dedicated to providing the best services to our customers.</Text>
          </Box>
          <Box>
            <Heading as="h4" size="md" mb={4}>Quick Links</Heading>
            <Stack spacing={3}>
              <Link href="#">Home</Link>
              <Link href="#">About</Link>
              <Link href="#">Services</Link>
              <Link href="#">Contact</Link>
            </Stack>
          </Box>
          <Box>
            <Heading as="h4" size="md" mb={4}>Resources</Heading>
            <Stack spacing={3}>
              <Link href="#">Blog</Link>
              <Link href="#">FAQs</Link>
              <Link href="#">Support</Link>
              <Link href="#">Privacy Policy</Link>
            </Stack>
          </Box>
          <Box>
            <Heading as="h4" size="md" mb={4}>Contact Us</Heading>
            <Text>Email: contact@mycompany.com</Text>
            <Text>Phone: (123) 456-7890</Text>
          </Box>
          <Box>
            <Heading as="h4" size="md" mb={4}>Follow Us</Heading>
            <Box display='flex'  flexWrap='wrap'gap={4}>
              <IconButton
                as="a"
                href="https://facebook.com"
                aria-label="Facebook"
                icon={<FaFacebook />}
                size="2xl"
                variant="ghost"
                color={color}
              />
              <IconButton
                as="a"
                href="https://instagram.com"
                aria-label="Instagram"
                icon={<FaInstagram />}
                size="2xl"
                variant="ghost"
                color={color}
              />
              <IconButton
                as="a"
                href="https://twitter.com"
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="2xl"
                variant="ghost"
                color={color}
              />
              <IconButton
                as="a"
                href="https://linkedin.com"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                size="2xl"
                variant="ghost"
                color={color}
              />
              <IconButton
                as="a"
                href="https://github.com"
                aria-label="GitHub"
                icon={<FaGithub />}
                size="2xl"
                variant="ghost"
                color={color}
              />
            </Box>
          </Box>
        </SimpleGrid>
        <Divider my={6} borderColor={useColorModeValue('gray.300', 'gray.700')} />
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Text>&copy; {new Date().getFullYear()} My Company. All rights reserved.</Text>
          <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
            <IconButton
              aria-label="Toggle color mode"
              icon={useColorModeValue(<FaMoon />, <FaSun />)}
              onClick={toggleColorMode}
              size="2xl"
              variant="ghost"
              color={color}
            />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
