/* eslint-disable @next/next/no-img-element */
import { useAuth } from "../hooks/useAuth"
import Link from 'next/link'
import ItemNavBar from "./ItemNavBar"
import { useRouter } from "next/router"

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
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
      <div className="flex flex-row h-16 bg-primary shadow-xl justify-between fixed w-[100%]">
        <div className="flex flex-row gap-10 px-5">
          <ItemNavBar title="Principal" routerName="/home" currentRouterName={router.route}/>
          <ItemNavBar title="Notas" routerName="/notas"  currentRouterName={router.route}/>
          <ItemNavBar title="Provas" routerName="/provas" currentRouterName={router.route}/>
        </div>
        <div className="flex flex-row h-[100%] items-center justify-center pr-4">
          <span className="text-base text-white px-6">{user.name}</span>

          <img src={user.avatarUrl} alt={user.avatarUrl} className="rounded-full  h-10 w-10 object-cover" />
        </div>
      </div>
    </div>
  )
}


