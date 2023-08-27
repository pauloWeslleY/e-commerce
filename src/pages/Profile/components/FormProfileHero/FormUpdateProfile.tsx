import { ChangeEvent, memo, useEffect, useState } from 'react'
import { SimpleGrid, GridItem, Box, useToast } from '@chakra-ui/react'
import { RiUser3Fill } from 'react-icons/ri'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { IsButton } from '../../../../components/Buttons'
import { InputFieldBar } from '../../../../components/Form/InputBar'
import { auth, storage } from '../../../../../firebase'
import { FormUploadImage, FormProfile } from './index'

const FormUpdateProfile = () => {
  const user = auth.currentUser
  const [username, setUsername] = useState<string>(`${user.displayName}`)
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const toast = useToast()

  const handleUpdateUser = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: username,
        photoURL: photoUrl,
      })
      setUsername('')
      toast({
        title: 'Usuário atualizado!',
        description: `${username}`,
        position: 'top-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Não foi possível atualizar o usuário',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0]
      setImage(selectedImage)
    } else {
      toast({
        title: 'Não foi possível atualizar o foto',
        description: 'Por favor selecione uma foto!',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleUploadImage = async () => {
    if (image) {
      const storageRef = ref(storage, `users/${image.name}`)
      const uploadImage = uploadBytesResumable(storageRef, image)

      uploadImage.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        err => {
          toast({
            title: `Não foi possível fazer upload da image ${err}`,
            status: 'error',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          })
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then(downloadURL => {
            setPhotoUrl(downloadURL)
            setUploadProgress(null)
          })
        }
      )
    }
  }

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || '')
    }
  }, [])

  return (
    <FormProfile>
      <SimpleGrid columns={4} spacing={6}>
        <Box as={GridItem} colSpan={[6, 4]}>
          <InputFieldBar
            title="Nome"
            label="username"
            inputType="text"
            placeholder="Digite seu nome..."
            icon={<RiUser3Fill />}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Box>
      </SimpleGrid>

      <FormUploadImage
        photoURL={photoUrl}
        uploadProgress={uploadProgress}
        onUploadImage={handleUploadImage}
        onImageChange={handleImageChange}
      />

      <Box px={{ base: 4, sm: 6 }} py={3} textAlign={'right'}>
        <IsButton
          title="Atualizar"
          onClick={handleUpdateUser}
          isDisabled={!photoUrl}
        />
      </Box>
    </FormProfile>
  )
}

export default memo(FormUpdateProfile)
