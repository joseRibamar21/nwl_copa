import Head from "next/head";
import { useRouter } from "next/router";
import { Spinner } from "phosphor-react";
import { useEffect, useState } from "react";
import { Game } from "../../../@types/game";
import { Pool } from "../../../@types/pool";
import { api } from "../../../services/api";

export default function OnePool() {
  const { query } = useRouter()
  const [pool, setPool] = useState({} as Pool)
  const [games, setGames] = useState([] as Game[])
  const [loading, setLoading] = useState(true)

  async function loadPool() {
    setLoading(true)
    const id = query.id
    const poolData = await api.get('pools/' + id)
    const gamesData = await api.get('pools/' + id + '/games')
    setGames(gamesData.data.game)
    console.log(poolData)
    console.log(gamesData.data.game[0].guesses[0])
    if (poolData.data) {
      setPool(poolData.data['pool'])
    }
    setLoading(false)
  }


  useEffect(() => {
    loadPool()
  }, [])

  if (loading) {
    return <div className="flex w-[100%] h-[100vh] justify-center items-center">
      <div className="animate-spin">
        <Spinner size={30} />
      </div>
    </div>
  }

  if (!loading && !pool) {
    console.log(pool)
    return <div className="flex w-[100%] h-[100vh] justify-center items-center">
      <h1 className="text-4xl font-bold">Sala não encontrada! </h1>
    </div>
  }

  return (
    <>
      <Head>
        <title>
          Sala: {pool.title}
        </title>
      </Head>

      <div className="flex flex-col flex-wrap p-6">
        <div className="flex flex-row gap-4 flex-wrap">
          <img src={pool.urlImage} alt="image.jpg" width={400} height={400} className="rounded-xl" />
          <div className="flex flex-col p-3">
            <h1>{pool.title}</h1>
            <span>Code: {pool.code}</span>
          </div>
        </div>

        <div className="flex flex-col pt-12 gap-5">
          <h1>Participantes</h1>
          <div className=" flex gap-6 flex-wrap">
            {pool.participants.map((e, i) => {
              return <div className="flex flex-row rounded-2xl p-3 bg-gradient-to-r from-blue-700 to-green-700 items-center gap-4 w-">
                <img src={e.user.avatarUrl} width={60} height={60} alt={e.user.name} className="rounded-full" />
                <span className="font-bold pr-12">{e.user.name}</span>
              </div>
            })}
          </div>
        </div>

        <div className="flex flex-col pt-12 gap-5">
          <h1>Jogos</h1>
          {games.map(e => {
            return <div key={e.id}>
              <div className="flex flex-row gap-3">
                <h4>{e.firstTeam}</h4>
                <span>VS</span>
                <h4>{e.secondTeam}</h4>
              </div>
              {e.guesses.map(g =>{
                return <div>
                  {g.firstTeamPoints}
                  {g.participant.user.name}
                </div>
              })}
            </div>
          })}
        </div>
      </div>
    </>
  )
}