import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,Icon,useDisclosure } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri';

const Sidebarcomp = () => {

  // function PlacementExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
     
        <Button bg='transparent' onClick={onOpen}>
         <Icon as={RiMenuLine} boxSize={[6,7,8]} />
        </Button>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  // }

}

export default Sidebarcomp
