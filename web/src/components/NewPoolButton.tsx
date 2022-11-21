import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import CheckBox from './Checkbox';
import ElevatedButton from './ElevatedButton';
import Input from './Input';

export default function NewPoolButton() {
  const [title, setTitle] = useState<string>('')
  const [urlImage, setUrlImage] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value)
  };
  function onChangeUrlImage(e: React.FormEvent<HTMLInputElement>) {
    setUrlImage(e.currentTarget.value)
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    /* event.preventDefault(); */
    try {
      await api.post('pools', {
        title,
        urlImage,
        open: check
      })
      console.log("Cadastrouu")
    } catch (error) {
      console.log(error)
    }
  }

  return <Dialog.Root>
    <Dialog.Trigger className=''>
      <ElevatedButton>
        <span>Criar Bolão</span>
        <PlusCircle size={32} />
      </ElevatedButton>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/80 inset-0 fixed">
        <Dialog.Content className="fixed bg-background py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-2xl text-white font-black">
            Crie um novo bolão
          </Dialog.Title>

          <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-4'>
            <Input
              type='text'
              placeholder='Nome da Sala'
              value={title}
              required
              onChange={onChange}
              className='w-[100%]' />

            <Input
              type='url'
              placeholder='Url para imagem'
              value={urlImage}
              required
              onChange={onChangeUrlImage}
              className='w-[100%]' />
            <div className='flex flex-row'>
              <div onClick={() => { setCheck(!check) }}>
                <CheckBox title='Sala Privada?' />
              </div>
            </div>

            <ElevatedButton onClick={e => handleSubmit}>
              Confirmar
            </ElevatedButton>
          </form>

        </Dialog.Content>


      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>


}
