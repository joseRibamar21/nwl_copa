import { Room } from "../@types/room"
import { api } from "./api"

type newRoomProps = {
  title: string,
  urlImage: string
  open: boolean
}

export async function newRoomService({ title, urlImage, open }: newRoomProps) {
  const response = await api.post('room', {
    title,
    urlImage,
    open: true,
  })
  return (response.data as Room)
}

export async function roomSpecificService(id: string) {
  const response = await api.get('room/' + id)
  return (response.data['room'] as Room)
}
