import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import ElevatedButton from "../../components/ElevatedButton";
import { ListPools } from "../../components/ListPools";
import { api } from "../../services/api";

import { toast } from "react-toastify";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Home() {
  const [mePools, setMePools] = useState([])
  const [pools, setPools] = useState([])

  async function loadPools() {
    axios.all([
      await api.get('room/me'),
      await api.get('room')
    ]).then(axios.spread((data1, data2) => {
      setMePools(data1.data['rooms'])
      setPools(data2.data['rooms'])
    })).catch(e=>{
      toast("Erro ao carregar salas", {
        type:'error'
      })
    })
  }
  
  useEffect(() => {
    loadPools()
  }, [])

  return (
    <>
      <Head>
        <title>Bolão</title>
      </Head>
      <div className="flex flex-col">
        <div className="p-3">
          <div className="flex flex-row-reverse gap-4">
            <div className="w-48 py-4 ">
            <Link href='/rooms/new'><ElevatedButton>Criar Bolão</ElevatedButton></Link>
            </div>
            <div className="w-48 py-4 ">
            </div>
          </div>

          
          <ListPools list={mePools} title='Meus Bolões' isMe={true} refresh={()=>{loadPools()}}/>
          <ListPools list={pools} title='Bolões Publico' refresh={()=>{loadPools()}} />
        </div>
      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)
  
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
