
import { Box } from '@chakra-ui/react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'

const SectionPage = () => {
  return (
    <Box mt='8rem' maxW='1500px' mx='auto'>
     <FirstSection />
      <SecondSection />
      <ThirdSection />
    </Box>
  )
}

export default SectionPage
