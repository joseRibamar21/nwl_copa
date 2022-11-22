import Head from "next/head";
import { useRouter } from "next/router";
import { Spinner } from "phosphor-react";
import { useEffect, useState } from "react";
import { Game } from "../../../@types/game";
import { Pool } from "../../../@types/pool";
import { User } from "../../../@types/user";
import NewGameButton from "../../../components/NewGameButton";
import { api } from "../../../services/api";

export default function OnePool() {
  const { query } = useRouter()
  const [pool, setPool] = useState({} as Pool)
  const [games, setGames] = useState([] as Game[])
  const [loading, setLoading] = useState(true)
  let user = {} as User;

  async function loadPool() {
    setLoading(true)
    const id = query.id
    const poolData = await api.get('pools/' + id)
    const gamesData = await api.get('pools/' + id + '/games')
    setGames(gamesData.data.game)
    console.log(poolData)
    console.log(gamesData.data.game[0]?.guesses[0])
    if (poolData.data) {
      setPool(poolData.data['pool'])
    }
    setLoading(false)
    console.log("PoolIDOwner: " + pool.owner?.id)
    console.log("userId: " + user.id)
  }


  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      user = JSON.parse(sessionStorage.getItem('user')!)
    } 
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
        {
          pool? user.id === pool.owner.id ? <div className="flex flex-row-reverse">
          <div className="w-[200px]"><NewGameButton idPool={pool.id} refresh={loadPool} /></div>
        </div>
          :
          <>dwadawd</>:<></>
        }
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
              <div className="flex flex-row gap-3 p-3">
                <h4>{e.firstTeam}</h4>
                <span>VS</span>
                <h4>{e.secondTeam}</h4>
              </div>
              {e.guesses.map((g, i) => {
                return <div key={i} className="flex flex-row gap-5 items-center w-[100] rounded-md bg-gray-900 p-3">
                  <img src={g.participant.user.avatarUrl} alt={g.participant.user.avatarUrl} width={60} height={60} className="rounded-full" />
                  <span>{g.participant.user.name}</span>
                  <div className=" flex  flex-row gap-3">
                    <span>
                      {e.firstTeam} {g.firstTeamPoints}
                    </span>
                    <span> X </span>
                    <span>
                      {g.secondTeamPoints} {e.secondTeam}
                    </span>
                  </div>
                </div>
              })}
            </div>
          })}
        </div>
      </div>
    </>
  )
}
