/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Game } from "../../../@types/game";
import { Room } from "../../../@types/room";
import ListGamesPool from "../../../components/ListGamesPool";
import LoadPage from "../../../components/LoadPage";
import { parseCookies } from "nookies";

import { roomSpecificService } from "../../../services/rooms_services";
import { gamesRoomService } from "../../../services/games_services";
import { GetServerSideProps } from "next";
import { useAuth } from "../../../hooks/useAuth";

export default function OneRoom() {
  const { query } = useRouter()
  const [pool, setPool] = useState({} as Room)
  const [games, setGames] = useState([] as Game[])
  const [loading, setLoading] = useState(true)
  const {user} = useAuth()
  const id = query.id

  const reloading = async () => {
    try {
      const gamesData = await gamesRoomService(id as string)
      if (gamesData) {
        console.log(gamesData)
        setGames(gamesData)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    const loadRoom = async () => {
      setLoading(true)
      try {

        const room = await roomSpecificService(id as string)
        const gamesData = await gamesRoomService(id as string)

        if (room) {
          setPool(room)
        }
        if (gamesData) {
          console.log(gamesData)
          setGames(gamesData)
        }
        setLoading(false)
        console.log("PoolIDOwner: " + pool.owner?.id)
        console.log("userId: " + user?.id)
      } catch (error) {
      }
    }
    loadRoom()
  }, [id, pool.owner?.id, user?.id])

  if (loading) {
    return <LoadPage />
  }

  if (!loading && !pool) {
    console.log(pool)
    return <div className="flex w-[100%] h-[100vh] justify-center items-center">
      <h1 className="text-4xl font-bold">Sala não encontrada! </h1>
    </div>
  }

  if (pool) {
    return (
      <>
        <Head>
          <title>
            Sala: {pool.title}
          </title>
        </Head>

        <img src={pool.urlImage} alt={pool.urlImage} height={400} className="w-[100%] h-72 object-cover" />
        <div className="flex flex-col flex-wrap p-6">
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col p-3">
              <h1>{pool.title}</h1>
              <span>Code: {pool.code}</span>
            </div>
          </div>
          {
            pool.owner?.id == user?.id ?
              <div className="flex flex-row-reverse">
                
              </div>
              : <></>
          }
          <div className="flex flex-col pt-12 gap-5">
            <h1>Participantes</h1>
            <div className=" flex gap-6 flex-wrap">
              {pool.participants?.map((e, i) => {
                return <div key={i} className="flex flex-row rounded-2xl p-3 bg-gradient-to-r from-blue-700 to-green-700 items-center gap-4 w-">
                  <img src={e.user.avatarUrl} width={60} height={60} alt={e.user.name} className="rounded-full w-16 h-16 object-cover" />
                  <span className="font-bold pr-12">{e.user.name}</span>
                </div>
              })}
            </div>
          </div>
          <ListGamesPool poolId={pool.id} games={games} refresh={reloading}  isOwner={pool.owner?.id == user?.id} />
        </div>
      </>
    )
  }
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
