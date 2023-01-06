/* eslint-disable @next/next/no-img-element */
import { Room } from "../@types/room"
import { Play, Share } from "phosphor-react"
import { api } from "../services/api"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/useAuth"
import { joinRoomService } from "../services/rooms_services"
import { priceFormater } from "../utils/priceFormater"

interface ListPoolsPops {
  title: String
  list: Room[]
  isMe?: boolean
  refresh(): void
}

export function ListPools({ list, title, isMe, refresh }: ListPoolsPops) {
  const router = useRouter()
  const { refreshUser } = useAuth()

  if (list?.length === 0) {
    return <></>
  }

  async function enterPool(code: string) {
    await joinRoomService(code)
    await refreshUser()
    refresh()
  }

  return <>
    <h3 className="text-3xl font-bold">{title}</h3>
    <div className="flex flex-row flex-wrap">
      {list?.map((e, i) => {
        return <div key={i}
          className="flex flex-col  bg-green-800 shadow m-3 rounded-2xl max-w-sm" >
          <Link href={'rooms/' + e.id}>
            <img src={e.urlImage} alt="image" className='rounded-t-2xl w-80 h-28 object-cover cursor-pointer' />
          </Link>
          <div className="flex flex-col p-3">
            <strong className="text-2xl">{e.title}</strong>
            <span>Code: {e.code}</span>
            <div>Acumulado: {priceFormater(e.amount)}</div>
            <div>{e.description}</div>
            <div className="flex flex-row mt-3 justify-between">
              <span>Participantes:  {e._count.participants}</span>
              <div className="flex flex-row" >
              <div>Inscrição: {priceFormater(e.priceInscription)}</div>
               {/*  <Share size={32} />
                {isMe ? <></> : <div className=" hover:brightness-200 hover:bg-gray-700 cursor-pointer rounded-full " onClick={() => {
                  enterPool(e.code)
                }}>
                  <Play size={32} />
                </div>}
 */}
              </div>
            </div>
          </div>

        </div>
      })}
    </div>
    <div className="flex flex-row-reverse pb-9">
      <Link href='' className="text-lg hover:text-slate-500 transition-all">veja mais</Link>
    </div>
  </>
}
