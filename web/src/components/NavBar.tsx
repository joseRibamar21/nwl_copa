/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import HoverCard from "./HoverCard"
import { useAuth } from "../hooks/useAuth"
import Link from 'next/link'

export default function NavBar() {
  const router = useRouter()
  const {user} = useAuth()


  if(!user){
    return (
      <div className="h-16 w-[100%]">
      <div className="flex flex-row h-16 items-center  rounded bg-slate-800 shadow-xl justify-between fixed w-[100%]">
      Tiro Certo
      <Link href="/login" className="flex h-[100%] w-36 text-lg font-bold justify-center items-center hover:bg-slate-700 transition-all active:bg-slate-600">Login</Link>
      </div>
    </div>
    )
  }

  return (
    <div className="h-16 w-[100%]">
      <div className="flex flex-row h-16  rounded bg-slate-800 shadow-xl justify-between fixed w-[100%]">
        <div>
          <Link href="/rooms" className="flex h-[100%] w-36 text-lg font-bold justify-center items-center hover:bg-slate-700 transition-all active:bg-slate-600">Salas</Link>
        </div>
        <div className="flex flex-row h-[100%] items-center justify-center pr-4">
          <img src={user.avatarUrl} alt={user.avatarUrl} className="rounded-full  h-10 w-10 object-cover" />
        </div>
      </div>
    </div>
  )
}


