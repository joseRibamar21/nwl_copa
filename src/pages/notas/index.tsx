import CardItem from "../../components/CardItem";
import Dropdawn from "../../components/Dropdawn";
import ElevatedButton from "../../components/ElevatedButton";
import ExamItem from "../../components/ExamItem";
import NavBar from "../../components/NavBar";
import { escolas } from "../../mocks/Escolas";
import { turmas } from "../../mocks/Turma";


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

  const listEscolas = escolas.map(e=>{
    return {"id": e.pk,
    "value": e.fields.nome}
  })
  const listTurmas = turmas.map(e=>{
    return {"id": e.pk,
    "value": e.fields.sigla}
  })

  return (
    <>
      <NavBar />
      <div className="flex flex-col p-3 gap-4">
        <div className="w-max-[700px]"><Dropdawn id="escola" list={listEscolas}/></div>
        <div className="w-max-[700px]"><Dropdawn id="turma" list={listTurmas}/></div>
        <ElevatedButton themeType="ORANGE" onClick={() => { }}>
          Cadastrar Nota
        </ElevatedButton>
      </div>
    </>
  )
}
