import Head from "next/head";
import { useEffect, useState } from "react";
import { ListPools } from "../../components/ListPools";
import { api } from "../../services/api";

export default function Home() {
  const [mePools, setMePools] = useState([])

  async function loadPools() {
    
    const res = await api.get('pools/me')
    setMePools(res.data['pools'])
    console.log(mePools)
  }

  useEffect(()=> {
    loadPools()
  },[])

  return (
    <>
      <Head>
        <title>Bolão</title>
      </Head>
      <div className="">
        <ListPools data={mePools}/>
      </div>
    </>
  )
}
