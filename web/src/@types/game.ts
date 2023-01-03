import { Guess } from "./guess"

export type Game ={
  id: string
  date: string
  firstTeam: string
  secondTeam:  string
  guesses: Guess[]
  firstTeamPoints: number | null
  secondTeamPoints: number | null
}
