
import { Box } from '@chakra-ui/react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import FourSection from './FourSection'
import FiveSection from './FiveSection'
import SixSection from './SixSection'
import SevenSection from './SevenSection'

const SectionPage = () => {
  return (
    <Box mt='8rem' maxW='1500px' mx='auto'>
     <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourSection />
      <FiveSection />
      <SixSection />
      <SevenSection />
    </Box>
  )
}

export default SectionPage
