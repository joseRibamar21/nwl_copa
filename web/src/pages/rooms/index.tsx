import Head from "next/head";
import { useEffect, useState } from "react";
import { ListPools } from "../../components/ListPools";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { searchRoomService } from "../../services/rooms_services";
import { Room } from "../../@types/room";

export default function Home() {
  const [pools, setPools] = useState<Room[]|undefined>()

  async function loadPools() {
    const data = await searchRoomService(`take=10`)
    console.log(data)
    setPools(data)
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
            </div>
          </div>
          <ListPools list={pools??[] as Room[]} title='Bolões Publico' refresh={()=>{loadPools()}} />
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
