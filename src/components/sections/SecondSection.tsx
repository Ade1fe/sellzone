import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import LatestUpdateCard from '../cards/LatestUpdateCard'

const SecondSection = () => {
  return (
    <Box mt='3rem' p={5} >
       <Text fontSize="2xl" mb={5} className='title' textShadow='1px 0.5px brown'>Latest Updates</Text>
      <LatestUpdateCard />
    </Box>
  )
}

export default SecondSection
