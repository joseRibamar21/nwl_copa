import { toast } from "react-toastify"


export default async function errorToastAPI(cb: Function){
  try {
    const data = await cb()
    return data
  } catch (error:any) {
    toast(String(error['response']['data']['message']), { type: "error" })
    console.log(error)
  }
}
