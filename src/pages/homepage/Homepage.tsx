import { Box } from '@chakra-ui/react'
import { Categories, HeroComp, Navbar, SectionPage } from '..'

const Homepage = () => {
  return (
    <Box>
      <Navbar />
      <HeroComp />
    <Box className="" pos='relative' >
    <Categories />
    </Box>
      <SectionPage />
    </Box>
  )
}

export default Homepage
