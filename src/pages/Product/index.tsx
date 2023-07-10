import React, { useState, useEffect } from 'react'
import { Button, Flex, Input, chakra } from '@chakra-ui/react'

const MeuFormulario: React.FC = () => {
  const [campo1, setCampo1] = useState('')
  const [campo2, setCampo2] = useState('')
  const [enviarHabilitado, setEnviarHabilitado] = useState(false)

  // Função para verificar se todos os campos estão preenchidos
  const verificarCampos = () => {
    if (campo1 !== '' && campo2 !== '') {
      setEnviarHabilitado(true)
    } else {
      setEnviarHabilitado(false)
    }
  }

  useEffect(() => {
    verificarCampos()
  }, [campo1, campo2])

  // Função para lidar com o envio do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (enviarHabilitado) {
      // Lógica para enviar o formulário para o servidor
      console.log('Formulário enviado!')
      // Limpar os campos do formulário
      setCampo1('')
      setCampo2('')
    }

    console.log('Formulário não enviado!')
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <chakra.form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={campo1}
          onChange={event => setCampo1(event.target.value)}
        />
        <Input
          type="text"
          value={campo2}
          onChange={event => setCampo2(event.target.value)}
        />
        <Button type="submit" isDisabled={!enviarHabilitado}>
          Enviar
        </Button>
      </chakra.form>
    </Flex>
  )
}

export default MeuFormulario
