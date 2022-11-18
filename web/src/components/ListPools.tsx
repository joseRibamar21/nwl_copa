import { Pool } from "../@types/pool"

interface ListPoolsPops {
  data: Pool[]
}

export function ListPools({ data }: ListPoolsPops) {
  return <div className="flex flex-row flex-wrap">
  {data.map((e,i)=>{
    return <div key={i}>{e.title}</div>
  })}
  </div>
}
