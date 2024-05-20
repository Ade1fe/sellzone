import { Box, Button, Icon, Input, Text } from '@chakra-ui/react'
import { IoIosArrowDown } from "react-icons/io";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { HiOutlineShoppingCart } from "react-icons/hi2";
// 
import { Sidebarcomp } from '../pages';

const Navbar = () => {
  return (
    <Box display={['flex', ""]} py='4' justifyContent='center' gap={['3','4','5', '6','8']} alignItems='center'>
       
      <Sidebarcomp />
      <Text as='span' className='logo' fontSize={['lg', 'x-large', 'xx-large']} textShadow='1px 1px green'>SellZone</Text>
      <Box display={['flex', ""]} w={['50%']} justifyContent='space-between' gap='2' alignItems='center' className="">
        <Input placeholder='search products, brands and categories' />
        <Button>Search</Button>
      </Box>
      
      <div className="">
      <Menu>
  <MenuButton as={Button} rightIcon={<IoIosArrowDown />}>
    Account
  </MenuButton>
  <MenuList shadow='md'>
    <MenuItem >Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
      </div>

      <div className=""> <Icon as={HiOutlineShoppingCart} boxSize={[6,7,8]} /> </div>
    </Box>
  )
}

export default Navbar
