import Image from "next/image"
import { Pool } from "../@types/pool"
import { Play } from "phosphor-react"

interface ListPoolsPops {
  data: Pool[]
}

export function ListPools({ data }: ListPoolsPops) {
  return <div className="flex flex-row flex-wrap">
    {data.map((e, i) => {
      return <div key={i} className="flex flex-col  bg-green-800 shadow m-3 rounded-2xl max-w-sm" >
        <Image src='/image.jpeg' alt="image" width={300} height={300} className='rounded-t-2xl' />
        <div className="flex flex-col p-3">
          <strong className="text-2xl">{e.title}</strong>
          <span>Code: {e.code}</span>
          <div>{e.owner.name}</div>
          <div className="flex flex-row mt-3 justify-between">
            <span>Participantes:  {e._count.participants}</span>
            <Play size={32} />
          </div>
        </div>

      </div>
    })}
  </div>
}
