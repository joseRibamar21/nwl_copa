import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import ElevatedButton from "../../components/ElevatedButton";
import { ListPools } from "../../components/ListPools";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Plus } from "phosphor-react"

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
              <ElevatedButton>
                <span>Criar Bolão</span>
                <Plus size={32} />
              </ElevatedButton>
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
