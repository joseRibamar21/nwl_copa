import { toast } from "react-toastify"
import { api } from "./api"

type newGuessProps = {
  idRoom: string,
  data:{
    gameId:string,
    firstTeamPoints: number,
    secondTeamPoints: number
  }
}

export async function newGuessService({ idRoom, data:{gameId,firstTeamPoints,secondTeamPoints}, }: newGuessProps) {
  try {
  const data = await api.post("room/"+idRoom+"/games/guesses", {
    gameId,
    firstTeamPoints,
    secondTeamPoints
  })
  toast("Palpite salvo!", {type:"success"})
  } catch(error: any) {
    toast(String(error['response']['data']['message']), { type: "error" })
  }
}
