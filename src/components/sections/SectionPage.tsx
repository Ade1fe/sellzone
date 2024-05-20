
import { Box } from '@chakra-ui/react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import FourSection from './FourSection'
import FiveSection from './FiveSection'
import SixSection from './SixSection'

const SectionPage = () => {
  return (
    <Box mt='8rem' maxW='1500px' mx='auto'>
     <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourSection />
      <FiveSection />
      <SixSection />
    </Box>
  )
}

export default SectionPage
