import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import ElevatedButton from "../../components/ElevatedButton";
import { ListPools } from "../../components/ListPools";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Plus } from "phosphor-react"
import * as Dialog from '@radix-ui/react-dialog';

export default function Home() {
  const [mePools, setMePools] = useState([])
  const [pools, setPools] = useState([])
  const { user } = useAuth()

  async function loadPools() {

    axios.all([
      await api.get('pools/me'),
      await api.get('pools')
    ]).then(axios.spread((data1, data2) => {
      setMePools(data1.data['pools'])
      setPools(data2.data['pools'])
    }))
  }

  console.log(user.avatarUrl)

  useEffect(() => {
    loadPools()
  }, [])

  return (
    <>
      <Head>
        <title>Bolão</title>
      </Head>

      <div className="flex flex-row">
        <div className="flex flex-col p-4 rounded bg-slate-800">
          <img src={user.avatarUrl} alt={user.avatarUrl} className="rounded-full w-36" />
          <span className="mt-6 self-center">{user.name}</span>
        </div>
        <div className="p-3">
          <div className="flex flex-row gap-4">
            <div className="w-48 py-4 ">
              <ElevatedButton theme="SECUNDARY">
                Entrar com Codigo
              </ElevatedButton>
            </div>
            <div className="w-48 py-4 ">
              <Dialog.Root>

                <Dialog.Trigger className=''>

                  <ElevatedButton>
                    <span>Criar Bolão</span>
                    <Plus size={32} />
                  </ElevatedButton>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/80 inset-0 fixed">
                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                      <Dialog.Title className="text-3xl text-white font-black">
                        Crie um novo bolão
                      </Dialog.Title>

                        
                    </Dialog.Content>


                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>

            </div>
          </div>

          <h3 className="text-3xl font-bold">Meus Bolões</h3>
          <ListPools data={mePools} />
          <h3 className="text-3xl font-bold">Bolões Publico</h3>
          <ListPools data={pools} />
        </div>
      </div>



    </>
  )
}
