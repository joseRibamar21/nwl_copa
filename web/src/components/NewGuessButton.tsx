import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle, X } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

import ElevatedButton from './ElevatedButton';
import Input from './Input';

interface NewGessButtonPops {
  idPool: string
  gameId: string
  title: string
  refresh?(): void
}

export default function NewGessButton({ idPool, gameId, refresh, title }: NewGessButtonPops) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const [dataForm, setDataForm] = useState({
    firstTeam: "",
    secondTeam: ""
  })

  const onChangeInput = (e: { target: { name: string; value: string; }; }) => setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log(dataForm)
    event.preventDefault();
    
    try {
      const data = await api.post("room/"+idPool+"/games/guesses", {
        gameId,
        firstTeamPoints: Number.parseInt(dataForm.firstTeam),
        secondTeamPoints: Number.parseInt(dataForm.secondTeam)
      })

      if(data.status !== 201){
        throw "Error"
      }

      setDataForm({
        firstTeam: "",
        secondTeam: "",
      })
      refresh? refresh(): null
      setOpenDialog(false)
      toast("Palpite cadastrado com sucesso!",{type:"success"})
    } catch (error) {
      toast("Erro ao cadastrar palpite!",{type:"error"})
      console.log(error)
    }
  }

  return <Dialog.Root open={openDialog}>
    <Dialog.Trigger className='flex flex-row gap-2 items-center font-bold' onClick={() => setOpenDialog(true)}>
      Adicionar palpite
      <PlusCircle size={32} />
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/80 inset-0 fixed">
        <Dialog.Content className="fixed bg-background py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="flex flex-row justify-between text-2xl text-white font-black">
            {title}
            <Dialog.Close onClick={() => {
              setDataForm({
                firstTeam: "",
                secondTeam: ""
              })
              setOpenDialog(false)
            }}>
              <X size={32} />
            </Dialog.Close>
          </Dialog.Title>

          <form onSubmit={handleSubmit} className='mt-8 flex flex-row gap-4'>
            <Input
              type='number'
              placeholder='0'
              name='firstTeam'
              value={dataForm.firstTeam}
              required
              onChange={onChangeInput}
              className='w-[30px]' />

            <Input
              type='number'
              placeholder='0'
              name='secondTeam'
              value={dataForm.secondTeam}
              required
              onChange={onChangeInput}
              className='w-[30px]' />

            <ElevatedButton onClick={e => handleSubmit}>
              Confirmar
            </ElevatedButton>
          </form>

        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>


}
