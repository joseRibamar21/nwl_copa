import { Game } from "../@types/game"
import { dateFormater } from "../utils/dataFormater"
import CloseGameButton from "./CloseGameButton"
import ListGuessesGame from "./ItemGuessesGame"
import NewGameButton from "./NewGameButton"
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
      <div className="flex flex-row justify-between">
        <h1>Jogos</h1>
        {isOwner ?<NewGameButton idPool={poolId} refresh={() => refresh} />:<></>}
      </div>
      {games?.map(e => {
        var closed = Date.parse(e.date) < Date.now() || e.firstTeamPoints!= null
        return <div key={e.id}>
          <div className={`flex flex-col gap-3 py-3 px-1 rounded-3xl 
          ${closed ? "bg-green-700" : "bg-slate-700"} 
          items-center`}>
            <div className="flex flex-row justify-between w-[100%] px-3">
              <h3>{`${e.firstTeam} VS ${e.secondTeam}`}</h3>
              {isOwner && !closed ? <CloseGameButton refresh={refresh} gameId={e.id} title={`${e.firstTeam} VS ${e.secondTeam}`} /> : <></>}
            </div>
            <div className="flex flex-row justify-between w-[100%] px-3">
            {e.firstTeamPoints && e.secondTeamPoints != null ? <div className="text-xl font-bold italic">
            Placar: {e.firstTeamPoints} X {e.secondTeamPoints}
            </div> : <></>}
            </div>
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
                  points={g?.points ?? 0}
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
