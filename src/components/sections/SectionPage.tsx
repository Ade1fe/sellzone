
import { Box } from '@chakra-ui/react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'

const SectionPage = () => {
  return (
    <Box mt='8rem' maxW='1500px' mx='auto'>
     <FirstSection />
      <SecondSection />
    </Box>
  )
}

export default SectionPage
