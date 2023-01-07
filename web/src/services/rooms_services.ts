import { toast } from "react-toastify"
import { Room } from "../@types/room"
import { api } from "./api"

type newRoomProps = {
  title: string,
  urlImage: string
  password: string
  price: number
}

export async function newRoomService({ title, urlImage, password, price }: newRoomProps) {
  const response = await api.post('room', {
    title,
    urlImage,
    password,
    price
  })
  return (response.data as Room)
}

export async function searchRoomService(filter: string) {
  try {
    const response = await api.get(`room?${filter}`)
    return (response.data.rooms as Room[])
  } catch (error: any) {
    toast(String(error['response']['data']['message']), { type: "error" })
  }
}

export async function meRoomsServices() {
  try {
    const response = await api.get('room/me')
    return (response.data['room'] as Room[])
  } catch (error: any) {

  }
  return null
}

export async function roomSpecificService(id: string) {
  try {
    const response = await api.get('room/' + id)
    return (response.data['room'] as Room)
  } catch (error: any) {

  }
  return null
}

export async function openGameRoomService(roomId: string) {
  try {
    await api.post(`/room/${roomId}/open`)
    toast("Jogo aberto para o publico!", { type: "success" })
  } catch (error: any) {
    toast(String(error['response']['data']['message']), { type: "error" })
  }
  return null
}

export async function startGameRoomService(roomId: string) {
  try {
    await api.post(`/room/${roomId}/start`)
    toast("Jogo Iniciado com sucesso!", { type: "success" })
  } catch (error: any) {
    toast(String(error['response']['data']['message']), { type: "error" })
  }
  return null
}

export async function finishGameRoomService(roomId: string) {
  try {
    await api.post(`/room/${roomId}/finalize`)
    toast("Jogo encerrado com sucesso!", { type: "success" })
  } catch (error: any) {
    toast(String(error['response']['data']['message']), { type: "error" })
  }
  return null
}

export async function joinRoomService(code: string) {
  try {
    await api.post('/room/join', { code })
    toast("Parabens, agora você esta participando!", { type: "success" })
  } catch (error: any) {
    toast(String(error['response']['data']['message']), { type: "error" })
  }
  return null
}

