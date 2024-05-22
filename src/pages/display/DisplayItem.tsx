
import { Box } from '@chakra-ui/react';
import LayoutOne from '../../layout/LayoutOne';
import DisplayComp from './DisplayComp';


const DisplayItem= () => {
  
  return (
    <LayoutOne>
    <Box maxW='1500px' className="" mx='auto' >
    <DisplayComp />
    </Box>
    </LayoutOne>
  );
};

export default DisplayItem;
