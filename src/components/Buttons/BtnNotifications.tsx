import { memo } from 'react'
import { ButtonGroup, IconButton, chakra } from '@chakra-ui/react'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2'

const BtnNotifications = () => {
  return (
    <ButtonGroup spacing={2}>
      <IconButton
        aria-label="label"
        isRound
        size={'md'}
        variant={'ghost'}
        fontSize={'xl'}
        _hover={{ bg: 'purple.700' }}
        icon={
          <>
            <MdOutlineNotificationsActive />
            <chakra.span
              pos={'absolute'}
              top={'-1px'}
              right={'-1px'}
              px={2}
              py={1}
              fontSize={'xs'}
              fontWeight={'bold'}
              lineHeight={'none'}
              color={'red.100'}
              transform={'translate(50%,-50%)'}
              bg={'green.600'}
              rounded={'full'}
            >
              12
            </chakra.span>
          </>
        }
      />

      <IconButton
        aria-label="label"
        size={'md'}
        fontSize={'xl'}
        variant={'ghost'}
        _hover={{ bg: 'purple.700' }}
        isRound
        ml={8}
        icon={
          <>
            <HiOutlineChatBubbleBottomCenter />
            <chakra.span
              pos={'absolute'}
              top={'-1px'}
              right={'-1px'}
              px={2}
              py={1}
              fontSize={'xs'}
              fontWeight={'bold'}
              lineHeight={'none'}
              color={'red.100'}
              transform={'translate(50%,-50%)'}
              bg={'blue.600'}
              rounded={'full'}
            >
              8
            </chakra.span>
          </>
        }
      />
    </ButtonGroup>
  )
}

export default memo(BtnNotifications)
