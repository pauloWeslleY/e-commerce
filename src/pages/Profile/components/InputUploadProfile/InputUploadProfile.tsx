import { Flex, Text, VisuallyHidden, chakra } from '@chakra-ui/react'

interface InputUploadProfileProps {
  label: string
  description: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputUploadProfile = (props: InputUploadProfileProps) => {
  const { label, description, onChange } = props

  return (
    <Flex fontSize={'sm'} color={'violet.700'} align={'baseline'}>
      <chakra.label
        htmlFor={'file-upload'}
        cursor={'pointer'}
        rounded={'md'}
        fontSize={'md'}
        color={'violet.400'}
        pos={'relative'}
        transition={'all .3s ease'}
        _hover={{
          color: 'violet.600',
        }}
      >
        <span>{label} </span>
        <VisuallyHidden>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            onChange={onChange}
          />
        </VisuallyHidden>
      </chakra.label>
      <Text pl={1}>{description}</Text>
    </Flex>
  )
}

export { InputUploadProfile }
