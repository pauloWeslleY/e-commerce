import { memo } from 'react'
import { FormControl, GridItem, Select, SelectProps } from '@chakra-ui/react'
import { FormLabelTitle } from '../../../../components/Form/FormLabelTitle'
import { useThemeColors } from '../../../../hooks/useThemeColors'
import { useFetch } from '../../../../hooks/useFetch'

interface SelectFormProps extends SelectProps {
  colSpan: number[]
}

const SelectForm = (props: SelectFormProps) => {
  const { colSpan, ...rest } = props
  const { isCategories } = useFetch()
  const { THEME } = useThemeColors()

  return (
    <FormControl isRequired as={GridItem} colSpan={colSpan}>
      <FormLabelTitle title="Categorias" htmlFor="categories_product" />
      <Select
        {...rest}
        id="categories_product"
        name="categories_product"
        autoComplete="categories_product"
        placeholder="Selecione uma opção"
        focusBorderColor={THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_FOCUS_COLORS}
        _placeholder={{
          opacity: 1,
          color: THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS,
        }}
        shadow={'sm'}
        size={'sm'}
        w={'full'}
        variant={'flushed'}
      >
        {isCategories.map((props, i) => (
          <option key={i} value={props.name}>
            {props.name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default memo(SelectForm)
