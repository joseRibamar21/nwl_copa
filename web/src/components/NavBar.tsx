import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {User} from "../@types/user"
import { api } from "../services/api"
import HoverCard from "./HoverCard"

export default function NavBar() {
  const [user, setUser] = useState({} as User)
  const router = useRouter()

  async function loadUser() {
    try {
      const userData = JSON.parse(sessionStorage.getItem('user')!)
      console.log(userData)
      if(userData){
        setUser(userData)
      }
    } catch (error) {
      router.replace('/')
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  if(!(user.name)){
    return <div className="flex flex-row h-16">
      jdnakjdak
      <HoverCard/>
    </div>
  }

  return (
    <div className="h-16 w-[100%]">

      <div className="flex flex-row p-4 rounded bg-slate-800 shadow-xl justify-between fixed w-[100%]">
        <div>
awdaw,dl
        </div>
        <div className="flex gap-3 flex-row h-12 items-center justify-center">
          <span className="">{user?.name}</span>
          <img src={user.avatarUrl} alt={user.avatarUrl} className="rounded-full h-10" />
        </div>

      </div>
    </div>
  )
}


