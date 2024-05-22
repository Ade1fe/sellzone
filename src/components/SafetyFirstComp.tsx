import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react'


const SafetyFirstComp = () => {
  return (
    <Box px={['10px', '15px', '20px']} mt='2rem'>
      <Text> Safety tips</Text>
      <UnorderedList className="">
        <ListItem>Avoid paying in advance, even for delivery </ListItem>
        <ListItem>Meet with the seller at a safe public place </ListItem>
        <ListItem> Inspect the item and ensure it's exactly what you want</ListItem>
        <ListItem> Make sure that the packed item is the one you've inspected</ListItem>
        <ListItem>Only pay if you're satisfied </ListItem>


      </UnorderedList>





    </Box>
  )
}

export default SafetyFirstComp
