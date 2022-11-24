import Image from "next/image"
import { Pool } from "../@types/pool"
import { Play, Share } from "phosphor-react"
import { api } from "../services/api"
import Link from "next/link"
import { useRouter } from "next/router"

interface ListPoolsPops {
  title: String
  list: Pool[]
  isMe?: boolean
  refresh(): void
}

export function ListPools({ list, title, isMe, refresh }: ListPoolsPops) {
  const router = useRouter()

  if (list.length === 0) {
    return <></>
  }

  async function enterPool(code: string) {
    try {
      await api.post('/pools/join', { code })
      refresh()
    } catch (error) {
      alert(error)
    }
  }

  return <>
    <h3 className="text-3xl font-bold">{title}</h3>
    <div className="flex flex-row flex-wrap">
      {list.map((e, i) => {
        return <div key={i}
         className="flex flex-col cursor-pointer bg-green-800 shadow m-3 rounded-2xl max-w-sm" >
          <Link href={'pools/'+e.id}><img src={e.urlImage} alt="image" width={300} height={300} className='rounded-t-2xl' /></Link>
          <div className="flex flex-col p-3">
            <strong className="text-2xl">{e.title}</strong>
            <span>Code: {e.code}</span>
            <div>{e.owner.name}</div>
            <div className="flex flex-row mt-3 justify-between">
              <span>Participantes:  {e._count.participants}</span>
              <div className="flex flex-row" >
                <Share size={32} />
                {isMe ? <></> : <div className=" hover:brightness-200 hover:bg-gray-700 cursor-pointer rounded-full " onClick={() => {
                  enterPool(e.code)
                }}>
                  <Play size={32} />
                </div>}

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
