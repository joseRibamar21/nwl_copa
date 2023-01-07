/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { priceFormater } from "../utils/priceFormater";
import { Room } from "../@types/room";
import { stepText } from "../utils/stepText";

interface CardRoomProps{
  room: Room
}

export default function CardRoom({room}: CardRoomProps) {

  function stepBackground(step: number){
    if(step==0){
      return "to-yellow-900"
    }
    if(step==1){
      return "to-green-800"
    }
    if(step==2){
      return "to-blue-900"
    }
    if(step==3){
      return "to-red-900"
    }

    return "to-gray-900"
    
  }
  return (
    <>
      <div
        className={`flex flex-col bg-gradient-to-r from-gray-900 ${stepBackground(room.step)} shadow m-3 rounded-2xl max-w-sm`} >
        <Link href={'/rooms/' + room.id}>
          <img src={room.urlImage} alt="image" className='rounded-t-2xl w-80 h-28 object-cover cursor-pointer' />
        </Link>
        <div className="flex flex-col p-3">
          <strong className="text-2xl">{room.title}</strong>
          <span>Code: {room.code}</span>
          <div>Acumulado: {priceFormater(room.amount)}</div>
          <div>Status: {stepText(room.step)}</div>
          <div>{room.description}</div>
          <div className="flex flex-row mt-3 justify-between">
            <span>Participantes:  {room._count.participants}</span>
            <div className="flex flex-row" >
              <div>Inscrição: {priceFormater(room.priceInscription)}</div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
