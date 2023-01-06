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
  const { user } = useAuth()
  const id = query.id

  const reloading = async () => {
    try {
      const gamesData = await gamesRoomService(id as string)
      if (gamesData) {
        console.log(gamesData)
        setGames(gamesData)
      }
      const room = await roomSpecificService(id as string)
      if (room) {
        setPool(room)
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

  function stepText(step:number){
/*  0: Construção da sala (build)
    1: Jogo aberto para publico (Open)
    2: Jogo finalizado para entrada de resultados (run Game)
    3: Encerrar Sala e distribuir valores (finished) */

    if(step == 0){
      return "Em construção"
    }
    if(step == 1){
      return "Aberto"
    }
    if(step == 2){
      return "Em andamento"
    }
    if(step == 3){
      return "Finalizado"
    }
    return "Error"
  }

  if (pool) {
    return (
      <>
        <Head>
          <title>
            Sala: {pool.title}
          </title>
        </Head>

        <img src={pool.urlImage} alt={pool.urlImage} height={400} className="w-[100%] h-96 object-cover" />
        <div className="flex flex-col flex-wrap p-6">
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col p-3">
              <h1>{pool.title}</h1>
              <span>Code: {pool.code}</span>
              <span>Valor da inscrição: {pool.priceInscription}</span>
              <span>Valor acumulado: {pool.amount}</span>
              <h2>Status da sala: {stepText(pool.step)}</h2>
            </div>
          </div>
          <div className="flex flex-col pt-12 gap-5">
            <h1>Participantes</h1>
            <div className=" flex gap-6 flex-wrap">
              {pool.participants?.map((e, i) => {
                return <div key={i} className="flex flex-row rounded-2xl p-3 bg-gradient-to-r from-blue-700 to-green-700 items-center gap-4 w-">
                  <img src={e.user.avatarUrl} width={60} height={60} alt={e.user.name} className="rounded-full w-16 h-16 object-cover" />
                  <div className="flex flex-col">
                    <span className="font-bold pr-12">{e.user.name}</span>
                    <span className="font-bold pr-12">Pontos: {e.totalPoints}</span>
                  </div>
                </div>
              })}
            </div>
          </div>
          <ListGamesPool poolId={pool.id} games={games} refresh={reloading} isOwner={pool.isAdm} step={pool.step} />
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
