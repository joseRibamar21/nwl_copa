import CardItem from "../../components/CardItem";
import ExamItem from "../../components/ExamItem";
import NavBar from "../../components/NavBar";


export default function Home() {
  const exampList = [
    {
      id: 1,
      title: "1° Prova de Historia 4° Serie B",
    },
    {
      id: 2,
      title: "2° Prova de Historia 4° Serie B",
    },
    {
      id: 3,
      title: "3° Prova de Historia 4° Serie B",
    },
  ]

  return (
    <>
      <NavBar />
      <div className="flex flex-col p-3">
        <h1 className="font-bold text-2xl">Bem Vindo ao Corretor Digital</h1>
        <div className="flex flex-row pt-4 gap-5">
          <CardItem title="Cadastrar Prova" scr="/icons/lista-de-controle.png" onClick={() => { }} />
          <CardItem title="Cadastrar Nota" scr="/icons/comentarios_1.png" onClick={() => { }} />
          <CardItem title="Ir para o Pege" scr="/assets/logo_pege.png" onClick={() => { }} />
        </div>

        <h1 className="font-bold text-2xl pt-10">Ultimas Provas Cadastradas</h1>

        <div className="pt-4">
          {exampList.map(e=>{
            return <div key={e.id} className="py-3" >
              <ExamItem  id={e.id} title={e.title}/>
            </div>
          })}
        </div>
                
      </div>
    </>
  )
}
