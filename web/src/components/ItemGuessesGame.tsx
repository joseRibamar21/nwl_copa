/* eslint-disable @next/next/no-img-element */
import { Key } from "react"

interface ListGuessesGameProps {
  key?: Key | null | undefined
  avatarUrl: string,
  participantName: string
  firstTeamName: string
  firstGuess: number
  secondTeamName: string
  secondGuess: number
  points: number
}

export default function ListGuessesGame({
   key, 
   avatarUrl, 
   firstGuess, 
   firstTeamName, 
   participantName , 
   secondGuess, 
   secondTeamName,
   points
  }: ListGuessesGameProps) {
  return (
    <div key={key} className="flex flex-row justify-between rounded-full  gap-5 items-center w-[100%]  bg-background p-1">
      <div className="flex flex-row items-center gap-2">
        <img src={avatarUrl} alt={avatarUrl} width={60} height={60} className="rounded-full w-16 h-16 object-cover" />
        <span>{participantName}</span>
      </div>
      <div className="flex flex-row gap-3">
        <span>
          {firstTeamName} {firstGuess}
        </span>
        <span> X </span>
        <span>
        {secondGuess} {secondTeamName} 
        </span>
      </div>
      <div className="flex items-center justify-center font-bold text-xl rounded-full w-16 h-16 object-cover bg-green-600" >
        {points}
      </div>

    </div>

  )
}
