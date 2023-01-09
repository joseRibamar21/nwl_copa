import { Participant } from "./participant"

export type Guess = {
  id:String
  firstTeamPoints: number
  secondTeamPoints: number
  participant: Participant
  points: number
}
