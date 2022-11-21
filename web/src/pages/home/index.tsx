import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import ElevatedButton from "../../components/ElevatedButton";
import { ListPools } from "../../components/ListPools";
import { api } from "../../services/api";

import NavBar from "../../components/NavBar";
import NewPoolButton from "../../components/NewPoolButton";

export default function Home() {
  const [mePools, setMePools] = useState([])
  const [pools, setPools] = useState([])

  async function loadPools() {
    console.log('Chamadooooooooooooooo')
    axios.all([
      await api.get('pools/me'),
      await api.get('pools')
    ]).then(axios.spread((data1, data2) => {
      setMePools(data1.data['pools'])
      setPools(data2.data['pools'])
    }))
  }
  
  useEffect(() => {
    loadPools()
  }, [])

  return (
    <>
      <Head>
        <title>Bolão</title>
      </Head>

      <NavBar />
      <div className="flex flex-col">
        <div className="p-3">
          <div className="flex flex-row-reverse gap-4">
            <div className="w-48 py-4 ">
              <ElevatedButton theme="SECUNDARY">
                Entrar com Codigo
              </ElevatedButton>
            </div>
            <div className="w-48 py-4 ">
              <NewPoolButton />
            </div>
          </div>

          
          <ListPools list={mePools} title='Meus Bolões' isMe={true} refresh={()=>{loadPools()}}/>
          <ListPools list={pools} title='Bolões Publico' refresh={()=>{loadPools()}} />
        </div>
      </div>
    </>
  )
}
