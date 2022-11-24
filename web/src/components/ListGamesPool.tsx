import { Game } from "../@types/game"
import { dateFormater } from "../utils/dataFormater"
import ListGuessesGame from "./ItemGuessesGame"
import NewGessButton from "./NewGuessButton"

interface ListGamesPool {
  poolId: string
  isOwner?: boolean
  games: Game[]
  refresh?(): void
}

export default function ListGamesPool({ poolId, isOwner = false, games, refresh }: ListGamesPool) {
  return (
    <div className="flex flex-col pt-12 gap-5">
      <h1>Jogos</h1>
      {games.map(e => {

        var closed = Date.parse(e.date) < Date.now()

        return <div key={e.id}>
          <div className={`flex flex-col gap-3 py-3 px-1 rounded-3xl 
          ${closed ? "bg-green-700" : "bg-slate-700"} 
          items-center`}>
            <h3>{`${e.firstTeam} VS ${e.secondTeam}`}</h3>
            <span>{
              dateFormater(e.date)
            }</span>
            <h4>{closed ? "Jogo Encerrado" : ""}</h4>
            <div className="flex flex-col gap-1 w-[100%]">
              {e.guesses.map((g, i) => {
                return <ListGuessesGame
                  key={i}
                  avatarUrl={g.participant.user.avatarUrl}
                  participantName={g.participant.user.name}
                  firstTeamName={e.firstTeam}
                  firstGuess={g.firstTeamPoints}
                  secondTeamName={e.secondTeam}
                  secondGuess={g.secondTeamPoints}
                />
              })}
            </div>
            {
              !closed ? <div className="w-[200px]">
                <NewGessButton idPool={poolId} refresh={refresh} gameId={e.id} title={`${e.firstTeam} vs ${e.secondTeam}`} />
              </div> :
                <></>
            }
          </div>

        </div>

      })}

    </div>
  )
}
