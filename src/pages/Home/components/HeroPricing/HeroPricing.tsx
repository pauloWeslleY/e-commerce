import { memo } from 'react'
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Text,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react'
import IconFeature from './IconFeature'
import { IsButton } from '../../../../components/Buttons'

const HeroPricing = () => {
  const topBg = useColorModeValue('gray.100', 'purple.100')
  const bottomBg = useColorModeValue('white', 'blackAlpha.400')

  const CONTENT: Array<string> = [
    'Projetos Ilimitados',
    'Rastreamento e análise dos produtos',
    '500GB de Armazenamento',
    'Suporte Personalizado',
  ]

  return (
    <Box
      as={'section'}
      w={'full'}
      rounded={'md'}
      textAlign={{ base: 'left', md: 'center' }}
    >
      <Flex
        rounded={'md'}
        bg={bottomBg}
        textAlign={'left'}
        flexDir={{ base: 'column', lg: 'row' }}
      >
        <Stack spacing={8} p={'45px'} flex={'0.7'}>
          <Text fontSize={'3xl'} fontWeight={'bold'} lineHeight={'tight'}>
            Associação Vitalícia
          </Text>
          <chakra.p
            fontSize={['sm', 'md']}
            color={'gray.600'}
            _dark={{ color: 'gray.50' }}
          >
            Um plano para qualquer organização - de startups e pequenas e medias
            empresas. Oferecemos 50% de desconto para todos os CTO e Gestores.
            Por favor, entre em contato conosco.
          </chakra.p>
          <Flex align={'center'}>
            <Text
              fontFamily={'body'}
              whiteSpace={'nowrap'}
              fontWeight={500}
              textTransform={'uppercase'}
              color={'brand.400'}
            >
              O que está incluído
            </Text>
            <Flex
              h={'3px'}
              w={'full'}
              ml={'15px'}
              borderTopWidth={'1px'}
              borderTopColor={topBg}
            />
          </Flex>
          <SimpleGrid columns={[1, 2, 1, 2]} spacingY={4}>
            {CONTENT.map((props, i) => (
              <IconFeature key={i}>{props}</IconFeature>
            ))}
          </SimpleGrid>
        </Stack>
        <Stack
          p={'45px'}
          flex={'0.3'}
          justify={'center'}
          align={'center'}
          bg="#F9FAFB"
          _dark={{ bg: 'gray.800' }}
          borderRightRadius={'md'}
        >
          <Text textAlign={'center'} fontSize={'xl'} fontWeight={'semibold'}>
            Pague uma vez, use quando quiser
          </Text>
          <Flex
            align={'center'}
            fontSize={'5xl'}
            fontWeight={['bold', 'extrabold']}
            lineHeight={'tight'}
          >
            R$500
            <chakra.span
              ml={2}
              fontSize={'2xl'}
              fontWeight={'medium'}
              color={'gray.500'}
              _dark={{ color: 'gray.400' }}
            >
              {' '}
              REAIS
            </chakra.span>
          </Flex>
          <Stack spacing={6}>
            <Text
              textAlign={'center'}
              textDecor={'underline'}
              color={'gray.600'}
              _dark={{ color: 'gray.400' }}
            >
              Saiba mais sobre nossa adesão
            </Text>
            <IsButton title="Get Access" />
            <Text align={'center'} fontWeight={'semibold'}>
              Obtenha uma amostra grátis
              <chakra.span
                ml={2}
                color={'gray.500'}
                _dark={{ color: 'gray.400' }}
                fontWeight={'medium'}
              >
                (50MB)
              </chakra.span>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  )
}

export default memo(HeroPricing)
