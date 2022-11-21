import { useEffect, useState } from "react"
import UserI from "../@types/user"
import { api } from "../services/api"

export default function NavBar() {
  const [user, setUser] = useState({} as UserI)

  async function loadUser() {
    try {
      const dataUser = await api.get('/me')
      console.log(dataUser.data)
      setUser(dataUser.data['user'])
    } catch (error) {

    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div className="h-16 w-[100%]">

      <div className="flex flex-row p-4 rounded bg-slate-800 shadow-xl justify-between fixed w-[100%]">
        <div>

        </div>
        <div className="flex gap-3 flex-row h-12 items-center justify-center">
          <span className="">{user.name}</span>
          <img src={user.avatarUrl} alt={user.avatarUrl} className="rounded-full h-10" />
        </div>

      </div>
    </div>
  )
}


