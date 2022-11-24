import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/router';
import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import CheckBox from './Checkbox';
import ElevatedButton from './ElevatedButton';
import Input from './Input';
import TextButton from './TextButton';

export default function JoinPoolButton() {
  const [code, setCode] = useState<string>('')
  const router = useRouter();

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    setCode(e.currentTarget.value)
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const t = await api.post('pools/join', {
      code
    }).catch((e)=>{
      console.log("AKiiiiiiiiii")
      console.log(e)
      toast(e.request?.data?.message, { type: "error" })
    }).then(()=>{
      setCode('')
      toast("Agora vc está participando!", { type: "success" })

    })

  }

  return <Dialog.Root>
    <Dialog.Trigger className=''>
      <TextButton>
        <span>Participar de um Bolão com o codigo</span>
      </TextButton>
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
              placeholder='Codigo da Sala'
              value={code}
              required
              onChange={onChange}
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
