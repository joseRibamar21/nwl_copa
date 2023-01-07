/* eslint-disable @next/next/no-img-element */
import { Room } from "../@types/room"
import Link from "next/link"
import { useRouter } from "next/router"
import CardRoom from "./CardRoom"

interface ListPoolsPops {
  title: String
  list: Room[]
  isMe?: boolean
  refresh(): void
}

export function ListPools({ list, title, isMe, refresh }: ListPoolsPops) {
  const router = useRouter()

  if (list?.length === 0) {
    return <></>
  }

  return <>
    <h3 className="text-3xl font-bold">{title}</h3>
    <div className="flex flex-row flex-wrap">
      {list?.map((e) => {
        return <CardRoom key={e.id} room={e}/>
      })}
    </div>
    <div className="flex flex-row-reverse pb-9">
      <Link href='' className="text-lg hover:text-slate-500 transition-all">veja mais</Link>
    </div>
  </>
}
