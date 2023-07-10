import { memo, useEffect } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import {
  FormFooterHero,
  FormHeroBox,
  FormHeroProduct,
} from '../HeroFormProduct'
import { IsButton } from '../../../../components/Buttons'

const FormCreateProduct = () => {
  const {
    name,
    description,
    supplier,
    price,
    quantity,
    categoryId,
    isValid,
    isFormValid,
    setCategoryId,
    setDescription,
    setName,
    setSupplier,
    handleConvertNumber,
    handleConvertPrice,
    handleCreateProduct,
  } = useProducts()
  const { THEME } = useThemeColors()

  useEffect(() => {
    isFormValid()
  }, [name, description, price, quantity, supplier, categoryId])

  return (
    <FormHeroBox onHandleSubmit={handleCreateProduct}>
      <FormHeroProduct
        bg={THEME.DASHBOARD.FORM_BACKGROUND}
        valueName={name}
        valuePrice={price}
        valueDescription={description}
        valueSupplier={supplier}
        valueQuantity={quantity}
        valueCategoryId={categoryId}
        onHandleChangeName={e => setName(e.target.value)}
        onHandleChangePrice={e => handleConvertPrice(e.target.value)}
        onHandleChangeDescription={e => setDescription(e.target.value)}
        onHandleChangeSupplier={e => setSupplier(e.target.value)}
        onHandleChangeQuantity={e => handleConvertNumber(e.target.value)}
        onHandleChangeCategoryId={e => setCategoryId(e.target.value)}
      />
      <FormFooterHero>
        <IsButton title="Criar" type="submit" isDisabled={!isValid} />
      </FormFooterHero>
    </FormHeroBox>
  )
}

export default memo(FormCreateProduct)
