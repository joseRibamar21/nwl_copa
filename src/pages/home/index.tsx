import Image from "next/image";
import NavBar from "../../components/NavBar";

export default function Home(){
  return (
    <>
      <NavBar/>
      <div className="flex flex-col p-3">
        <h1 className="font-bold text-2xl">Bem Vindo ao Corretor Digital</h1>
        <div className="flex flex-row">
          <div className="flex flex-col bg-gray-200 px-4 py-5 rounded-md shadow-md justify-center items-start gap-5">
            <Image width={82} height={82} src="/icons/lista-de-controle.png" alt="cadastrar_prova"/>
            <span className="font-medium ">Cadastrar Prova</span>
          </div>
        </div>
      </div>
    </>
  )
}
