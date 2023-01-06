import * as Dialog from '@radix-ui/react-dialog';
import { ArrowSquareIn, X } from 'phosphor-react';
import { useState } from 'react';

import ElevatedButton from './ElevatedButton';
import { joinRoomService } from '../services/rooms_services';
import { useAuth } from '../hooks/useAuth';
import { priceFormater } from '../utils/priceFormater';

interface JoinRoomButtonPops{
  code: string
  name: string
  price: number
  refresh?():void
}

export default function JoinRoomButton({code,refresh,name, price}:JoinRoomButtonPops) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const {refreshUser} = useAuth()

  async function handleClick() {
    await joinRoomService(code)
    refreshUser()
    setOpenDialog(false)
    refresh? refresh(): null
  }

  return <Dialog.Root open={openDialog}>
    <Dialog.Trigger className='' onClick={() => setOpenDialog(true)}>
      <ElevatedButton theme='SECUNDARY'>
        <span>Participar da sala</span>
        <ArrowSquareIn size={32} />
      </ElevatedButton>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/80 inset-0 fixed">
        <Dialog.Content className="fixed bg-background py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="flex flex-row justify-between text-xl text-white font-semibold">
            {`Deseja participar da sala ${name}?\nPreço da inscrição: ${priceFormater(price)}`}
            <Dialog.Close onClick={() =>{
              
              setOpenDialog(false)
              }}>
              <X size={32} />
            </Dialog.Close>
          </Dialog.Title>

          <div className='mt-8 flex flex-row gap-4'>
          <ElevatedButton onClick={e => setOpenDialog(false)} theme="CLOSE">
              Agora não
            </ElevatedButton>
            <ElevatedButton onClick={()=>{handleClick()}}>
              Inscrever!
            </ElevatedButton>
          </div>

        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>


}
