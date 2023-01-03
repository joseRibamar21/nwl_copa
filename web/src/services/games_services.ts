import { Game } from "../@types/game"
import { api } from "./api"

type newRoomProps = {
  title: string,
  urlImage: string
  open: boolean
}

export async function gamesRoomService(roomoId: string ) {
  const response = await api.get('room/' + roomoId + '/games')
 
  return (response.data.game as Game[])
}
