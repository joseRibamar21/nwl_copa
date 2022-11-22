import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle, X } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../services/api';

import ElevatedButton from './ElevatedButton';
import Input from './Input';

interface NewGameButtonPops{
  idPool: string
  refresh():void
}

export default function NewGameButton({idPool,refresh}:NewGameButtonPops) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const [dataForm, setDataForm] = useState({
    firstTeam: "",
    secondTeam: "",
    date: "",
  })

  const onChangeInput = (e: { target: { name: string; value: string; }; }) => setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log(dataForm)
    event.preventDefault();

    try {
      await api.post('pools/'+ idPool+"/games", dataForm)
      setDataForm({
        firstTeam: "",
        secondTeam: "",
        date: "",
      })
      refresh()
      setOpenDialog(false)
      console.log("Cadastrouu")
    } catch (error) {
      console.log(error)
    }
  }

  useState

  return <Dialog.Root open={openDialog}>
    <Dialog.Trigger className='' onClick={() => setOpenDialog(true)}>
      <ElevatedButton>
        <span>Criar Jogo</span>
        <PlusCircle size={32} />
      </ElevatedButton>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/80 inset-0 fixed">
        <Dialog.Content className="fixed bg-background py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="flex flex-row justify-between text-2xl text-white font-black">
            <h2>Crie um novo Jogo</h2>
            <Dialog.Close onClick={() =>{
              setDataForm({
                firstTeam: "",
                secondTeam: "",
                date: "",
              })
              setOpenDialog(false)
              }}>
              <X size={32} />
            </Dialog.Close>
          </Dialog.Title>

          <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-4'>
            <Input
              type='text'
              placeholder='Nome do primeiro time'
              name='firstTeam'
              value={dataForm.firstTeam}
              required
              onChange={onChangeInput}
              className='w-[100%]' />

            <Input
              type='text'
              placeholder='Nome do segundo time'
              name='secondTeam'
              value={dataForm.secondTeam}
              required
              onChange={onChangeInput}
              className='w-[100%]' />

            <Input
              type='datetime-local'
              placeholder='Data e hora do jogo'
              name='date'
              value={dataForm.date}
              required
              onChange={onChangeInput}
              className='w-[100%]' />

            <ElevatedButton onClick={e => handleSubmit}>
              Confirmar
            </ElevatedButton>
          </form>

        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>


}
