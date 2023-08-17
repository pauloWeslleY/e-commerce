import { ChangeEvent, memo } from 'react'
import {
  FormControl,
  Flex,
  Avatar,
  Stack,
  Text,
  Progress,
  Image,
  useToast,
} from '@chakra-ui/react'
import { IsButton } from '../../../../components/Buttons'
import { FormLabelTitle } from '../../../../components/Form/FormLabelTitle'
import { IconUser } from '../../../../components/IconUser'
import { IcoForm } from '../IconForm/IcoForm'
import { InputUploadProfile } from '../InputUploadProfile/InputUploadProfile'

interface FormUploadImageProps {
  photoURL: string
  uploadProgress: number
  onUploadImage: () => Promise<void>
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormUploadImage = (props: FormUploadImageProps) => {
  const { photoURL, uploadProgress, onImageChange, onUploadImage } = props
  const toast = useToast()

  const handleUpload = () => {
    if (uploadProgress === 100) {
      onUploadImage()
    } else {
      toast({
        title: 'Não foi possível atualizar a foto',
        description: 'Por favor selecione uma foto!',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <FormControl>
        <FormLabelTitle title="Foto" />
        <Flex align={'center'} gap={2} mt={1}>
          {photoURL ? (
            <Avatar boxSize={12} src={photoURL} name={'User Profile'} />
          ) : (
            <Avatar boxSize={12} icon={IconUser} bg={'violet.500'} />
          )}
          <IsButton size={'xs'} title="Trocar" onClick={handleUpload} />
        </Flex>
      </FormControl>

      <FormControl>
        <FormLabelTitle title="Cover Foto" />
        <Flex
          justify={'center'}
          mt={1}
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          borderStyle={'dashed'}
          rounded={'md'}
        >
          <Stack spacing={1} textAlign={'center'}>
            <IcoForm />
            <InputUploadProfile
              label="Upload a file"
              description="or drag and drop"
              onChange={onImageChange}
            />
            <Text fontSize={'xs'} color={'zinc.600'}>
              PNG, JPG, GIF up to 10MB
            </Text>
          </Stack>
        </Flex>
      </FormControl>

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
            borderWidth={1}
            borderColor={'violet.100'}
          />
        )}
      </Flex>
    </>
  )
}

export default memo(FormUploadImage)
