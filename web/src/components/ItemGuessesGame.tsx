import { Key } from "react"

interface ListGuessesGameProps {
  key?: Key | null | undefined
  avatarUrl: string,
  participantName: string
  firstTeamName: string
  firstGuess: number
  secondTeamName: string
  secondGuess: number
}

export default function ListGuessesGame({
   key, 
   avatarUrl, 
   firstGuess, 
   firstTeamName, 
   participantName , 
   secondGuess, 
   secondTeamName 
  }: ListGuessesGameProps) {
  return (
    <div key={key} className="flex flex-row justify-between rounded-full  gap-5 items-center w-[100%]  bg-background p-1">
      <div className="flex flex-row items-center gap-2">
        <img src={avatarUrl} alt={avatarUrl} width={60} height={60} className="rounded-full" />
        <span>{participantName}</span>
      </div>
      <div className="flex flex-row gap-3">
        <span>
          {firstTeamName} {firstGuess}
        </span>
        <span> X </span>
        <span>
          {secondTeamName} {secondGuess}
        </span>
      </div>
      <div></div>

    </div>

  )
}
