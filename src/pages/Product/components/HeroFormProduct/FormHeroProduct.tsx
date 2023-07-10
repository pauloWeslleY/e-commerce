import { ChangeEventHandler, memo } from 'react'
import { InputProps, SimpleGrid, Stack } from '@chakra-ui/react'
import { FormInputField, FormSelect } from './index'

interface HeroFormProductProps extends InputProps {
  bg: string
  valueName?: string
  valuePrice?: string | number
  valueDescription?: string
  valueSupplier?: string
  valueQuantity?: number
  valueCategoryId?: string
  onHandleChangeName: ChangeEventHandler<HTMLInputElement>
  onHandleChangePrice: ChangeEventHandler<HTMLInputElement>
  onHandleChangeDescription: ChangeEventHandler<HTMLInputElement>
  onHandleChangeSupplier: ChangeEventHandler<HTMLInputElement>
  onHandleChangeQuantity: ChangeEventHandler<HTMLInputElement>
  onHandleChangeCategoryId: ChangeEventHandler<HTMLSelectElement>
}

const FormHeroProduct = (props: HeroFormProductProps) => {
  const {
    bg,
    valueName,
    valuePrice,
    valueDescription,
    valueSupplier,
    valueQuantity,
    valueCategoryId,
    onHandleChangeName,
    onHandleChangePrice,
    onHandleChangeDescription,
    onHandleChangeSupplier,
    onHandleChangeQuantity,
    onHandleChangeCategoryId,
  } = props

  return (
    <Stack bg={bg} spacing={6} px={4} py={5} p={[null, 6]}>
      <SimpleGrid columns={6} spacing={6}>
        <FormInputField
          title="Nome do Produto"
          label="name_product"
          type="text"
          colSpan={[6, 6]}
          placeholder="Digite o nome do produto"
          value={valueName}
          onChange={onHandleChangeName}
        />

        <FormInputField
          title="Descrição do Produto"
          label="description_product"
          type="text"
          colSpan={[6, 6]}
          placeholder="Digite a descrição do produto"
          value={valueDescription}
          onChange={onHandleChangeDescription}
        />

        <FormInputField
          title="Fornecedor"
          label="supplier_product"
          type="text"
          colSpan={[6, 2]}
          placeholder="Digite o fornecedor do produto"
          value={valueSupplier}
          onChange={onHandleChangeSupplier}
        />

        <FormInputField
          title="Preço do Produto"
          label="price_product"
          type="number"
          colSpan={[6, 2]}
          placeholder="Digite o preço do produto"
          value={valuePrice}
          onChange={onHandleChangePrice}
        />

        <FormInputField
          title="Quantidade do Produto"
          label="quantity_product"
          type="number"
          colSpan={[6, 2]}
          placeholder="Digite a quantidade do produto"
          value={valueQuantity}
          onChange={onHandleChangeQuantity}
        />

        <FormSelect
          colSpan={[6, 2]}
          value={valueCategoryId}
          onChange={onHandleChangeCategoryId}
        />
      </SimpleGrid>
    </Stack>
  )
}

export default memo(FormHeroProduct)
