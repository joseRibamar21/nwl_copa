import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle, X } from 'phosphor-react';
import { useState } from 'react';

import ElevatedButton from './ElevatedButton';
import { openGameRoomService } from '../services/rooms_services';

interface OpenGameRoomButtonPops{
  roomId: string
  refresh?():void
}

export default function OpenGameRoomButton({roomId,refresh}:OpenGameRoomButtonPops) {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  async function handleClick() {
    await openGameRoomService(roomId)
    setOpenDialog(false)
    refresh? refresh(): null
  }

  return <Dialog.Root open={openDialog}>
    <Dialog.Trigger className='' onClick={() => setOpenDialog(true)}>
      <ElevatedButton theme='SECUNDARY'>
        <span>Abrir Jogo</span>
        <CheckCircle size={32} />
      </ElevatedButton>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/80 inset-0 fixed">
        <Dialog.Content className="fixed bg-background py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="flex flex-row justify-between text-2xl text-white font-black">
          Abrir Jogo para o público?
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
              Abrir para o público!
            </ElevatedButton>
          </div>

        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>


}
