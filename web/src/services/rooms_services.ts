import { toast } from "react-toastify"
import { Room } from "../@types/room"
import { api } from "./api"
import errorToastAPI from "../utils/errorToastApi"

type newRoomProps = {
  title: string,
  urlImage: string
  password: string
}

export async function newRoomService({ title, urlImage, password }: newRoomProps) {
  const response = await api.post('room', {
    title,
    urlImage,
    password,
  })
  return (response.data as Room)
}

export async function roomSpecificService(id: string) {
  try {
    const response = await api.get('room/' + id)
    return (response.data['room'] as Room)
  } catch (error:any) { 
    
  }
  return null
}
