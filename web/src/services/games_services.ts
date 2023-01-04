import { toast } from "react-toastify"
import { Game } from "../@types/game"
import { api } from "./api"

type newRoomProps = {
  title: string,
  urlImage: string
  open: boolean
}

export async function gamesRoomService(roomoId: string) {
  const response = await api.get('room/' + roomoId + '/games')

  return (response.data.game as Game[])
}

interface NewGameProps {
  roomId: string,
  data: {
    firstTeam: string,
    secondTeam: string,
    date: string,
  }
}

export async function newGameService(props: NewGameProps) {
  try {
    await api.post('room/'+ props.roomId+"/games", props.data)
    toast("Jogo cadastrado com sucesso!", {type:"success"})
  } catch (error:any) {
    toast(String(error['response']['data']['message']), { type: "error" })
    console.log(error)
  }
}
