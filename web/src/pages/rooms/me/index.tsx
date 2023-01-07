import { GetServerSideProps } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import CardRoom from "../../../components/CardRoom"
import { useEffect, useState } from "react"
import { Room } from "../../../@types/room"
import { meRoomsServices } from "../../../services/rooms_services"
import Link from "next/link"
import ElevatedButton from "../../../components/ElevatedButton"

export default function MeRooms() {
  const [room, setRoom] = useState<Room[] | undefined>()

  async function loadRoom() {
    const data = await meRoomsServices()
    console.log(data)
    if (data) {
      setRoom(data)
    }
  }

  useEffect(() => {
    loadRoom()
  }, [])

  return (<>
    <Head>
      <title>Bolão</title>
    </Head>
    <div className="p-4">
      <div className="flex justify-end pb-6">
      <div className="w-48">
        <Link href='/rooms/new'><ElevatedButton>Criar Bolão</ElevatedButton></Link>
      </div>
      </div>

      <div className="flex flex-row flex-wrap">
        {room?.map((e) => {
          return <CardRoom key={e.id} room={e} />
        })}
      </div>
    </div>
  </>)
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
