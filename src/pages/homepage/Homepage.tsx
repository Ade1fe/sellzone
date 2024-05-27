import { Box } from '@chakra-ui/react'
import { Categories, Footer, HeroComp, Navbar, SectionPage } from '..'

const Homepage = () => {
  return (
    <Box>
      <Navbar />
      <HeroComp />
    <Box className="" pos='relative' >
    <Categories />
    </Box>
      <SectionPage />
      <Footer  />
    </Box>
  )
}

export default Homepage
