import { ChangeEvent, memo } from 'react'
import {
  FormControl,
  Flex,
  Avatar,
  Icon,
  Stack,
  Text,
  chakra,
  VisuallyHidden,
  Progress,
  Image,
} from '@chakra-ui/react'
import { IsButton } from '../../../../components/Buttons'
import { FormLabelTitle } from '../../../../components/Form/FormLabelTitle'
import { IconUser } from '../../../../components/IconUser'

interface FormUploadImageProps {
  photoURL: string
  uploadProgress: number
  onUploadImage: () => Promise<void>
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormUploadImage = (props: FormUploadImageProps) => {
  const { photoURL, uploadProgress, onImageChange, onUploadImage } = props

  return (
    <>
      <FormControl>
        <FormLabelTitle title="Foto" />
        <Flex align={'center'} gap={2} mt={1}>
          {photoURL ? (
            <Avatar boxSize={12} src={photoURL} name={'User Profile'} />
          ) : (
            <Avatar boxSize={12} bg={'purple.600'} icon={IconUser} />
          )}
          <IsButton size={'xs'} title="Trocar" onClick={onUploadImage} />
        </Flex>
      </FormControl>

      <FormControl>
        <FormLabelTitle title="Cover Foto" />
        <Flex
          mt={1}
          justify={'center'}
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          color={'purple.400'}
          borderStyle={'dashed'}
          rounded={'md'}
        >
          <Stack spacing={1} textAlign={'center'}>
            <Icon
              mx={'auto'}
              boxSize={12}
              color={'gray.400'}
              stroke={'currentColor'}
              fill={'none'}
              viewBox={'0 0 48 48'}
              aria-hidden={'true'}
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
            <Flex fontSize={'sm'} color={'purple.600'} align={'baseline'}>
              <chakra.label
                htmlFor={'file-upload'}
                cursor={'pointer'}
                rounded={'md'}
                fontSize={'md'}
                color={'purple.500'}
                pos={'relative'}
                _hover={{
                  color: 'purple.400',
                }}
              >
                <span>Upload a file </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  onChange={onImageChange}
                />
                <VisuallyHidden></VisuallyHidden>
              </chakra.label>
              <Text pl={1}>or drag and drop</Text>
            </Flex>
            <Text fontSize={'xs'} color={'gray.50'}>
              PNG, JPG, GIF up to 10MB
            </Text>
          </Stack>
        </Flex>
      </FormControl>
      <Progress hasStripe value={uploadProgress} colorScheme={'purple'} />
      <Flex my={6} align={'center'} justify={'center'}>
        {uploadProgress !== null && (
          <Progress hasStripe value={uploadProgress} colorScheme={'purple'} />
        )}
        {photoURL && (
          <Image
            src={photoURL}
            alt="Image"
            h={'auto'}
            w={'full'}
            fit={'cover'}
            rounded={'md'}
            shadow={'md'}
          />
        )}
      </Flex>
    </>
  )
}

export default memo(FormUploadImage)
