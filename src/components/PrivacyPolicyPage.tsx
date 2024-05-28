
import { Box, Heading, Text } from '@chakra-ui/react';
import LayoutOne from '../layout/LayoutOne';

const PrivacyPolicyPage = () => {
  return (
    <LayoutOne>
        <Box maxW="1400px" mx="auto" mt="6" p="6" borderWidth="1px" borderRadius="lg">
      <Heading as="h1" size="xl" mb="4">Privacy Policy</Heading>
      
      <Text mb="4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </Text>


      <Heading as="h2" size="lg" mb="2">Information We Collect</Heading>
      <Text mb="4">
        We may collect personal information such as your name, email address, mailing address, phone number, and payment information when you interact with our website.
      </Text>

      <Heading as="h2" size="lg" mb="2">How We Use Your Information</Heading>
      <Text mb="4">
        We use the information we collect to provide and improve our services, process transactions, communicate with you, and customize your experience on our website.
      </Text>

      <Heading as="h2" size="lg" mb="2">Information Sharing and Disclosure</Heading>
      <Text mb="4">
        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to fulfill legal obligations.
      </Text>

      <Heading as="h2" size="lg" mb="2">Cookies</Heading>
      <Text mb="4">
        We use cookies and similar tracking technologies to analyze trends, administer the website, track users' movements around the site, and gather demographic information. You can control cookies through your browser settings.
      </Text>

      <Heading as="h2" size="lg" mb="2">Data Retention</Heading>
      <Text mb="4">
        We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations. We will securely delete or anonymize your personal information once it is no longer needed.
      </Text>

      <Heading as="h2" size="lg" mb="2">Third-Party Links</Heading>
      <Text mb="4">
        Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third-party sites.
      </Text>

      <Heading as="h2" size="lg" mb="2">Children's Privacy</Heading>
      <Text mb="4">
        Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
      </Text>

      <Heading as="h2" size="lg" mb="2">Changes to This Privacy Policy</Heading>
      <Text mb="4">
        We reserve the right to update or change our Privacy Policy at any time. Any changes will be effective immediately upon posting on this page.
      </Text>

      <Heading as="h2" size="lg" mb="2">Contact Us</Heading>
      <Text mb="4">
        If you have any questions or concerns about our Privacy Policy, please contact us at [supportsellzone@gmail.com].
      </Text>

      <Text fontSize="sm" fontStyle="italic" textAlign="center" mt="6">Last updated: [May-13-2024]</Text>
    </Box>
    </LayoutOne>
  );
}

export default PrivacyPolicyPage;
