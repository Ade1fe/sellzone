
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import LayoutOne from '../layout/LayoutOne';

const FaqComp = () => {
  return (
   <LayoutOne >
     <Box maxW='1400px' px='15px' mx='auto'>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How long will it take to receive my order?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            The delivery time depends on your location and the shipping method chosen. Generally, orders are processed within 1-3 business days, and standard shipping takes 5-7 business days.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                What is your return policy?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            We offer a 30-day return policy for most items. If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Do you ship internationally?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes, we offer international shipping to select countries. Shipping costs and delivery times vary depending on the destination.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How can I track my order?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Once your order has shipped, you will receive a tracking number via email. You can use this tracking number to track your order on our website or the carrier's website.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How can I contact customer support?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            You can contact our customer support team by emailing support@example.com or by calling our toll-free number at 1-800-123-4567. Our customer support representatives are available Monday to Friday, 9:00 AM to 5:00 PM (EST).
          </AccordionPanel>
        </AccordionItem>


        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Can I cancel or modify my order after it's been placed?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Unfortunately, we're unable to cancel or modify orders once they have been placed. However, you may be able to return the item for a refund or exchange once you receive it.
          </AccordionPanel>
        </AccordionItem>


        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Are your products cruelty-free?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes, we are committed to selling cruelty-free products. We do not test our products on animals, and we ensure that our suppliers adhere to ethical standards.
          </AccordionPanel>
        </AccordionItem>


        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Do you offer gift wrapping services?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Yes, we offer gift wrapping services for an additional fee. During checkout, you'll have the option to select gift wrapping and include a personalized message for the recipient.
          </AccordionPanel>
        </AccordionItem>

      </Accordion>
    </Box>
   </LayoutOne>
  );
}

export default FaqComp;
